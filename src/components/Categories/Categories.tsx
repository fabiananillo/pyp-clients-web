"use client";
import React, { useState } from "react";
import { Row, Col } from "antd";
import Image from "next/image";

import { useQuery } from "@apollo/client";
import { CATEGORIES_LIST } from "@/graphQL/query/categories";
import Loading from "../Loading/Loading";

const CategoriesGrid = () => {
  const [categoriesList, setCategoriesList] = useState<any[]>([]);
  const { error, refetch, loading } = useQuery(CATEGORIES_LIST, {
    onCompleted: (e: any) => {
      setCategoriesList(e.foodCategoryList);
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
            Categorías
          </h1>
        </div>
        <Row gutter={[16, 16]} className="w-full justify-center">
          {categoriesList?.map((category) => (
            <Col
              key={category.id}
              xs={8}
              sm={6}
              md={3}
              lg={3}
              className="flex flex-col items-center"
            >
              <div className="relative mx-auto mb-2 h-20 w-20">
                <div
                  className="absolute inset-0 flex items-center justify-center rounded-full"
                  style={{
                    backgroundColor: category.backgroundColor,
                  }}
                >
                  <Image
                    src={String(category.logo)}
                    alt={category.name}
                    width={48}
                    height={48}
                  />
                </div>
              </div>
              <span className="text-center text-sm text-black dark:text-white">
                {category.name}
              </span>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default CategoriesGrid;
