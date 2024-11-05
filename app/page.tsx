import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { MainPage } from "./components/main-page";
import SnakeGame from "./components/game";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#7a1985] p-4 flex items-center justify-center">
        {/* <Header />
        <MainPage/>
        <Footer/> */}
        <SnakeGame/>
    </div>
  );
}
