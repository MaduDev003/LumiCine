"use client";

import QRCode from "qrcode";
import { useEffect, useState } from "react";

type Props = {
    posterUrl?: string;
    movieTitle?: string;
    date?: string;
    time: string;
    seatPosition: string;
    room: number;
    ticketType: "full" | "half"
};

export default function TicketConcluded({
    posterUrl,
    room,
    movieTitle,
    date,
    time,
    seatPosition,
    ticketType
}: Props) {
    const initialTime = time.slice(0, 5);
    const translateTicketType = ticketType === "full" ? "Inteira" : "Meia";
    const [qrCode, setQrCode] = useState("");

    async function mountQRCode() {
        const content = JSON.stringify({
            movieTitle,
            date,
            time,
            seatPosition,
            ticketType
        });

        const qr = await QRCode.toDataURL(content);

        setQrCode(qr);
    }

    useEffect(() => {
        mountQRCode();
    }, []);

    return (
        <div
            className="
                relative w-80 rounded-3xl overflow-hidden
                bg-secondary-dark shadow-2xl
                transition-all duration-300 ease-out
                hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)]
            "
        >
            <div className="absolute left-0 top-[38%] -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-background-dark z-20" />
            <div className="absolute right-0 top-[38%] -translate-y-1/2 translate-x-1/2 w-7 h-7 rounded-full bg-background-dark z-20" />

            <div
                className="relative h-48"
                style={{
                    backgroundImage: `url(${posterUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-black/25" />
            </div>

            <div className="px-5 py-6 flex flex-col gap-5 justify-center items-center">
                <h2 className="text-white font-bold text-[18px]">
                    {movieTitle}
                </h2>

                <div className="w-full border-t border-dashed border-white/20" />

                <div className="grid grid-cols-2 gap-x-4 gap-y-5">
                    <div className="bg-background-dark/40 rounded-xl p-3">
                        <p className="text-font-dark/50 text-[10px] uppercase tracking-[0.2em] mb-1">
                            Data e Hora
                        </p>
                        <p className="text-font-dark font-semibold text-sm">
                            {date} • {initialTime}
                        </p>
                    </div>

                    <div className="bg-background-dark/40 rounded-xl p-3 text-right">
                        <p className="text-font-dark/50 text-[10px] uppercase tracking-[0.2em] mb-1">
                            Sala
                        </p>
                        <p className="text-font-dark font-semibold text-sm">
                            {room}
                        </p>
                    </div>

                    <div className="bg-background-dark/40 rounded-xl p-3">
                        <p className="text-font-dark/50 text-[10px] uppercase tracking-[0.2em] mb-1">
                            Assentos
                        </p>
                        <p className="text-font-dark font-semibold text-sm">
                            {seatPosition}
                        </p>
                    </div>

                    <div className="bg-background-dark/40 rounded-xl p-3 text-right">
                        <p className="text-font-dark/50 text-[10px] uppercase tracking-[0.2em] mb-1">
                            Ingresso
                        </p>
                        <p className="text-font-dark font-semibold text-sm">
                           {translateTicketType}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-3 pt-2">
                   <div className="bg-tertiary-dark rounded-2xl p-4 shadow-lg">
                            <div
                                className="
                                    bg-white rounded-xl p-4
                                    shadow-[0_8px_25px_rgba(0,0,0,0.15)]
                                    border border-black/5
                                    flex items-center justify-center
                                "
                            >
                                {qrCode && (
                                    <img
                                        src={qrCode}
                                        alt="QR Code do ingresso"
                                        width={140}
                                        height={140}
                                        className="rounded-md"
                                    />
                                )}
                            </div>
                        </div>
                    <p className="text-font-dark/60 text-xs text-center leading-relaxed max-w-55">
                        Apresente este QR Code na entrada da sala
                    </p>
                </div>
            </div>
        </div>
    );
}