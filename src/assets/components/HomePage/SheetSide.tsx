"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SheetLoginButton from "./SheetLoginButton";
import Menu from "@/icons/Menu";

export function SheetSide() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Sheet>
        <SheetTrigger><Menu/></SheetTrigger>
        <SheetContent className="bg-[#181818]">
          <SheetHeader>
            <SheetTitle className="text-white">Menu</SheetTitle>
            <SheetLoginButton />
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
