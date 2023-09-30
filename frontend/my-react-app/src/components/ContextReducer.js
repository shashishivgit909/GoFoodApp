// import React,{createContext,useReducer,useContext } from "react";

// const CartStateContext=createContext(); //they are global state , so can be acess all over app and its changes can be seeen on whole ap
// const CardDispatchContext=createContext();

// const reducer=(state, action)=>{
// switch(action.type){
//     case "ADD":
//         return[...state,{}]

//     default:
//         console.log("eror in reducer");
// }
// }

// export const CardProvider=({children})=>{
//     const [state, dispatch] = useReducer(reducer, );//initialTasks:[], emplty list for initialc cart
   
//     return (
//       <CartStateContext.Provider value={state}>
//         <CardDispatchContext.Provider value={dispatch}>
//           {children}
//         </CardDispatchContext.Provider>
//       </CartStateContext.Provider>
//     );
//   }

//   //above exported cardProvider but we need to export CartStateContext , CardDispatchContext
//  export const useCart=()=>useContext(CartStateContext);
//  export const useDispatch=()=> useContext(CardDispatchContext); 

import React, { useReducer, useContext, createContext } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state, { id: action.id, name: action.name, qty: action.qty, size: action.size, price: action.price, img: action.img }]
        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr;
        case "DROP":
            let empArray = []
            return empArray
        case "UPDATE":
            let arr = [...state]
            arr.find((food, index) => {
                if (food.id === action.id) {
                    console.log(food.qty, parseInt(action.qty), action.price + food.price)
                    arr[index] = { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price }
                }
                return arr
            })
            return arr
        default:
            console.log("Error in Reducer");
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);

    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);