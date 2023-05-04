import React from 'react';
import { Link } from 'react-router-dom';

const CartNotFilled = () => {

    return (

        <article className='border-2 min-h-screen max-w-4xl mx-auto flex flex-col justify-center items-center gap-8'>
            <h2 className='text-3xl text-white font-semibold'>Your Cart is Empty</h2>
            <Link to='/' className=''>
                <button className='text-2xl font-semibold border-none bg-cyan-500 hover:bg-cyan-600 text-black pl-4 pr-4 pt-3 pb-3 rounded-xl'>
                    Shop now on Emart
                </button>
            </Link>
        </article>
    )
}

export default CartNotFilled