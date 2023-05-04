import Product from './Product';

const Products = ({ products, onAddToCart }) => {

    return (

        <main className='min-h-screen w-full bg-gray-900'>
            <article className='p-4 mx-auto max-w-4xl grid grid-flow-row grid-flow-1 gap-6 md:grid-flow-row md:grid-cols-3'>
                {
                    products.map((eachProduct) => (
                        
                        <Product key={eachProduct.id} eachProduct={eachProduct} onAddToCart={onAddToCart} />
                    ))

                    
                }
            </article>
        </main>
    )
}

export default Products