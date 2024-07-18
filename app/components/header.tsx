import Image from "next/image"
import { HeaderButton } from "./header-button"
import { MobileMenu } from "./ui/sheet"

export const Header = () => {
    return(
        <div className="flex flex-row justify-between h-[80px] items-center pt-2 relative z-20">
            <div className="cursor-pointer">
                <Image src="/logo.png" alt="person" height={140} width={140} />
            </div>
            <div className="hidden md:flex flex-row lg:space-x-11 md:space-x-10 space-x-8 mr-16">
                <HeaderButton title="Home"/>
                <HeaderButton title="About"/>
                <HeaderButton title="Skills"/>
                <HeaderButton title="Contact"/>
            </div>
            <div className="md:hidden flex">
                <MobileMenu/>
            </div>
            
        </div>
    )
} 