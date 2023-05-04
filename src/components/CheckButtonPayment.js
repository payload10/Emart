import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowCircleLeft } from 'react-icons/fa';

const CheckButtonPayment = ({ checkoutToken, steps, activeStep, setActiveStep }) => {

    return (

        <section className='border-2 flex justify-between items-center'>
            {console.log("ct:",checkoutToken)}
            <Link to="/checkout/shipping-details" className='items-center border-none text-xl md:text-xl font-semibold rounded-xl'>
                <button onClick={() => {

                    setActiveStep((currentPage) => currentPage - 1);

                }}><FaArrowCircleLeft className='text-4xl md:text-5xl text-cyan-500'/></button>
            </Link>
            <Link to="/checkout/confirm" className='text-xl md:text-xl font-semibold rounded-xl'>
                <button className='text-xl md:text-xl font-semibold bg-cyan-500 hover:bg-cyan-600 text-black p-3 md:p-3 rounded-xl' >
                    Pay {checkoutToken.subtotal.formatted_with_symbol}
                </button>
            </Link>
        </section>
    )
}

export default CheckButtonPayment