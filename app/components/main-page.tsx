import Image from "next/image";
import { Button } from "./ui/button";
import { FlipWords } from "./ui/flip-words";

export const MainPage = () => {
    const words = [
        "Writer",
        "Cat Lover",
        "Soon to be runner",
        "Sugar Addict",
        "Endod",
    ];
    return (
        <div className="flex flex-col h-[77vh] max-w-[1000px] mx-auto relative px-9">
            <h1 className="lg:text-6xl font-bold text-5xl tracking-tight pt-[90px] z-10">
                Hi, 
                <span className="block mt-6">
                I&apos;m <span className="text-red-800">Dina</span>
                </span> 
            </h1>
            <FlipWords words={words} className="lg:text-6xl text-5xl font-bold mt-9 tracking-tight italic h-[100px]"/>
            <Button className="rounded-full w-[150px] relative z-10">
                Contact
            </Button>
            <Image src="/person.jpg" alt="person" height={340} width={340} className="absolute right-10 top-24 rounded-full hidden sm:block"/>
            <Image src="/c3.gif" alt="gif" height={150} width={150} unoptimized className="absolute md:top-[60px] md:left-[280px] left-[100px]"/>
            <Image src="/c1.gif" alt="gif" height={150} width={150} unoptimized className="absolute lg:left-[-40px] left-0 bottom-5"/>
            <Image src="/c4.gif" alt="gif" height={150} width={150} unoptimized className="absolute lg:right-[-40px] right-0 bottom-5"/>
        </div>
    )
}