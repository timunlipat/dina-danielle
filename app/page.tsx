import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { MainPage } from "./components/main-page";

export default function Home() {
  return (
    <div className="h-full w-full bg-pink-300">
        <Header /> 
        <MainPage/>
        <Footer/>
    </div>
  );
}
