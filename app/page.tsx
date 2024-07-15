import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { MainPage } from "./components/main-page";

export default function Home() {
  return (
    <div className="h-full w-full">
        <Header /> 
        <hr className="w-full border-t-2 border-gray-100 mt-2"/>
        <MainPage/>
        <Footer/>
    </div>
  );
}
