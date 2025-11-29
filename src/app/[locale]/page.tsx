import CategoriesGrid from "@/components/Categories/Categories";
import HomePage from "@/components/HomePage/HomePage";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MostBoughtGrid from "@/components/MostBought/MostBought";
//import { useMessages } from "next-intl";

export default function Home() {
  //const messages = useMessages();

  return (
    <>
      <DefaultLayout>
        <HomePage />
        <div className="flex-col space-y-4">
          <CategoriesGrid />
          <MostBoughtGrid />
        </div>
      </DefaultLayout>
    </>
  );
}
