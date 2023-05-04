import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners';


const ConfirmationPage = ({ order }) => {

    console.log("Order customer:",order.customer)
    return (
        
        <section className='flex flex-col justify-center items-center min-h-screen'>
            {
                (order.customer) ? (
                    <>
                        <h2 className='text-4xl mt-10 mb-6 font-semibold text-white'>Wohooo! Order Placed</h2>
                        <div className='flex flex-col items-center justify-center gap-4'>
                            <h2 className='text-2xl md:text-4xl font-semibold text-white'>Thank you for your purchase, <span className='text-cyan-500'>{order.customer.firstname} {order.customer.lastname}</span></h2>
                            <hr className='mt-6 mb-6 w-[84vw] md:w-[50vw] text-white '/>
                            <h4 className='text-xl md:text-3xl text-yellow-400'>Order ref: {order.customer_reference}</h4>
                        </div>
                        <button type='button' className='text-xl mt-10 md:text-xl font-semibold border-none bg-cyan-500 hover:bg-cyan-600 text-black p-3 md:p-3 rounded-xl'>
                            <Link to="/" >Back to Cart</Link>
                        </button>
                    </>
            
                    ) : (
            
                    <>
                        <PropagateLoader loading={true} color="cyan" />
                    </>
                )
        }
        </section>
    )
}

export default ConfirmationPage