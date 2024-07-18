import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { MainPage } from "./components/main-page";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-pink-300 via-pink-200 to-red-200 h-screen">
        <Header />
        <MainPage/>
        <Footer/>
    </div>
  );
}
