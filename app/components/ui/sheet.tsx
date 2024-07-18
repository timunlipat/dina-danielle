"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { Menu } from "lucide-react";
import { HeaderButton } from "../header-button";

export const MobileMenu = () => {
  return (
    <div className="grid grid-cols-2">
        <Sheet>
          <SheetTrigger asChild>
            <Menu className="text-gray-700" size={36}/>
          </SheetTrigger>
          <SheetContent side="right" className="w-[180px] bg-gradient-to-b from-pink-300 via-pink-200 to-red-200 h-screen pt-8 items-center flex flex-col">
            <HeaderButton title="Home" className="mt-3 font-semibold text-xl text-center"/>
            <HeaderButton title="About" className="mt-3 font-semibold text2xl text-center"/>
            <HeaderButton title="Skills" className="mt-3 font-semibold text-xl text-center"/>
            <HeaderButton title="Contact" className="mt-3 font-semibold text-xl text-center w-28"/>
          </SheetContent>
        </Sheet>
    </div>
  )
}


