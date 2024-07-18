"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export const AnimateImage = () => {
    return (
        <>
            <motion.div
                className="absolute right-0 top-16 hidden sm:block"
                initial={{ scale: 0 }}
                animate={{ rotate: 360, scale: 1.5 }}
                transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                }}
            >
                <Image src="/icon.png" alt="person" height={400} width={400}/>
            </motion.div>
        </>
    );
};