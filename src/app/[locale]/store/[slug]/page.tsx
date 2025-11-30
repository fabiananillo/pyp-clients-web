"use client";
import ProductsGrid from "@/components/Grid/ProductsGrid";
import StoreLayout from "@/components/Layouts/StoreLayout";
import Loading from "@/components/Loading/Loading";
import StoreCard from "@/components/StoreCard/StoreCard";

import { COMPANY_BY_SLUG } from "@/graphQL/query/companies";
import {
  HeatMapOutlined,
  QuestionCircleOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { FloatButton } from "antd";
import { useState, useEffect } from "react";
import useCartStore from "@/hooks/useCartStore";
import BranchSelector from "@/components/BranchSelector/BranchSelector";
//import { useMessages } from "next-intl";

export default function Store({ params }: { params: { slug: string } }) {
  const [company, setCompany] = useState<any>();
  const [showBranchSelector, setShowBranchSelector] = useState(false);
  const { branchId, setBranchId } = useCartStore();
  //const messages = useMessages();

  const slug = params.slug;

  const { error, refetch, loading } = useQuery(COMPANY_BY_SLUG, {
    variables: { slug },
    skip: !slug, // No ejecutar la consulta si no hay slug
    onCompleted: (e: any) => {
      setCompany(e.companiesBySlug);
      if (!branchId && e.companiesBySlug?.id) {
        setShowBranchSelector(true);
      }
    },
    onError: () => {
      //console.error(error);
    },
  });

  const handleBranchSelected = (selectedBranchId: string) => {
    setBranchId(selectedBranchId);
    setShowBranchSelector(false);
  };

  if (loading) return <Loading />;

  if (error) return "Ha ocurrido un error. Intente más tarde...";

  return (
    <>
      <BranchSelector
        open={showBranchSelector}
        companyId={company?.id}
        onBranchSelected={handleBranchSelected}
      />
      <StoreLayout storeName={company?.name} storeSlug={slug}>
        <div className="flex flex-col md:flex-row">
          <StoreCard company={company} />
          <div className="flex w-full flex-col">
            <ProductsGrid company={company} />
          </div>
          <FloatButton
            icon={<ShopOutlined />}
            type="default"
            tooltip="Cambiar sucursal"
            style={{ right: 24, width: 100, height: 100 }}
            description="Cambiar Sucursal"
          >
            Cambiar Sucursal
          </FloatButton>
        </div>
      </StoreLayout>
    </>
  );
}
