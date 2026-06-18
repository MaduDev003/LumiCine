import Header from "../../components/layout/Header";
import AvatarMovie from "../../assets/images/avatar_h_.jpg";

export default function HomePage() {
  return (
    <>
      <Header />

      <main className="w-full py-10">
        <div className="px-7.5 flex justify-center">
          <div className="w-4/5 max-w-5xl">
            <div className="aspect-21/9 rounded-2xl relative overflow-hidden shadow-sm">
              <img
                src={AvatarMovie.src}
                alt="Avatar Movie Poster"
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/40 to-transparent" />
            </div>
          </div>
        </div>
        
      </main>
    </>
  );
}