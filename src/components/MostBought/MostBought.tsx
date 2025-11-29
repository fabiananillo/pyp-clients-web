"use client";
import React, { useState } from "react";
import { Row, Col } from "antd";
import Image from "next/image";

import { useQuery } from "@apollo/client";
import { COMPANIES_MOST_BOUGHT } from "@/graphQL/query/companies";
import Link from "next/link";
import Loading from "../Loading/Loading";

const MostBoughtGrid = () => {
  const [listData, setListData] = useState<any[]>([]);
  const { error, refetch, loading } = useQuery(COMPANIES_MOST_BOUGHT, {
    onCompleted: (e: any) => {
      setListData(e.companiesMostBought);
    },
    onError: () => {
      //console.error(error);
    },
  });

  if (loading) return <Loading />;

  if (error) return "Error al obtener datos";

  return (
    <div className="mx-auto max-w-6xl bg-white p-2 px-4 pb-8 dark:bg-strokedark sm:px-6 lg:px-24">
      <div className="flex flex-col items-center">
        <div className="mb-4 w-full">
          <h1 className="mt-2 text-2xl font-bold text-black dark:text-white">
            Los 10 más pedidos
          </h1>
        </div>
        <Row gutter={[16, 16]} className="w-full justify-center">
          {listData?.map((data) => (
            <Col
              key={data.id}
              xs={8}
              sm={6}
              md={3}
              lg={3}
              className="flex flex-col items-center"
            >
              <Link href={`/es/store/${data.slug}`}>
                <div className="relative mx-auto mb-2 h-20 w-20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src={String(data.logoUrl)}
                      alt={data.companyName}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  </div>
                </div>
              </Link>
              <span className="text-center text-sm text-black dark:text-white">
                {data.companyName}
              </span>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default MostBoughtGrid;
