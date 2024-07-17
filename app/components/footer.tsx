import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { SparklesPreview } from "./ui/sparklesUi";
import Link from "next/link";

export const Footer = () => {
    return (
        <div className="h-[140px] w-full relative">
            <SparklesPreview/>
            <div className="flex flex-col mx-auto px-9 text-center pt-3">
                <h2 className="text-2xl font-bold text-white z-10">
                    Dina
                </h2>
                <div className="flex flex-row items-center justify-center mt-3 z-10">
                    <Link href="https://www.tiktok.com/@dxna.jh?_t=8o5YF4i36TC&_r=1" passHref target="_blank" rel="noopener noreferrer">
                        <FaTiktok className="text-white text-3xl mx-4 cursor-pointer hover:text-gray-400"/>
                    </Link>
                    <div>
                        <Link href="https://www.instagram.com/dxna.jh/?igsh=eHp0ZjB3cDh2YzY%3D" passHref target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="text-white text-3xl mx-4 cursor-pointer hover:text-gray-400" />
                        </Link>
                    </div>
                </div>
                <p className="text-xs font-light text-white mt-5 z-10">
                    Copyright © 2024. All right reserved.
                </p>
            </div>
        </div>
    )
}