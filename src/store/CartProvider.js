import CartContext from "./Cart-context";
import { useReducer } from "react";

const defaultCartState = {
    items : [],
    totalAmount : 0
};

const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        const updatedItems = state.items.concat(action.item);
        const updatedTotalAmount = state.totalAmount + action.item.price*action.item.amount;
    return {
        items : updatedItems,
        amount : updatedTotalAmount
    };
    };
    return defaultCartState;
};

const CartProvider = props => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemHandler = item => {
        dispatchCartAction({type : 'ADD', item:item})
    };

    const removeItemHandler = id => {
        dispatchCartAction({type : 'Remove', id:id})
    };

    const cartContext = {
        items : cartState.items,
        totalAmount : cartState.totalAmount,
        addItem : addItemHandler,
        removeItem : removeItemHandler
        };

    return(
        <CartContext.Provider value={cartContext} >
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;