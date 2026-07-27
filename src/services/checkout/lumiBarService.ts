import { Lumibar } from "@/src/types/checkout/LumiBarType";

export function handlePurchase(
    operation: "plus" | "minus", 
    purchasedProducts: Lumibar[], 
    productForPurchase: {name: string, price:number}
  ) {
    const product = purchasedProducts.find(
      (item) => item.name === productForPurchase.name
    );

    if (operation === "plus") {
      if (product?.quantity === 6) return;

      if (product) {
        const increaseQuantity = purchasedProducts.map((item) =>
            item.name ===  productForPurchase.name
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item
            )
        return {
            products: increaseQuantity
        };
       
      } else {
       const addProduct = [
            ...purchasedProducts,
            {
                ...productForPurchase,
                quantity: 1,
            },
        ];

        return {
        products: addProduct,
        };
      }
    };

    if (operation === "minus") {
      if (product?.quantity === 1) {
        const removeProduct =  purchasedProducts.filter(
            (item) => item.name !== productForPurchase.name
          )
        return {
            products: removeProduct
        };
      } else {
        const decreaseQuantity = purchasedProducts.map((item) =>
            item.name === productForPurchase.name
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                }
              : item
          );
        return {
            products: decreaseQuantity
        };
      }
    }
  }

  export function sumLumibarProducts(lumibarProducts: Lumibar[]) {
    let quantity = 0;
    let price = 0;

    lumibarProducts.forEach((item) => {
      quantity += item.quantity;
      price += item.quantity * item.price;
    });

    return {
      quantity,
      price,
    };
  }