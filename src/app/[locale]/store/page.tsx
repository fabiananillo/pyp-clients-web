"use client";
import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Button, Spin, Empty, Input, List, Avatar } from "antd";
import { EnvironmentOutlined, ClockCircleOutlined, SearchOutlined, FilterOutlined, GlobalOutlined } from "@ant-design/icons";
import Link from "next/link";
import Map, { Marker, NavigationControl, Popup } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import Header from "../../../components/Header";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import useLocationStore from "../../../hooks/useLocation";
import useCartStore from "../../../hooks/useCartStore";
import { COMPANIES_NEAREST } from "../../../graphQL/query/companies";

const StorePage: React.FC = () => {
  const [deliveryMethod, setDeliveryMethod] = useState<"pickup" | "driveThru">("pickup");
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [searchAddress, setSearchAddress] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const { city } = useLocationStore();
  const { setBranchId } = useCartStore();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          setUserLocation({
            latitude: 11.0236033,
            longitude: -74.8037831,
          });
        }
      );
    }
  }, []);

  const { data, loading, error } = useQuery(COMPANIES_NEAREST, {
    variables: {
      cityId: city?.id || "656dbb37-19a2-40e8-8c6a-96b770e214ae",
      latitude: userLocation?.latitude,
      longitude: userLocation?.longitude,
      deliveryMethod,
    },
    skip: !userLocation,
  });

  const companies = data?.companiesNearest || [];

  const handleStoreClick = (company: any) => {
    setBranchId(company.branchId);
  };

  const apiKey = process.env.NEXT_PUBLIC_AWS_API_KEY_MAP;
  const region = process.env.NEXT_PUBLIC_AWS_REGION_MAP;
  const mapName = "explore.map.Here";

  return (
    <>
      <Header sidebarOpen={false} setSidebarOpen={() => {}} showMenu={false} />
      <Breadcrumb items={[
        { label: "Inicio", href: "/es" },
        { label: "Restaurantes" }
      ]} />
      
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Selecciona tu restaurante</h1>
          
          {/* Filtros */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <Input
                  size="large"
                  placeholder="Ciudad o dirección"
                  prefix={<SearchOutlined />}
                  value={searchAddress}
                  onChange={(e) => setSearchAddress(e.target.value)}
                />
              </div>
              
              <Button
                size="large"
                icon={<GlobalOutlined />}
                onClick={() => setShowMap(!showMap)}
                type={showMap ? "primary" : "default"}
                className={showMap ? "bg-primary border-primary" : ""}
              >
                {showMap ? "Ocultar Mapa" : "Ver Mapa"}
              </Button>
              
              <Button
                size="large"
                icon={<FilterOutlined />}
              >
                Filtros
              </Button>
            </div>

            <div className="flex bg-gray-100 rounded-lg p-1 w-fit mt-4">
              <Button
                type={deliveryMethod === "pickup" ? "primary" : "default"}
                onClick={() => setDeliveryMethod("pickup")}
                className={deliveryMethod === "pickup" ? "bg-primary border-primary" : ""}
              >
                Recoger en tienda
              </Button>
              <Button
                type={deliveryMethod === "driveThru" ? "primary" : "default"}
                onClick={() => setDeliveryMethod("driveThru")}
                className={deliveryMethod === "driveThru" ? "bg-primary border-primary" : ""}
              >
                Drive Thru
              </Button>
            </div>
          </div>

          {loading && (
            <div className="flex justify-center items-center h-64">
              <Spin size="large" />
            </div>
          )}

          {error && (
            <div className="text-center text-red-500 p-8">
              Error al cargar los restaurantes. Intenta nuevamente.
            </div>
          )}

          {!loading && !error && companies.length === 0 && (
            <Empty description="No hay restaurantes disponibles en tu área" />
          )}

          {/* Contenedor con lista y mapa */}
          <div className="flex gap-6">
            {/* Lista de restaurantes */}
            <div className={showMap ? "w-1/2" : "w-full"}>
              <List
                itemLayout="horizontal"
                dataSource={companies}
                renderItem={(company: any) => (
                  <Link 
                    href={`/es/store/${company.slug}`}
                    onClick={() => handleStoreClick(company)}
                  >
                    <List.Item className="bg-white mb-2 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                      <List.Item.Meta
                        avatar={<Avatar src={company.logoUrl} size={64} shape="square" />}
                        title={
                          <div>
                            <div className="font-semibold text-lg">{company.companyName}</div>
                            {company.branchName && (
                              <div className="text-sm text-gray-600">{company.branchName}</div>
                            )}
                          </div>
                        }
                        description={
                          <div className="space-y-1">
                            <div className="flex items-center text-sm text-gray-500">
                              <EnvironmentOutlined className="mr-1" />
                              <span>{company.address}</span>
                            </div>
                            {company.distance && (
                              <div className="text-sm text-gray-500">
                                {(company.distance / 1000).toFixed(1)} km
                              </div>
                            )}
                            <div className="flex items-center text-sm text-green-600">
                              <ClockCircleOutlined className="mr-1" />
                              <span>
                                {company.scheduleType === "alwaysOpen" ? "Siempre abierto" : "Ver horarios"}
                              </span>
                            </div>
                          </div>
                        }
                      />
                    </List.Item>
                  </Link>
                )}
              />
            </div>

            {/* Mapa */}
            {showMap && userLocation && (
              <div className="w-1/2 sticky top-4 h-[calc(100vh-200px)]">
                <Map
                  initialViewState={{
                    latitude: userLocation.latitude,
                    longitude: userLocation.longitude,
                    zoom: 12,
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "8px",
                  }}
                  mapStyle={`https://maps.geo.${region}.amazonaws.com/maps/v0/maps/${mapName}/style-descriptor?key=${apiKey}`}
                  attributionControl={false}
                >
                  <NavigationControl position="top-left" />
                  
                  {companies.map((company: any) => (
                    company.latitude && company.longitude && (
                      <Marker
                        key={`${company.companyId}-${company.branchId}`}
                        longitude={company.longitude}
                        latitude={company.latitude}
                        anchor="bottom"
                      >
                        <div
                          onClick={() => setSelectedCompany(company)}
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            backgroundColor: "white",
                            border: "2px solid #3056D3",
                            backgroundImage: `url(${company.logoUrl})`,
                            backgroundSize: "cover",
                            cursor: "pointer",
                          }}
                        />
                      </Marker>
                    )
                  ))}

                  {selectedCompany && (
                    <Popup
                      longitude={selectedCompany.longitude}
                      latitude={selectedCompany.latitude}
                      anchor="top"
                      onClose={() => setSelectedCompany(null)}
                      closeOnClick={false}
                    >
                      <div className="p-2">
                        <h3 className="font-bold text-base mb-1 text-black">{selectedCompany.companyName}</h3>
                        {selectedCompany.branchName && (
                          <p className="text-sm text-black mb-2">{selectedCompany.branchName}</p>
                        )}
                        <div className="space-y-1 text-sm text-black">
                          <div className="flex items-start">
                            <EnvironmentOutlined className="mr-1 mt-0.5" />
                            <span>{selectedCompany.address}</span>
                          </div>
                          {selectedCompany.distance && (
                            <div>
                              {(selectedCompany.distance / 1000).toFixed(1)} km de distancia
                            </div>
                          )}
                          <div className="flex items-center">
                            <ClockCircleOutlined className="mr-1" />
                            <span>
                              {selectedCompany.scheduleType === "alwaysOpen" ? "Siempre abierto" : "Ver horarios"}
                            </span>
                          </div>
                        </div>
                        <Link 
                          href={`/es/store/${selectedCompany.slug}`}
                          onClick={() => handleStoreClick(selectedCompany)}
                        >
                          <Button 
                            type="primary" 
                            size="small" 
                            className="w-full mt-3 bg-primary border-primary"
                          >
                            Ver tienda
                          </Button>
                        </Link>
                      </div>
                    </Popup>
                  )}
                </Map>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default StorePage;