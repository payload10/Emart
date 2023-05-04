import React from 'react'

const Review = ({ checkoutToken }) => {

    return (

        <section className='max-w-4xl mx-auto flex-grow flex justify-start items-center mb-2 mt-2'>
            <article className='w-full flex flex-col justify-center items-start mt-4'>
                <h2 className='text-4xl text-white font-semibold mb-10'>Order Summary</h2>
                {console.log("Token:",checkoutToken)}
                <ul className='w-full flex flex-col gap-6'>
                    {
                        checkoutToken.line_items.map((eachProduct) => (

                            <li className='flex justify-between items-center' key={eachProduct.id}>
                                <div className='flex flex-col'>
                                    <h3 className='text-white text-2xl text-left font-semibold'>{eachProduct.name}</h3>
                                    <h4 className='text-gray-400 text-xl text-left'>Quantity: {eachProduct.quantity}</h4>
                                </div>
                                <div>
                                    <h4 className='text-cyan-500 font-semibold text-xl text-left'>{eachProduct.line_total.formatted_with_symbol}</h4>
                                </div>
                            </li>
                        ))
                    }
                </ul>
                <ul className='mt-10 flex self-end gap-1'>
                    <li className='text-cyan-500 font-semibold text-2xl text-left'>Total:</li>
                    <li className='text-cyan-500 font-semibold text-2xl text-left'>{checkoutToken.subtotal.formatted_with_symbol}</li>
                </ul>
            </article>
        </section>
    )
}

export default Review