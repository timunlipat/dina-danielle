import Image from "next/image"
import { HeaderButton } from "./header-button"

export const Header = () => {
    return(
        <div className="flex lg:flex-row flex-col justify-between h-[80px] max-w-[1000px] items-center mx-auto pt-2 relative z-20">
            <div className="cursor-pointer pt-4">
                <Image src="/logo.png" alt="logo" height={140} width={140} />
            </div>
            <div className="flex flex-row lg:space-x-11 md:space-x-10 space-x-8">
                <HeaderButton title="Home"/>
                <HeaderButton title="About"/>
                <HeaderButton title="Skills"/>
                <HeaderButton title="Contact"/>
            </div>
        </div>
    )
} 