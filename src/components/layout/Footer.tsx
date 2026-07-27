import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <>
        <footer className="bg-[#2C2C2C] text-gray-300 py-16 px-6 fiexed bottom-0 w-full">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

              {/* LumiCine */}
              <div>
                <h3 className="text-font-dark text-xl mb-4">LumiCine</h3>

                <p className="mb-4">
                  Sua próxima sessão começa aqui.
                </p>

                <p className="text-sm text-gray-400">
                  Desenvolvido com React • Next.js • Tailwind CSS • TypeScript
                </p>
              </div>

              {/* Sobre */}
              <div>
                <h3 className="text-font-dark text-xl mb-4">
                  Sobre Mim
                </h3>

                <p className="text-sm text-gray-400 leading-relaxed">
                  Desenvolvedora Front-End com interesse em UI/UX, acessibilidade e experiências do usuário.
                </p>
              </div>

              {/* Redes */}
              <div>
                <h3 className="text-font-dark text-xl mb-4">
                  Redes
                </h3>

                <div className="flex flex-col gap-3">

                  <a
                    href="https://www.linkedin.com/in/maria-eduarda-schwarz/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-400 hover:text-orange-300 transition-colors"
                  >
                    LinkedIn
                  </a>

                  <a
                    href="https://github.com/NinaS23"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-400 hover:text-orange-300 transition-colors"
                  >
                    GitHub (Estudante)
                  </a>

                    <a
                    href="https://github.com/MaduDev003"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-400 hover:text-orange-300 transition-colors"
                  >
                    GitHub (Atual)
                  </a>

                  <a
                  href="mailto:mariaschwarzdev@gmail.com"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg
                            bg-white/10 hover:bg-white/20 border border-white/10
                            transition-colors"
                >
                  <Mail size={16} />
                  Enviar e-mail
                </a>

                </div>
              </div>

            </div>

            <div className="mt-16 border-t border-gray-700 pt-6">
              <p className="text-center text-gray-400">
                © 2026 LumiCine. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </footer>
    </>
  );
}