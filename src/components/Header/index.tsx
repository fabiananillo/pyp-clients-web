import Link from "next/link";
import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownUser from "./DropdownUser";
import Image from "next/image";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Divider, Input } from "antd";
import LocationSelect from "../LocationSelect/LocationSelect";
import LoginModal from "../LoginModal/LoginModal";
import SearchBar from "../SearchBar/SearchBar";
import useAuthStore from "../../hooks/useAuthStore";
import { useState } from "react";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
  showMenu?: boolean;
}) => {
  const { token, client, clearAuth } = useAuthStore();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const isLoggedIn = !!token;

  const handleLogout = () => {
    clearAuth();
  };
  return (
    <>
      <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
        <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
          <div className="flex items-center gap-2 sm:gap-4 md:hidden">
            {/* <!-- Hamburger Toggle BTN --> */}
            <button
              aria-controls="sidebar"
              onClick={(e) => {
                e.stopPropagation();
                props.setSidebarOpen(!props.sidebarOpen);
              }}
              className="z-99999 block rounded-sm bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark"
            >
              <span className="relative block h-5.5 w-5.5 cursor-pointer">
                <span className="du-block absolute right-0 h-full w-full">
                  <span
                    className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                      !props.sidebarOpen && "!w-full delay-300"
                    }`}
                  ></span>
                  <span
                    className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                      !props.sidebarOpen && "delay-400 !w-full"
                    }`}
                  ></span>
                  <span
                    className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                      !props.sidebarOpen && "!w-full delay-500"
                    }`}
                  ></span>
                </span>
                <span className="absolute right-0 h-full w-full rotate-45">
                  <span
                    className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                      !props.sidebarOpen && "!h-0 !delay-[0]"
                    }`}
                  ></span>
                  <span
                    className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                      !props.sidebarOpen && "!h-0 !delay-200"
                    }`}
                  ></span>
                </span>
              </span>
            </button>
            {/* <!-- Hamburger Toggle BTN --> */}
            <Divider type="vertical" className="h-[50px]" />
          </div>
          <Link className="hidden flex-shrink-0 md:block" href="/">
            <Image
              width={198}
              height={40}
              src={"/images/logotext.svg"}
              alt="Logo"
            />
          </Link>

          <div className="hidden sm:block">
            <SearchBar />
          </div>

          <LocationSelect />

          <Link className="hidden flex-shrink-0 lg:block" href="/">
            <Image
              width={35}
              height={35}
              src={"/images/header/shopbag.svg"}
              alt="Logo"
            />
          </Link>

          <div className="flex items-center gap-3 2xsm:gap-7">
            <ul className="flex items-center gap-2 2xsm:gap-4">
              {/* <!-- Dark Mode Toggler --> */}
              <DarkModeSwitcher />
              {/* <!-- Dark Mode Toggler --> */}

              {/* <!-- Chat Notification Area --> */}
            </ul>

            {/* <!-- User Area --> */}
            {isLoggedIn ? (
              <>
                <Image
                  width={20}
                  height={30}
                  src={"/images/header/person.svg"}
                  alt="Logo"
                />
                <DropdownUser 
                  onLogout={handleLogout} 
                  clientName={client ? `${client.firstName} ${client.lastName}` : undefined}
                />
              </>
            ) : (
              <Button
                type="primary"
                onClick={() => setLoginModalOpen(true)}
                className="bg-primary border-primary"
              >
                Iniciar Sesión
              </Button>
            )}
            {/* <!-- User Area --> */}
          </div>
        </div>
      </header>
      <LoginModal
        open={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
      {props.showMenu && (
        <div className="hidden justify-between bg-primary px-[20px] py-[20px] md:flex">
          <div className="flex items-start space-x-0 ">
            <div className="flex h-[40px] w-[120px] items-center justify-center rounded-2xl bg-activelink text-center text-xs md:text-lg">
              <Link href="#" className="font-bold text-white" rel="noreferrer">
                Inicio
              </Link>
            </div>
            <div className="flex h-[40px] w-[120px] items-center justify-center rounded-2xl bg-transparent text-center text-xs md:text-lg">
              <Link href="/" className="font-bold text-white" rel="noreferrer">
                Categorías
              </Link>
            </div>
            <div className="flex h-[40px] w-[120px] items-center justify-center rounded-2xl bg-transparent text-center text-xs md:text-lg">
              <Link href="/" className="font-bold text-white" rel="noreferrer">
                Productos
              </Link>
            </div>
            <div className="flex h-[40px] w-[120px] items-center justify-center rounded-2xl bg-transparent text-center text-xs md:text-lg">
              <Link href="/" className="font-bold text-white" rel="noreferrer">
                Cupones
              </Link>
            </div>
            <div className="flex h-[40px] w-[120px] items-center justify-center rounded-2xl bg-transparent text-center text-xs md:text-lg">
              <Link href="/" className="font-bold text-white" rel="noreferrer">
                Ayuda
              </Link>
            </div>
          </div>
          <div className="ml-auto flex h-[40px] w-[210px] items-center justify-center rounded-2xl bg-transparent bg-white text-center text-xs md:text-lg">
            <Link href="/" className="font-bold text-primary" rel="noreferrer">
              Hacer Pedido
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
