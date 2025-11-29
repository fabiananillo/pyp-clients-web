import DefaultLayout from "@/components/Layouts/DefaultLayout";
//import { useMessages } from "next-intl";

export default function Store() {
  //const messages = useMessages();

  return (
    <>
      <DefaultLayout>
        <div className="flex-col space-y-4">Listado de tiendas</div>
      </DefaultLayout>
    </>
  );
}
