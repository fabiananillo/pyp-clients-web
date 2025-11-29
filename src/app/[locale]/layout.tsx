"use client";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import { ApolloProvider, useQuery } from "@apollo/client";
import createApolloClient from "./ApolloWrapper";
import { usePathname, useRouter } from "next/navigation";
import useAuthStore from "@/hooks/useAuthStore";
import useLocaleStore from "@/hooks/useLocale";
import useLocationStore from "@/hooks/useLocation";
import { Modal } from "antd";
import { CITIES_LIST, CITY_BY_LOCATION } from "@/graphQL/query/cities";

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<RootLayoutProps>) {
  const [loading, setLoading] = useState<boolean>(true);
  const { token } = useAuthStore();
  const { setCurrentLocale } = useLocaleStore();
  const { city, setCity } = useLocationStore();
  const client = createApolloClient();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
    setCurrentLocale(locale);
  }, [router, loading, token, pathname, locale, setCurrentLocale]);

  return (
    <html lang={locale}>
      <body suppressHydrationWarning={true}>
        <div className="h-screen dark:bg-boxdark-2">
          {loading ? (
            <Loader />
          ) : (
            <ApolloProvider client={client}>{children}</ApolloProvider>
          )}
        </div>
      </body>
    </html>
  );
}
