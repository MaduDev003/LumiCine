"use client";

import { useRef, useState } from "react";
import { Search, Send, TextAlignJustify } from "lucide-react";
import logo from "../../assets/images/logo.png";
import MenuListElements from "@/src/features/home/components/MenuListElements";

interface HeaderProps {
  menu: boolean;
  setMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({ menu, setMenu }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [search, setSearch] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);


  function openSearch() {
    setIsSearchOpen(true);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 250);
  }

  function closeSearch() {
    if (!search) setIsSearchOpen(false);
  }

  function handleSearch() {
    if (!search.trim()) return;

    console.log("Buscar:", search);

    setSearch("");
    setIsSearchOpen(false);
  }



  return (
    <>
    <header className="sticky top-0 z-50 w-full h-16 flex items-center px-5 md:px-7.5 bg-background-dark/90 backdrop-blur-2xl text-font-color-dark border-b border-white/10">
      <div className="flex items-center gap-3 flex-1 justify-between md:px-0 px-3">
        <TextAlignJustify
          className="flex md:hidden cursor-pointer"
          onClick={() => setMenu((prev) => !prev)}
        />
        <img
          src={logo.src}
          alt="LumiCine Logo"
          className="h-25 md:h-36 object-contain"
        />
      </div>
      <div className="hidden md:flex">
        <MenuListElements className="flex-row" />
      </div>
      {/* SEARCH (iPad + desktop) */}
      <div className="hidden md:flex flex-1 justify-end min-w-0">
        <div
          className={`flex items-center h-10 rounded-xl bg-white/5 border border-white/10 overflow-hidden transition-all duration-300
            ${isSearchOpen ? "w-44 md:w-56 lg:w-80 px-3" : "w-10 px-2"}
          `}
          onMouseEnter={openSearch}
          onMouseLeave={closeSearch}
        >
          <button
            type="button"
            onClick={() => setIsSearchOpen((prev) => !prev)}
            className={`shrink-0 transition-all duration-300 ${
              isSearchOpen ? "pr-2 border-r border-white/20" : ""
            }`}
          >
            <Search className="h-5 w-5 text-white/60 hover:text-white transition" />
          </button>

          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Buscar filmes..."
            className={`ml-3 flex-1 bg-transparent outline-none text-sm text-white placeholder:text-white/40 transition-all duration-300 ${
              isSearchOpen ? "opacity-100" : "opacity-0 w-0"
            }`}
          />

          {isSearchOpen && (
            <button
              type="button"
              onClick={handleSearch}
              className="ml-2 shrink-0 hover:scale-110 transition"
            >
              <Send
                className={`h-5 w-5 transition-colors ${
                  search.trim() ? "text-white" : "text-white/40"
                }`}
              />
            </button>
          )}
        </div>
      </div>
    </header>
    </>
  );
}