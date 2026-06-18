import Header from "../../components/layout/Header";
import AvatarMovie from "../../assets/images/avatar_h_.jpg";
import { ChevronRight, ChevronLeft } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="w-full py-10">
        <div className="px-7.5 flex justify-center">
          <div className="w-9/12 max-w-5xl">
            <div className="aspect-21/9 rounded-2xl relative overflow-hidden shadow-sm">
              <img
                src={AvatarMovie.src}
                alt="Avatar Movie Poster"
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/40 to-transparent" />
            </div>

            <div className="flex mt-4 justify-center h-16 gap-3"> 
              <span className="bg-font-dark h-2.5 w-10 rounded-full"></span>
              <span className="bg-tertiary-dark h-2.5 w-10 rounded-full"></span>
              <span className="bg-tertiary-dark h-2.5 w-10 rounded-full"></span>
              <span className="bg-tertiary-dark h-2.5 w-10 rounded-full"></span>
            </div>

            <section className="bg-secondary-dark mt-4 rounded-2xl h-30 flex items-center justify-between px-10">
              <button
                disabled
                className="text-font-dark/30 cursor-default"
              >
                <ChevronLeft className="w-10 h-10 stroke-1" />
              </button>

              <div className="flex overflow-x-clip scrollbar-hide gap-7">
                <button className="bg-accent w-28 h-24 rounded-2xl relative">
                  <span className="absolute text-base top-2 left-1/2 -translate-x-1/2">
                    Seg
                  </span>

                  <h3 className="h-full text-2xl flex items-center justify-center mt-2">
                    29
                  </h3>
                </button>

                <button className="border border-tertiary-dark w-28 h-24 rounded-2xl relative">
                  <span className="absolute text-base top-2 left-1/2 -translate-x-1/2">
                    Ter
                  </span>

                  <h3 className="h-full text-2xl flex items-center justify-center mt-2">
                    30
                  </h3>
                </button>

                <button className="border border-tertiary-dark w-28 h-24 rounded-2xl relative">
                  <span className="absolute text-base top-2 left-1/2 -translate-x-1/2">
                    Qua
                  </span>

                  <h3 className="h-full text-2xl flex items-center justify-center mt-2">
                    01
                  </h3>
                </button>

                <button className="border border-tertiary-dark w-28 h-24 rounded-2xl relative">
                  <span className="absolute text-base top-2 left-1/2 -translate-x-1/2">
                    Qui
                  </span>

                  <h3 className="h-full text-2xl flex items-center justify-center mt-2">
                    02
                  </h3>
                </button>

                <button className="border border-tertiary-dark w-28 h-24 rounded-2xl relative">
                  <span className="absolute text-base top-2 left-1/2 -translate-x-1/2">
                    Sex
                  </span>

                  <h3 className="h-full text-2xl flex items-center justify-center mt-2">
                    03
                  </h3>
                </button>
              </div>

              <button className="text-font-dark hover:text-white transition-colors duration-200">
                <ChevronRight className="w-10 h-10 stroke-1" />
              </button>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}