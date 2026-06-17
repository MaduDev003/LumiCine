"use client";

import { useRef, useState } from "react";
import { Search, Send } from "lucide-react";
import logo from "../../assets/images/logo.png";
import Link from "next/link";

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [search, setSearch] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  function openSearch() {
    setIsSearchOpen(true);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 300);
  }

  function closeSearch() {
    if (!search) {
      setIsSearchOpen(false);
    }
  }

  function handleSearch() {
    if (!search.trim()) return;

    //TODO: Implementar lógica de busca após consumir a API de filmes
    console.log("Buscar:", search);
    setSearch("");
    setIsSearchOpen(false);
  }

  return (
    <div className="w-full h-16 flex items-center px-28 bg-background-dark text-font-color-dark border-b-2 border-secondary-dark">
      <div className="flex-1">
        <img
          src={logo.src}
          alt="LumiCine Logo"
          className="h-40"
        />
      </div>

      <ul className="flex gap-7">
        <li className="relative pb-1">
          <Link href="/">Programação</Link>

          <span className="absolute left-0 bottom-0 h-0.5 w-full rounded-full bg-accent" />
        </li>

        <li>
          <Link href="/lumibar">LumiBar</Link>
        </li>

        <li>
          <Link href="/meus-ingressos">
            Meus Ingressos
          </Link>
        </li>
      </ul>

      <div
        className="flex-1 flex justify-end"
        onMouseEnter={openSearch}
        onMouseLeave={closeSearch}
      >
        <div
          className={`
            flex items-center
            overflow-hidden
            h-10
            rounded-lg
            bg-secondary-dark
            transition-all
            duration-300
            ease-in-out
            ${
              isSearchOpen
                ? "w-80 px-3 border border-secondary-dark"
                : "w-10 px-2 border border-transparent"
            }
          `}
        >
          <button
            type="button"
            onClick={() =>
              setIsSearchOpen((isOpen) => !isOpen)
            }
            className="shrink-0 cursor-pointer"
          >
            <Search className="h-5 w-5 text-zinc-400" />
          </button>

          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            placeholder="Buscar filmes..."
            className={`
              ml-3
              flex-1
              bg-transparent
              text-font-color-dark
              placeholder:text-zinc-400
              outline-none
              transition-all
              duration-300
              ${
                isSearchOpen
                  ? "w-full opacity-100"
                  : "w-0 opacity-0"
              }
            `}
          />

          {isSearchOpen && (
            <button
              type="button"
              onClick={handleSearch}
              className="
                ml-2
                shrink-0
                text-zinc-400
                hover:text-font-color-dark
                transition-colors
                cursor-pointer
              "
            >
              <Send className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}