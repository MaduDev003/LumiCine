import { X } from "lucide-react";

export function ErrorState({ title, message }: any) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center col-span-full">
      <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-5">
            <X className="w-7 h-7 text-red-400" />
        </div>

      <h2 className="text-xl text-white font-medium mb-2">
        {title}
      </h2>

      <p className="text-sm text-white/60 max-w-md mb-6">
        {message}
      </p>

    </div>
  );
}