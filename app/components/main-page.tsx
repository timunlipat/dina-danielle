import Image from "next/image";
import { Button } from "./ui/button";
import { FlipWords } from "./ui/flip-words";
import { AnimateImage } from "./ui/animate-image";

export const MainPage = () => {
    const words = [
        "Writer",
        "CatLover",
        "SugarAddict",
    ];
    return (
        <div className="flex flex-col h-[77vh] max-w-[1100px] mx-auto relative px-9">
            <h1 className="md:text-6xl font-bold text-5xl tracking-tight pt-[90px] z-10">
                Hi, 
                <span className="block mt-6">
                I&apos;m <span className="text-red-700">Dina</span>
                </span> 
            </h1>
            <FlipWords words={words} className="lg:text-5xl text-4xl font-semibold mt-6 tracking-tight h-[100px]"/>
            <Button className="rounded-3xl w-[150px] relative z-10">
                Contact
            </Button>
            <AnimateImage src="/icon.png"/>
            <Image src="/c3.gif" alt="gif" height={150} width={150} unoptimized className="absolute md:top-[70px] md:left-[250px] left-[100px]"/>
            <Image src="/c1.gif" alt="gif" height={150} width={150} unoptimized className="absolute left-0 bottom-5"/>
            <Image src="/c4.gif" alt="gif" height={150} width={150} unoptimized className="absolute right-0 bottom-5"/>
        </div>
    )
}