import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { MainPage } from "./components/main-page";

export default function Home() {
  return (
    <div className="bg-gradient-to-r from-pink-600 via-pink-400 to-red-300 h-screen">
        <Header />
        <MainPage/>
        <Footer/>
    </div>
  );
}
