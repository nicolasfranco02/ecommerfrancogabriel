import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const CartContex = createContext()

const {Provider} = CartContex;

const MyProvider = ({children})=>{
const [cart , setCart]= useState ([])

//metodo some (true o false) ItemDetail- se encarga si hay un prodcto a agregar ya esta o no en el carro
const isInCart =(id) =>{
    return cart.findIndex(items=>items.id=== id)
}

const agregarAlCArrito=(item, contador)=>{
console.log(item , contador)
let posicion= isInCart(item.id)
console.log(posicion);
if (posicion ==-1){
    setCart([...cart,{...item,contador:contador}])
}else{
    const aux2 = [...cart]
     aux2[posicion].contador = aux2[posicion].contador + contador
    setCart(aux2)
}

}
useEffect(()=>{
    console.log(cart)
},[cart])


// itemDetail se encarga de agregar el prod selec al cxart sin pisar a los agregados, y si es duplicado, 
const addIten =(items, contador)=>{
    const newItem ={
        ...items,
        contador
       
    } 

    if (isInCart(newItem.id) ){
        const findProduct = cart.find(x=> x.id === newItem.id)
        const productIndex = cart.indexOf(findProduct)
        const auxArray=[...cart]
        auxArray[productIndex].contador +=contador;
        setCart(auxArray)

    }else {
        setCart([...cart], newItem)
    }
    console.log();
}


//vaciar carrito en cart boton
const emptyCart = () =>{
    setCart([cart]);
}


//metodo filter en cart se encarga en funcion del id
const deleteItem =(id)=>{
    return setCart(cart.filter(items=> items.id !==id))
}


//metodo reduce -card whitget retorna la contador de unicaddes de nuestro cart
const getItemQty = ()=>{
return cart.reduce((acc , items)=> acc += items.contador, 0)
}


//metodo reduce cart valor total de compra
const getItemPrice =() =>{

    return cart.reduce((acc , items)=>acc += items.contador * items.precio, 0)
}


    return <Provider value={{cart,agregarAlCArrito, isInCart, addIten,deleteItem,emptyCart,getItemPrice, getItemQty}}>{children}</Provider>
}

export default MyProvider