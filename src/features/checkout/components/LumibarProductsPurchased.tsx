import { Lumibar } from "@/src/types/checkout/lumiBarType";
import { BRFormat } from "@/src/utils/fixValueForBrazilianFormat";

type Props = {
    items: Lumibar[];
};

export default function LumibarProductsPurchased({ items }: Props) {
    return (
        <div
            className="
                relative w-80 h-fit rounded-3xl overflow-hidden
                bg-secondary-dark shadow-2xl
                transition-all duration-300 ease-out
                hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)]
            "
        >
            {/* Recortes laterais */}
            <div className="absolute left-0 top-[38%] -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-background-dark z-20" />
            <div className="absolute right-0 top-[38%] -translate-y-1/2 translate-x-1/2 w-7 h-7 rounded-full bg-background-dark z-20" />

            <div className="px-5 py-6 flex flex-col gap-5">
                <h2 className="text-white font-bold text-[18px] text-center">
                    Pedido Lumibar
                </h2>

                <div className="w-full border-t border-dashed border-white/20" />

                <div className="flex flex-col gap-3">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="
                                bg-background-dark/40
                                rounded-xl
                                p-3
                                flex
                                justify-between
                                items-center
                            "
                        >
                            <div className="flex gap-3 justify-center items-center">
                                 <p className="text-font-secondary-dark font-semibold text-sm">
                                    {item.quantity}x
                                </p>
                                <p className="text-font-dark font-semibold text-sm">
                                     {item.name}
                                </p>
                               
                            </div>

                            <p className="text-font-secondary-dark font-semibold text-sm">
                                R$ {BRFormat(item.price * item.quantity)}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-auto pt-5 border-t border-dashed border-white/20">
                    
                </div>
            </div>
        </div>
    );
}