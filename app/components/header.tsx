import Image from "next/image"
import { HeaderButton } from "./header-button"

export const Header = () => {
    return(
        <div className="flex flex-row justify-between h-[60px] max-w-[1200px] items-center mx-auto pt-2 px-9">
            <div className="cursor-pointer">
                <Image src="/D.jpg" alt="logo" height={105} width={105}/>
            </div>
            <div className="flex flex-row space-x-11">
                <HeaderButton title="Home"/>
                <HeaderButton title="About"/>
                <HeaderButton title="Skills"/>
                <HeaderButton title="Contact"/>
            </div>
        </div>
    )
} 