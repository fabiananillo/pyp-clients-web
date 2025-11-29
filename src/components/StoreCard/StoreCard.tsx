"use client";
import React from "react";
import { Card, Divider } from "antd";
import { StarOutlined } from "@ant-design/icons";
import Image from "next/image";
import Loading from "../Loading/Loading";

const StoreCard = ({ company }: any) => {
  if (!company) return <Loading />;
  return (
    <>
      <Card
        cover={
          <div className="relative">
            <Image
              alt={company?.name}
              src={company?.logoUrl}
              className="h-48 w-full object-cover"
              height={40}
              width={40}
            />
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-full">
              <Image
                src={String(company.bannerUrl)}
                alt={company.name}
                width={48}
                height={48}
                className="rounded-full"
              />
            </div>
          </div>
        }
        className="h-[85%] w-90 rounded-lg shadow-lg"
      >
        <div className="px-4 py-2">
          <div className="mx-auto items-center justify-center">
            <h2 className="mb-2 text-xl font-bold">{company?.name}</h2>
            <p className="text-gray-600 mb-2">@{company?.username}</p>
          </div>
          <div className="flex items-center shadow-4">
            <div className="bg-gray-100 flex items-center space-x-2 rounded p-2">
              <StarOutlined />
              <span className="text-gray-600">Calificaciones (4.8)</span>
            </div>
          </div>
          <div className="mt-2 flex items-center shadow-4">
            <div className="bg-gray-100 flex items-center space-x-2 rounded p-2">
              <StarOutlined />
              <span className="text-gray-600">Sucursales (3)</span>
            </div>
          </div>
          <Divider />
          <div className="grid grid-cols-1 gap-2 space-y-4">
            <div className="text-gray-600 font-bold">Destacados</div>
            <div className="text-gray-600">Cupones</div>
            <div className="text-gray-600">Flash</div>
            <div className="text-gray-600">Populares</div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default StoreCard;
