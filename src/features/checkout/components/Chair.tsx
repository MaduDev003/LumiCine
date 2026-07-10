import { Accessibility } from "lucide-react";

type Props = {
    type: "standard" | "accessible" | "companion";
};

export default function Chair({ type }: Props) {
    return (
        <>
            {type === "accessible" && (
                <div className="w-15 h-10 mt-2 bg-[#D9D9D9] rounded-xl flex items-center justify-center">
                    <Accessibility size={24} className="text-secondary-dark rotate-180" />
                </div>
            )}

            {type === "companion" && (
                <div className="flex items-center">
                    <div className="bg-blue-500 w-1.5 h-8 rounded-full mt-2" />

                    <div className="relative w-12 flex flex-col items-center gap-1 px-0.5">
                        <div className="bg-blue-500 h-2 w-[90%] rounded-full" />

                        <div className="bg-blue-500 h-8 w-full rounded-xl flex items-center justify-center">
                            <span className="text-white text-[14px] rotate-180">
                                AC
                            </span>
                        </div>
                    </div>

                    <div className="bg-blue-500 w-1.5 h-8 rounded-full mt-2" />
                </div>
            )}

            {type === "standard" && (
                <div className="flex items-center">
                    <div className="bg-[#D9D9D9] w-1.5 h-8 rounded-full mt-2" />

                    <div className="w-12 flex flex-col items-center gap-1 px-0.5">
                        <div className="bg-[#D9D9D9] h-2 w-[90%] rounded-full" />
                        <div className="bg-[#D9D9D9] h-8 w-full rounded-xl" />
                    </div>

                    <div className="bg-[#D9D9D9] w-1.5 h-8 rounded-full mt-2" />
                </div>
            )}
        </>
    );
}