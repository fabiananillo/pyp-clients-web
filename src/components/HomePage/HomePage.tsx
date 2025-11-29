"use client";
import React, { useEffect, useState } from "react";
import esMessages from "@/locale/es.json";
import enMessages from "@/locale/en.json";
import useLocaleStore from "@/hooks/useLocale";
import { Carousel } from "antd";
import women from "@/assets/hero/women.jpg";
import Image from "next/image";

const HomePage: React.FC = () => {
  const [messages, setMessages] = useState<any>();
  const { currentLocale } = useLocaleStore();

  useEffect(() => {
    setMessages(currentLocale === "es" ? esMessages : enMessages);
  }, [currentLocale]);

  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5 ">
        <div className="col-span-12">
          <Carousel autoplay dots={true} className="h-auto">
            <div className="relative h-100 lg:h-150 xl:h-180">
              <Image
                src={women}
                alt="Slide 1"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="relative h-100 lg:h-150 xl:h-180">
              <Image
                src={women}
                alt="Slide 2"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="relative h-100 lg:h-150 xl:h-180">
              <Image
                src={women}
                alt="Slide 3"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default HomePage;
