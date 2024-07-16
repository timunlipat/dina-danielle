import Image from "next/image";
import { FlipWords } from "./ui/flip-words";
import { Button } from "../components/ui/button"


export const MainPage = () => {
    const words = [
        "Writer",
        "Cat Lover",
        "Soon to be runner",
        "Sugar Addict",
        "AIA Scammer Agent",
        "Endod",
    ];
    return (
        <div className="flex flex-col h-full max-w-[1200px] mx-auto lg:pt-[130px] pt-[50px] relative px-9">
            <h1 className="lg:text-8xl font-semibold text-5xl tracking-tighter">Hi, <br/> I&apos;m Dina</h1>
            <FlipWords words={words} className="lg:text-7xl text-5xl font-semibold pt-7 tracking-tighter"/>
            <Button 
                variant="destructive"
                className="w-[120px] h-[42px] mt-[65px] font-light text-lg"
                
            >
                Contact
            </Button>
            <div className="lg:absolute relative pt-8 lg:right-[-50px] lg:top-1/4 lg:transform lg:-translate-y-1/3">
                <Image src="/person.jpg" alt="human" height={400} width={400} className="relative z-10"/>
            </div>
        </div>
    )
}