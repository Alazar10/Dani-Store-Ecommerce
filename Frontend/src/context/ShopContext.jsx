import { createContext } from "react";
import { products } from "../assets/assets";

 export const ShopContext = createContext();

 const ShopContextProvider = (props) => {
    
    const currency = 'ETB';
    const delivery_fee = 100;

    const value = {
        currency, delivery_fee, products
    }
    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )

 }
 export default ShopContextProvider