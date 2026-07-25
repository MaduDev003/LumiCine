import popcorn from "@/src/assets/images/popcorn.png";
import hotDog from "@/src/assets/images/hotDog.png";
import nachos from "@/src/assets/images/nachos.png";
import strawberryMilk from "@/src/assets/images/strawberryMilk.png";
import frenchFries from "@/src/assets/images/frenchFries.png";
import water from "@/src/assets/images/water.png";
import softDrink from "@/src/assets/images/softDrink.png";
import juice from "@/src/assets/images/juice.png";
import chocoMilk from "@/src/assets/images/chocoMilk.png";
import vanillaMilk from "@/src/assets/images/vanillaMilk.png";

export const lumiBarProducts = {
  snacks: [
    {
      id: 1,
      name: "Pipoca P",
      description: "escolha entre doce ou salgada na retirada",
      price: 9,
      image: popcorn.src,
    },
    {
      id: 2,
      name: "Pipoca M",
      description: "escolha entre doce ou salgada na retirada",
      price: 12,
      image: popcorn.src,
    },
    {
      id: 3,
      name: "Pipoca G",
      description: "escolha entre doce ou salgada na retirada",
      price: 16,
      image: popcorn.src,
    },
    {
      id: 4,
      name: "Nachos",
      description: "Cheddar, carne, pimenta e guacamole",
      price: 28,
      image: nachos.src,
    },
    {
      id: 5,
      name: "Cachorro Quente",
      description: "Salsicha, molho e batata palha",
      price: 25,
      image: hotDog.src,
    },
    {
      id: 6,
      name: "Batata Frita",
      description: "Serve 2 pessoas e acompanha ketchup",
      price: 25,
      image: frenchFries.src,
    }
  ],

  drinks: [
    {
      id: 1,
      name: "Água Mineral",
      description: "Água sem gás",
      price: 3,
      image: water.src,
    },
    {
      id: 2,
      name: "Refrigerante",
      description: "500 ML Sabor escolhido na retirada",
      price: 8,
      image: softDrink.src,
    },
    {
      id: 3,
      name: "Suco ",
      description: "500 ML Sabor escolhido na retirada",
      price: 8,
      image: juice.src,
    },
    {
      id: 4,
      name: "MilkShake De Chocolate",
      description: "500 ML",
      price: 12,
      image: chocoMilk.src,
    },
    {
      id: 5,
      name: "MilkShake De Baunilha",
      description: "500 ML",
      price: 12,
      image: vanillaMilk.src,
    },
    {
      id: 6,
      name: "Milkshake De Morango",
      description: "500 ML",
      price: 12,
      image: strawberryMilk.src,
    }
  ],
};