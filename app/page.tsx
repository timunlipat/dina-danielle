import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { MainPage } from "./components/main-page";

export default function Home() {
  return (
    <div className="bg-gradient-to-r from-pink-200 via-red-200 to-pink-200 h-screen">
        <Header />
        <MainPage/>
        <Footer/>
    </div>
  );
}
