import React from 'react';
import CartFilled from './CartFilled';
import CartNotFilled from './CartNotFilled';

const Cart = ({ cart, handleEmptyCart, totalItems, handleRemoveItemFromCart, handleProductIncrement, handleProductDecrement, nextStep, backStep }) => {

    let isEmpty = totalItems;

    if(isEmpty === 0) {
        
        isEmpty = false;

    } else if (isEmpty !== 0) {

        isEmpty = true;
    }

    console.log(isEmpty)
    console.log(cart)

    return (
        
        <main className='w-full bg-gray-900 justify-center items-center'>
            {
                isEmpty ? <CartFilled cartItems={cart} handleEmptyCart={handleEmptyCart} handleRemoveItemFromCart={handleRemoveItemFromCart} handleProductIncrement={handleProductIncrement} handleProductDecrement={handleProductDecrement} nextStep={nextStep} /> : <CartNotFilled /> 
            }
        </main>

    )
}

export default Cart