import AddData from "@/components/AddData";
import Blog from "@/components/Blog";
import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Header />
      <HeroBanner />
      <Blog />
      <hr />
      <AddData />
    </>
  );
}
