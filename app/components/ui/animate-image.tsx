"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type Props = {
    src: string;
    alt?: string | undefined;
    className?: string;
};

export const AnimateImage =  ({ src, alt = "image" }: Props) => {
    return (
        <>
            <motion.div
                className="absolute right-[70px] top-14 hidden sm:block o"
                initial={{ scale: 0 }}
                animate={{ rotate: 360, scale: 1.4 }}
                transition={{
                delay: 0.5,
                type: "spring",
                stiffness: 220,
                damping: 30,
                }}
            >
                <Image src={src} alt={alt} height={400} width={400}/>
            </motion.div>
        </>
    );
};