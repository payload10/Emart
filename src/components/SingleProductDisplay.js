import React from 'react';
import { FaCartArrowDown } from 'react-icons/fa';

const SingleProductDisplay = ({ eachProduct, onAddToCart }) => {

    return (

        <section className='flex flex-col md:flex md:flex-row justify-center items-center md:mt-10'>
            <figure className='flex flex-col md:flex md:flex-row gap-4'>
                <img src={`${eachProduct.image.url}`} alt="product" className='w-fit h-fit md:w-1/2 md:h-1/2 p-2 rounded-2xl' />
                <figcaption className='md:w-full text-white flex md:flex-col justify-between items-start md:justify-center md:items-start md:gap-10 gap-4 ml-4 mb-4 mr-4 mt-2'>
                    <div className='md:w-full flex flex-col justify-start items-start gap-2'>
                        <h2 className='text-3xl text-left font-semibold'>{eachProduct.name}</h2>  
                        <p className='text-xl md:text-md text-left' dangerouslySetInnerHTML={{__html:eachProduct.description}}></p>
                    </div>
                    <div className='text-3xl md:text-4xl md:w-full font-semibold text-cyan-500 flex flex-col md:flex-row self-start items-center md:justify-between md:items-center space-y-8 md:space-y-0'>
                        <p>{eachProduct.price.formatted_with_symbol}</p>
                        <button className='relative w-10 h-10 flex self-end' onClick={() => onAddToCart(eachProduct.id, 1)}>
                            <FaCartArrowDown className='z-10 w-8 h-8 hover:text-cyan-600'/>
                        </button>
                    </div>
                </figcaption>
            </figure>
        </section>
    )
}

export default SingleProductDisplay