"use client";
import { useCheckoutStore } from "@/src/store/checkoutStore";
import CheckoutProgress from "../components/checkoutProgress";
export default function SessionPage() {
  
    const movie = useCheckoutStore((state) => state.movie);
  return (
    <main className="mt-8 mb-10">
       <div className="px-3 flex justify-center pt-8 pb-20">
            <div className="w-full max-w-275 mx-auto pb-5  h-screen flex flex-col gap-4">
                <CheckoutProgress step="session"/>
                <div className="bg-blue-950 h-full">1</div>
            </div>
        </div>
    </main>
  )
}