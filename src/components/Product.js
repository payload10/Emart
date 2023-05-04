import React from 'react'
import { FaCartArrowDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Product = ({ eachProduct, onAddToCart }) => {

    let productDescription;

    if((eachProduct.description).length <= 75 ) {
        
        // console.log((eachProduct.description).length);
        productDescription = eachProduct.description
    
    } else {

        // console.log("Else:", (eachProduct.description).length);
        productDescription = `${(eachProduct.description).slice(0,50)}...`
    }

    return (

        <section className='border-2 mb-4 border-white rounded-lg shadow-2xl'>
                <figure className='flex flex-col'>
                    <Link to={`/products/${eachProduct.id}`} >
                        <img src={eachProduct.image.url} alt="product" className='w-fit h-fit p-2 rounded-2xl'/>
                    </Link>
                    <figcaption className='text-white flex justify-between items-start gap-4 ml-4 mb-4 mr-4 mt-2'>
                        <div className='flex flex-col justify-start items-start gap-2'>
                            <h2 className='text-xl text-left font-semibold'>{eachProduct.name}</h2>  
                            {/* <p className='text-lg md:text-md text-left' dangerouslySetInnerHTML={{__html:eachProduct.description}}></p> */}
                            <p className='w-fit text-lg md:text-md text-left' dangerouslySetInnerHTML={{__html: productDescription}} />
                        </div>
                        <div className='text-2xl font-semibold text-cyan-500 flex flex-col self-start items-center space-y-8'>
                            <p>{eachProduct.price.formatted_with_symbol}</p>
                            <button className='relative w-10 h-10 flex self-end' onClick={() => onAddToCart(eachProduct.id, 1)} >
                                <FaCartArrowDown className='z-10 w-8 h-8 hover:text-cyan-600'/>
                            </button>
                        </div>
                    </figcaption>
                </figure>
        </section>
    )
}

export default Product