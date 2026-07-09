"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCheckoutStore } from "@/src/store/checkoutStore";

interface MenuListElementsProps {
  className?: string;
}

export default function MenuListElements({
  className = "",
}: MenuListElementsProps) {
  const pathname = usePathname();
   const clearCheckout = useCheckoutStore((state) => state.clearCheckout);

  const isActive = (path: string) => pathname === path;

  const linkClasses = (path: string) =>
    `relative flex items-center justify-center gap-2 transition ${
      isActive(path)
        ? "text-font-dark"
        : "text-font-dark/60 hover:text-font-dark"
    }`;

  return (
    <nav
      className={`flex text-2xl lg:text-[15px] font-medium gap-15  lg:gap-10 ${className}`}
    >
      <Link 
        onClick={() => clearCheckout()} 
        href="/" 
        className={linkClasses("/")}
      >
        {isActive("/") && (
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
        )}
        Programação
        
      </Link>

      <Link 
        href="/lumibar" 
        className={linkClasses("/lumibar")}
        onClick={() => clearCheckout()} 
        >
          LumiBar
          {isActive("/lumibar") && (
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          )}
      </Link>

      <Link
        onClick={() => clearCheckout()}
        href="/meus-ingressos"
        className={linkClasses("/meus-ingressos")}
      >
        Meus Ingressos
        {isActive("/meus-ingressos") && (
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
        )}
      </Link>
    </nav>
  );
}