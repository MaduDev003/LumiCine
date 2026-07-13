import SnackCard from "../ui/snackCard";
import popcorn from "../../assets/images/popcorn.png";
import hotDog from "../../assets/images/hotDog.png";
import nachos from "../../assets/images/nachos.png"

export default function LumiBar() {
  return (
    <div className="flex flex-col  gap-14">
        <section className="w-full">
            <h1 className="text-2xl mb-6">Comidas</h1>
            <div className="flex justify-around">
                    <SnackCard
                        name="Pipoca"
                        description="Caramelo ou Manteiga • Escolha na retirada"
                        price={16}
                        image={popcorn.src}
                    />
                    <SnackCard
                        name="Nachos"
                        description="Cheddar, carne, pimenta e guacamole"
                        price={25}
                        image={nachos.src}
                    />
                     <SnackCard
                        name="Cachorro Quente"
                        description="Salsicha, queijo, molho e batata palha"
                        price={28}
                        image={hotDog.src}
                    />
            </div>
        </section>
        <section className="w-full">
            <h1 className="text-2xl mb-6">Bebidas</h1>
            <div className="flex justify-around">
                    <SnackCard
                        name="Combo Dupla Hot"
                        description="2 refrigerantes + 2 Hot Dogs"
                        price={20}
                        image={popcorn.src}
                    />
                    <SnackCard
                        name="Combo Dupla Hot"
                        description="2 refrigerantes + 2 Hot Dogs"
                        price={20}
                        image={popcorn.src}
                    />
                    <SnackCard
                        name="Combo Dupla Hot"
                        description="2 refrigerantes + 2 Hot Dogs"
                        price={20}
                        image={popcorn.src}
                    />
            </div>
        </section>
    </div>
  );
}