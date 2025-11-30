"use client";
import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import AppFooter from "../Footer/Footer";
import Breadcrumb from "../Breadcrumb/Breadcrumb";

interface StoreLayoutProps {
  children: React.ReactNode;
  storeName?: string;
  storeSlug?: string;
}

export default function StoreLayout({ children, storeName, storeSlug }: StoreLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} showMenu={false} />
          <Breadcrumb items={[
            { label: "Inicio", href: "/es" },
            { label: "Tiendas", href: "/es/store" },
            { label: storeName || storeSlug || "Tienda" }
          ]} />
          <main>
            <div className="max-w-screen mx-auto h-screen bg-gray dark:bg-boxdark-2">
              {children}
              <AppFooter />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}