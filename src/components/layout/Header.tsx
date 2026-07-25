"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Send, TextAlignJustify } from "lucide-react";
import { Movie } from "@/src/types/movieType";
import { useCheckoutStore } from "@/src/store/checkoutStore";
import logo from "@/src/assets/images/logo.png";
import MenuListElements from "@/src/components/ui/MenuListElements";

interface HeaderProps {
  allMoviesForSearch?: Array<Movie>;
  setMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({ setMenu, allMoviesForSearch }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const clearCheckout = useCheckoutStore(
    (state) => state.clearCheckout
  );

  const router = useRouter();

  const foundMovies =
    search.trim() === ""
      ? []
      : allMoviesForSearch?.filter((movie) =>
          movie.title
            .toLowerCase()
            .includes(search.toLowerCase())
        ) ?? [];


  function openSearch() {
    setIsSearchOpen(true);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 250);
  }


  function closeSearch() {
    if (!search) {
      setIsSearchOpen(false);
    }
  }


  function handleSearch(movie: Movie) {
    if (!movie) return;

    clearCheckout();

    router.push(
      `/movie/${movie.id}?type=${movie.type}`
    );

    setSearch("");
    setIsSearchOpen(false);
  }


  function handleEnterSearch() {
    if (foundMovies.length > 0) {
      handleSearch(foundMovies[0]);
    }
  }


  return (
    <header className="
      sticky top-0 z-50 w-full h-16 
      bg-background-dark/90 backdrop-blur-2xl 
      text-font-color-dark border-b border-white/10
    ">

      <div className="
        absolute left-5 md:left-7.5 top-1/2 
        -translate-y-1/2 lg:hidden
      ">
        <TextAlignJustify
          className="cursor-pointer"
          onClick={() => setMenu((prev) => !prev)}
        />
      </div>


      <div className="
        absolute right-5 top-1/2 
        -translate-y-1/2 md:left-1/2 
        md:right-auto md:-translate-x-1/2 lg:hidden
      ">
        <img
          src={logo.src}
          alt="LumiCine Logo"
          className="h-30 md:h-36 object-contain"
        />
      </div>


      <div className="
        hidden lg:absolute lg:left-0 lg:top-0 
        lg:h-full lg:flex lg:items-center lg:pl-7.5
      ">
        <img
          src={logo.src}
          alt="LumiCine Logo"
          className="h-36 object-contain"
        />
      </div>


      <div className="
        hidden lg:flex absolute left-1/2 top-1/2 
        -translate-x-1/2 -translate-y-1/2
      ">
        <MenuListElements className="flex-row" />
      </div>


      <div className="
        hidden md:flex absolute right-0 top-0 
        h-full items-center pr-5 md:pr-7.5
      ">
        <div className="relative">

          <div
            className={`
              flex items-center h-10 rounded-xl 
              bg-white/5 border border-white/10 
              overflow-hidden transition-all duration-300
              ${
                isSearchOpen
                  ? "w-44 md:w-70 px-3"
                  : "w-10 px-2"
              }
            `}
            onMouseEnter={openSearch}
            onMouseLeave={closeSearch}
          >

            <button
              type="button"
              onClick={() =>
                setIsSearchOpen((prev) => !prev)
              }
              className={`
                shrink-0 transition-all duration-300
                ${
                  isSearchOpen
                    ? "pr-2 border-r border-white/20"
                    : ""
                }
              `}
            >
              <Search
                className="
                  h-5 w-5 text-white/60 
                  hover:text-white transition
                "
              />
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
                  handleEnterSearch();
                }
              }}
              placeholder="Buscar filmes..."
              className={`
                flex-1 ml-3 min-w-0 
                bg-transparent outline-none 
                text-sm text-white 
                placeholder:text-white/40 
                transition-all duration-300
                ${
                  isSearchOpen
                    ? "opacity-100"
                    : "opacity-0 w-0"
                }
              `}
            />


            {isSearchOpen && (
              <button
                type="button"
                onClick={() =>
                  handleEnterSearch()
                }
                className="
                  shrink-0 hover:scale-110 transition
                "
              >
                <Send
                  size={18}
                  className={
                    search.trim()
                      ? "text-white"
                      : "text-white/40"
                  }
                />
              </button>
            )}

          </div>


          {isSearchOpen &&
            foundMovies.length > 0 && (
              <div className="
                absolute top-full mt-1 right-0 
                w-44 md:w-85 rounded-xl 
                bg-background-dark 
                border border-white/10 
                shadow-xl overflow-hidden z-50
              ">

                {foundMovies.map((movie, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() =>
                      handleSearch(movie)
                    }
                    className="
                      w-full px-4 py-3 
                      text-left text-font-dark 
                      hover:bg-white/10 
                      transition
                    "
                  >
                    {movie.title}
                  </button>
                ))}

              </div>
          )}


          {isSearchOpen &&
            foundMovies.length === 0 &&
            search.trim() && (
              <div className="
                absolute top-full mt-1 right-0 
                w-44 md:w-85 rounded-xl 
                bg-background-dark 
                border border-white/10 
                shadow-xl overflow-hidden z-50
              ">
                <p className="
                  px-4 py-3 text-left text-font-dark
                ">
                  Nenhum filme encontrado.
                </p>
              </div>
          )}

        </div>
      </div>

    </header>
  );
}