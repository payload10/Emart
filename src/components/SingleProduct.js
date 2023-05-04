import React from 'react';
import SingleProductDisplay from './SingleProductDisplay';
import { useParams } from 'react-router-dom';

const SingleProduct = ({ products, onAddToCart }) => {

    const { id } = useParams();

    return (
     
       <main className='bg-gray-900 min-h-screen w-full'>
        <article className='max-w-4xl min-h-screen mx-auto p-4'>
            <section className='min-h-fit'>
                {
                    products.map((eachProduct) => (

                        (eachProduct.id === id) ? <SingleProductDisplay eachProduct={eachProduct} onAddToCart={onAddToCart} /> : null 
                    ))
                }
            </section>
        </article>

       </main>
    )
}

export default SingleProduct