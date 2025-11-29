"use client";
import React, { useState } from "react";
import { Button, Card, Empty, List } from "antd";
import { DesktopOutlined, MobileOutlined } from "@ant-design/icons";
import ProductCard from "../Card/ProductCard";
import { PRODUCTS_BY_COMPANY } from "@/graphQL/query/products";
import { useQuery } from "@apollo/client";
import useLocationStore from "@/hooks/useLocation";
import Loading from "../Loading/Loading";
import { ProductInfoInterface } from "@/interfaces/product.interface";

interface ProductsGridProps {
  company: any;
}

const ProductsGrid: React.FC<ProductsGridProps> = ({ company }) => {
  const [productsList, setProductsList] = useState<any[]>([]);

  const { city } = useLocationStore();

  const { loading } = useQuery(PRODUCTS_BY_COMPANY, {
    variables: {
      companyId: company?.id,
      catalog: "any",
      cityId: city?.id,
    },
    skip: !city,
    onCompleted: (e: any) => {
      setProductsList(e.productsByCompany);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  if (loading) return <Loading />;

  return (
    <div className="mx-auto w-full bg-white px-4 dark:bg-strokedark sm:px-6 lg:px-24">
      <div className="flex flex-col items-center">
        <div className="mb-4 w-full">
          <h1 className="mt-2 text-2xl font-bold text-black dark:text-white">
            Productos
          </h1>
        </div>
        <List
          className="w-50 content-center items-center justify-between md:w-full"
          grid={{
            gutter: 32,
            xs: 1,
            sm: 1,
            md: 4,
          }}
          dataSource={productsList}
          renderItem={(item: ProductInfoInterface) => (
            <List.Item>
              <ProductCard product={item} />
            </List.Item>
          )}
          locale={{
            emptyText: (
              <div style={{ textAlign: "center" }}>
                <Empty description="No hay productos disponibles" />
              </div>
            ),
          }}
        />
      </div>
    </div>
  );
};

export default ProductsGrid;
