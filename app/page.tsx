import Navbar from "./customComponents/Navbar";
import Upload from "./customComponents/Upload";

export default function Home() {
  return (
    <main className=" max-w-[56rem] px-5 flex flex-col items-center justify-center mx-auto my-10">
      <Navbar/>
      <Upload/>
    </main>
  );
}
