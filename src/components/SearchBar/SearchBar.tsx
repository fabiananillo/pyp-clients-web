"use client";
import React, { useState, useEffect } from "react";
import { Input, Button, List, Avatar, Spin } from "antd";
import { SearchOutlined, ShopOutlined, AppstoreOutlined, TagOutlined } from "@ant-design/icons";
import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { GLOBAL_SEARCH } from "../../graphQL/query/search";
import useLocationStore from "../../hooks/useLocation";
import useCartStore from "../../hooks/useCartStore";

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const { city } = useLocationStore();
  const { setBranchId } = useCartStore();
  const router = useRouter();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => {
          setUserLocation({
            latitude: 11.0236033,
            longitude: -74.8037831,
          });
        }
      );
    }
  }, []);

  const [search, { data, loading }] = useLazyQuery(GLOBAL_SEARCH, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (searchQuery.length >= 2) {
      const timer = setTimeout(() => {
        search({
          variables: {
            query: searchQuery,
            cityId: city?.id || "656dbb37-19a2-40e8-8c6a-96b770e214ae",
            latitude: userLocation?.latitude,
            longitude: userLocation?.longitude,
          },
        });
        setShowResults(true);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setShowResults(false);
    }
  }, [searchQuery, city, userLocation, search]);

  const results = data?.globalSearch || [];

  const getIcon = (type: string) => {
    switch (type) {
      case "RESTAURANT":
        return <ShopOutlined className="text-primary" />;
      case "PRODUCT":
        return <TagOutlined className="text-green-600" />;
      case "CATEGORY":
        return <AppstoreOutlined className="text-orange-600" />;
      default:
        return <SearchOutlined />;
    }
  };

  const handleResultClick = (result: any) => {
    if (result.type === "RESTAURANT") {
      router.push(`/es/store/${result.slug}`);
    } else if (result.type === "PRODUCT") {
      // Para productos, navegar a la tienda y el producto se verá en el listado
      if (result.slug) {
        router.push(`/es/store/${result.slug}`);
      }
    } else if (result.type === "CATEGORY") {
      // Navegar a categoría
      router.push(`/es/category/${result.slug}`);
    }
    setSearchQuery("");
    setShowResults(false);
  };

  return (
    <div className="relative w-full">
      <Input
        placeholder="¿Qué antojo tienes hoy?"
        className="rounded-4xl h-[50px] w-full bg-body font-medium focus:outline-none xl:w-100"
        allowClear
        variant="borderless"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => searchQuery.length >= 2 && setShowResults(true)}
        onBlur={() => setTimeout(() => setShowResults(false), 200)}
        suffix={
          <Button
            shape="circle"
            className="border-none bg-primary text-white"
            icon={loading ? <Spin size="small" /> : <SearchOutlined />}
          />
        }
      />

      {showResults && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
          <List
            dataSource={results}
            renderItem={(result: any) => (
              <List.Item
                className="cursor-pointer hover:bg-gray-50 px-4"
                onClick={() => handleResultClick(result)}
              >
                <List.Item.Meta
                  avatar={
                    result.imageUrl && result.imageUrl !== "null" ? (
                      <Avatar src={result.imageUrl} size={48} shape="square" />
                    ) : (
                      <Avatar icon={getIcon(result.type)} size={48} shape="square" />
                    )
                  }
                  title={
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{result.name}</span>
                      {result.type === "PRODUCT" && result.price && (
                        <span className="text-primary font-semibold">
                          ${result.price.toLocaleString()}
                        </span>
                      )}
                    </div>
                  }
                  description={
                    <div className="text-sm text-gray-600">
                      {result.type === "RESTAURANT" && result.address && (
                        <div>{result.address}</div>
                      )}
                      {result.type === "PRODUCT" && result.companyName && (
                        <div>{result.companyName}</div>
                      )}
                      {result.description && (
                        <div className="truncate">{result.description}</div>
                      )}
                      {result.distance && (
                        <div className="text-xs text-gray-500">
                          {(result.distance / 1000).toFixed(1)} km
                        </div>
                      )}
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </div>
      )}

      {showResults && searchQuery.length >= 2 && results.length === 0 && !loading && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg p-4 z-50">
          <p className="text-center text-gray-500">No se encontraron resultados</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;