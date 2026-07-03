"use client";
import { useCheckoutStore } from "@/src/store/checkoutStore";
export default function SessionPage() {
  
    const movie = useCheckoutStore((state) => state.movie);
  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="text-4xl text-font-dark font-bold">
        {movie?.title}
      </h1>
    </main>
  )
}