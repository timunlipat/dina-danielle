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
    ];
    return (
        <div className="flex flex-col h-full max-w-[1200px] mx-auto lg:pt-[130px] pt-[50px] relative px-9">
            <h1 className="lg:text-8xl font-bold text-5xl tracking-wide pb-4">Hi, <br/> I&apos;m Dina</h1>
            <FlipWords words={words} className="lg:text-8xl text-5xl font-bold pt-7"/>
            <Button 
                variant="destructive"
                size="lg"
                className="w-[150px] mt-9 font-normal text-xl tracking-wider"
            >
                Contact
            </Button>
            <div className="lg:absolute relative pt-8 lg:right-0 lg:top-1/3 lg:transform lg:-translate-y-1/2">
                <Image src="/person.jpg" alt="human" height={600} width={600} className="rounded-3xl"/>
            </div>
        </div>
    )
}