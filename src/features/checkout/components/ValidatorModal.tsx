import { X, AlertCircle } from "lucide-react";

type Props = {
  invalidFields: string[];
  setIsValidatorModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ValidatorModal({
  invalidFields,
  setIsValidatorModalOpen,
}: Props) {
  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/30"
        onClick={() => setIsValidatorModalOpen(false)}
        />

      <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-3 duration-300">
        <div className="w-110 rounded-xl border border-accent/40 bg-secondary-dark shadow-[0_30px_30px_rgba(0,0,0,0.8)]">
          <div className="flex items-start gap-3 p-4">
            <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-accent/15">
              <AlertCircle className="h-5 w-5 text-accent" />
            </div>

            <div className="flex-1">
              <h3 className="font-medium text-font-dark">
                Revise os campos abaixo
              </h3>

              <p className="mt-1 text-sm text-font-secondary-dark">
                  preencha corretamente:
              </p>

              <ul className="mt-2 space-y-1 text-sm">
                {invalidFields.map((field, index) => (
                  <li key={index}>• {field}</li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setIsValidatorModalOpen(false)}
              className="rounded-full p-1 transition hover:bg-white/20 cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}