import logo from "../../assets/images/logo.png";
import { Search } from "lucide-react";

export default function Header() {
  return (
   <div className="w-full h-16 flex items-center px-28 bg-background-dark text-font-color-dark border-b-2 border-secondary-dark">
        <div className="flex-1">
            <img
            src={logo.src}
            alt="LumiCine Logo"
            className="h-40"
            />
        </div>

        <ul className="flex gap-7">
            <li>Programação</li>
            <li>LumiBar</li>
            <li>Meus Ingressos</li>
        </ul>

        <div className="flex-1 flex justify-end">
            <Search className="h-6" />
        </div>
    </div>
  );
}