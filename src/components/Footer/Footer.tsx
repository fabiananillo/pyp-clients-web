import React from "react";
import { Layout } from "antd";
import Image from "next/image";
import fb from "@/assets/imgs/newIcons/facebook.png";
import inst from "@/assets/imgs/newIcons/instagram.png";
import twt from "@/assets/imgs/newIcons/twitter.png";
import yt from "@/assets/imgs/newIcons/youtube.png";
import playstore from "@/assets/imgs/playstore.png";
import appstore from "@/assets/imgs/appstore.png";

const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer className="bg-primary px-4 py-20 text-white  lg:px-30">
      <div className="flex flex-wrap justify-between">
        <div className="mb-4 w-full sm:w-1/2 md:w-[10%]">
          <div className="mb-2 text-lg font-semibold">La compañía</div>
          <div className="space-y-2">
            <div className="text-sm">¿Quiénes somos?</div>
            <div className="text-sm">Lo que ofrecemos</div>
            <div className="text-sm">Trabaja con nosotros</div>
          </div>
        </div>
        <div className="mb-4 w-full sm:w-1/2 md:w-[10%]">
          <div className="mb-2 text-lg font-semibold">Soy restaurante</div>
          <div className="space-y-2">
            <div className="text-sm">Iniciar sesión como restaurante</div>
            <div className="text-sm">Quiero registrar mi restaurante</div>
            <div className="text-sm">¿Cómo funciona?</div>
          </div>
        </div>
        <div className="mb-4 w-full sm:w-1/2 md:w-[10%]">
          <div className="mb-2 text-lg font-semibold">Contacto</div>
          <div className="space-y-2">
            <div className="text-sm">Servicio al cliente</div>
            <div className="text-sm">Soporte técnico</div>
            <div className="text-sm">Ayuda</div>
          </div>
        </div>
        <div className="mb-4 w-full sm:w-1/2 md:w-[10%]">
          <div className="mb-2 text-lg font-semibold">Legales</div>
          <div className="space-y-2">
            <div className="text-sm">Términos y condiciones</div>
            <div className="text-sm">Política de privacidad</div>
            <div className="text-sm">Condiciones del servicio</div>
          </div>
        </div>
      </div>
      <div className="my-[30px] flex flex-col items-center">
        <div className="my-3 flex w-[400px] flex-col items-center px-[20px] text-center lg:text-start  ">
          <div className="flex flex-col items-center md:flex-row space-x-5">
            <div className="flex">
              <Image alt="app" src={appstore} className="h-[65px] w-[150px]" />
            </div>
            <div className="flex">
              <Image
                alt="playstore"
                src={playstore}
                className="h-[55px] w-[160px]"
              />
            </div>
          </div>
          <div className="my-[30px] flex w-full justify-center">
            <a
              href="https://www.facebook.com/profile.php?id=100088170187471"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                alt="fb"
                src={fb}
                className="mr-[25px] h-[25px] w-[25px]"
              />
            </a>
            <a
              href="https://www.instagram.com/pideypasa/"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                alt="instagram"
                src={inst}
                className="mx-[25px] h-[25px] w-[25px]"
              />
            </a>
            <a
              href="https://twitter.com/pideypasa"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                alt="x"
                src={twt}
                className="mx-[25px] h-[25px] w-[25px]"
              />
            </a>
            <a
              href="https://www.youtube.com/@PideYpasa/f"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                alt="youtube"
                src={yt}
                className="mx-[25px] h-[25px] w-[25px]"
              />
            </a>
          </div>
          <p className="w-[200px] text-center text-sm text-white md:w-full">
            © 2023 Tecnicall Colombia S.A.S. All rights reserved.
          </p>
        </div>
      </div>
    </Footer>
  );
};

export default AppFooter;
