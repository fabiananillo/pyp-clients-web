"use client";
import ProductsGrid from "@/components/Grid/ProductsGrid";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import StoreCard from "@/components/StoreCard/StoreCard";

import { COMPANY_BY_SLUG } from "@/graphQL/query/companies";
import { PRODUCT_BY_CLIENTURL } from "@/graphQL/query/products";
import { useQuery } from "@apollo/client";
import { Spin } from "antd";
import { useEffect, useState } from "react";
//import { useMessages } from "next-intl";

export default function Product({ params }: any) {

  const clientUrl = `/${params.slug}/${params.product}`;

  const { error, refetch, loading } = useQuery(PRODUCT_BY_CLIENTURL, {
    variables: { clientUrl },
    skip: !clientUrl, // No ejecutar la consulta si no hay slug
    onCompleted: (e: any) => {
      console.log(e);
    },
    onError: (e) => {
      console.error(e);
    },
  });
  return <>test</>;
}
