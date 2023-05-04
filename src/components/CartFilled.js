import React from 'react';
import CartItems from './CartItems';
import { Link } from 'react-router-dom';

const CartFilled = ({ cartItems, handleEmptyCart, handleRemoveItemFromCart, handleProductIncrement, handleProductDecrement, activeStep, setActiveStep, nextStep, backStep }) => {

    return (

        <section className='min-h-screen p-4 mx-auto max-w-4xl flex flex-col justify-start items-center'>
                <article className='mx-auto max-w-4xl grid grid-flow-row grid-flow-1 gap-6 md:grid-flow-row md:grid-cols-3'>
                    {
                        cartItems.line_items.map((eachProduct) => (

                            <CartItems key={eachProduct.id} eachProduct={eachProduct} handleRemoveItemFromCart={handleRemoveItemFromCart} handleProductIncrement={handleProductIncrement} handleProductDecrement={handleProductDecrement} />
                        ))
                    }
                </article>
            
            <hr className='text-white w-full mt-12'/>

            <section className='w-full max-w-4xl flex flex-col justify-between items-center gap-6 mt-12 mb-8 md:flex md:flex-row md:justify-between md:items-start'>
                <h2 className='self-center md:self-end w-fit text-3xl font-semibold text-cyan-500 text-left md:flex-grow'>Subtotal: {cartItems.subtotal.formatted_with_symbol}</h2>
                <div className='w-full md:w-fit flex flex-col gap-4 md:flex md:flex-row'>
                    <button className='text-xl md:text-xl font-semibold border-none bg-cyan-500 hover:bg-cyan-600 text-black p-3 md:p-3 rounded-xl' onClick={() => handleEmptyCart()}>Empty Cart</button>
                    <Link to="/checkout" className='text-xl md:text-xl font-semibold border-none bg-cyan-500 hover:bg-cyan-600 text-black p-3 md:p-3 rounded-xl'>Checkout</Link>
                </div>
            </section>
        </section>
            
        
        
    )
}

export default CartFilled