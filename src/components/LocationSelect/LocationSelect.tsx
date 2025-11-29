"use client";
import React, { useEffect, useState, useRef } from "react";
import { Modal, Select } from "antd";
import Image from "next/image";
import { useQuery } from "@apollo/client";
import { CITIES_LIST, CITY_BY_LOCATION } from "../../graphQL/query/cities";
import useLocationStore from "../../hooks/useLocation";
import Loading from "../Loading/Loading";

const { Option } = Select;
//TODO Mostrar alerta cuando permiso no es activo
const LocationSelect = () => {
  const { setCity, city } = useLocationStore();
  const [citiesList, setCitiesList] = useState<any[]>([]);
  const [coords, setCoords] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { loading } = useQuery(CITIES_LIST, {
    onCompleted: (data: any) => {
      setCitiesList(data.citiesList);
    },
    onError: () => {
      // Manejo de errores
    },
  });

  useQuery(CITY_BY_LOCATION, {
    variables: {
      getLocationInput: {
        latitude: coords[0],
        longitude: coords[1],
      },
    },
    onCompleted: (data) => {
      setCity({
        id: data.cityByLocation.city.id,
        name: data.cityByLocation.city.name,
      });
      window.location.reload();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const error = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    const success = (position: any) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setCoords([latitude, longitude]);
    };

    if (!city) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
      } else {
        console.log("Geolocation not supported");
      }
    }
  }, [city]);

  if (loading) return <Loading />;

  const handleChange = (value: string) => {
    const selectedCity = citiesList.find((city) => city.name === value);
    setCity(selectedCity);
  };

  return (
    <div className="bg-gray-100 flex items-center rounded-lg px-4 py-2">
      <Modal
        title="Aviso"
        centered
        open={modalOpen}
        footer={null}
        closable={false}
      >
        Debe aceptar los permisos de ubicación
      </Modal>
      <div className="mr-0">
        <Image
          src="/images/header/marker.svg"
          alt="marker"
          width={20}
          height={20}
          className="relative"
        />
      </div>
      <Select
        className="w-[140px]"
        showSearch
        placeholder={
          <span className="font-bold text-black dark:text-white">
            {city?.name || ""}
          </span>
        }
        optionFilterProp="children"
        variant="borderless"
        suffixIcon={
          <Image
            src="/images/header/caret.svg"
            alt="caret"
            width={10}
            height={10}
            className="relative"
          />
        }
        onChange={handleChange}
      >
        {citiesList.map((city) => (
          <Option key={city.id} value={city.name}>
            {city?.name || ""}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default LocationSelect;
