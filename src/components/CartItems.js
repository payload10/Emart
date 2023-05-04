import React from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

const CartItems = ({ eachProduct, handleRemoveItemFromCart, handleProductIncrement, handleProductDecrement }) => {

    return (

        <section className='border-2 border-white rounded-lg shadow-2xl'>
            <figure className='flex flex-col'>
                <img src={eachProduct.image.url} alt="product" className='w-fit h-fit p-2 rounded-2xl'/>
                    <figcaption className='text-white flex justify-between items-start gap-4 ml-4 mb-4 mr-4 mt-2'>
                        <div className='border-red-600 flex flex-col justify-start items-start gap-2'>
                            <h2 className='w-full text-xl text-left font-semibold'>{eachProduct.name}</h2>  
                            <div className='text-lg md:text-md text-start w-full flex justify-between items-center '>
                                <button onClick={() => handleProductDecrement(eachProduct.id, eachProduct.quantity - 1)}><FaMinus /></button>
                                <p className='text-2xl'>{eachProduct.quantity}</p>
                                <button onClick={() => handleProductIncrement(eachProduct.id, eachProduct.quantity + 1)}><FaPlus /></button>
                            </div>
                            <p className='text-lg md:text-md text-start'>Total: <strong>{eachProduct.line_total.formatted_with_symbol}</strong></p>
                        </div>
                        <div className='text-2xl font-semibold text-cyan-500 flex flex-col self-start items-center space-y-8'>
                            <p>{eachProduct.price.formatted_with_symbol}</p>
                        </div>
                    </figcaption>

                    <button className='max-w-4xl mx-auto p-6 rounded-lg flex justify-center items-center h-10 ml-4 mr-4 mb-4 bg-red-600 hover:bg-red-700' onClick={() => handleRemoveItemFromCart(eachProduct.id)}>
                        <div className='text-2xl text-white font-semibold'>Remove</div>
                    </button>
            </figure>
            
        </section>
    )
}

export default CartItems