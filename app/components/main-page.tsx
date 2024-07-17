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
            <h1 className="lg:text-6xl font-bold text-5xl tracking-tight pt-[120px] z-10">
                Hi, 
                <span className="block mt-6">
                I&apos;m <span className="text-red-800">Dina</span>
                </span> 
            </h1>
            <FlipWords words={words} className="lg:text-6xl text-5xl font-bold mt-9 tracking-tight italic"/>
            <Button className="w-[150px] rounded-full mt-20 z-10">
                Contact
            </Button>
            <Image src="/icon.png" alt="cinnamoroll" height={370} width={370}
                className="absolute right-0 md:top-20 bottom-0"
            />
        </div>
    )
}