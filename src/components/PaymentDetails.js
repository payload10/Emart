import React from 'react';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { FaArrowCircleLeft } from 'react-icons/fa';
import { loadStripe } from '@stripe/stripe-js';
import Review from './Review';


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentDetails = ({ checkoutToken, setCheckoutToken, steps, activeStep, setActiveStep, handleCaptureCheckout, shippingData, nextStep, backStep, timeout }) => {

    console.log("c:",checkoutToken)

    const handleSubmit = async (event, elements, stripe) => {

        event.preventDefault();
        
        if(!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);

        // Create a payment method:
        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: "card", card: cardElement });
        console.log(paymentMethod)

        if(error) {

            console.log(error);
        
        } else {

            const orderData = {

                line_items: checkoutToken.line_items,
                customer: {

                    firstname: shippingData.firstname,
                    lastname: shippingData.lastname,
                    email: shippingData.email
                },
                shipping: {

                    name: 'Primary',
                    street: shippingData.address,
                    town_city: shippingData.city,
                    country_state: shippingData.shippingSubdivision,
                    postal_zip_code: shippingData.zipcode,
                    country: shippingData.shippingCountry
                },
                fulfillment: {

                    shipping_method: shippingData.shippingOption
                },
                payment: {

                    gateway: 'test_gateway',
                    card: {
                        number: '4242424242424242',
                        expiry_month: '02',
                        expiry_year: '24',
                        cvc: '123',
                        postal_zip_code: '94107',
                    }
            }};

            handleCaptureCheckout(checkoutToken.id, orderData);
            nextStep();
        }
    };

    return (

        <main className='flex w-full bg-gray-900'>
            <article className='w-full p-4 border-red-500'>
                {checkoutToken && <Review checkoutToken={checkoutToken} />}
                
                <hr className='max-w-4xl mt-10 mx-auto text-gray-900'/>

                <section className='max-w-4xl mx-auto flex flex-col'>
                    <h2 className='text-white text-3xl self-start font-semibold mt-10 mb-8'>Payment method:</h2>
                    <Elements stripe={stripePromise}>
                        <ElementsConsumer>
                            {/* Refer stripe documentation */}
                            {
                                ({ elements, stripe }) => (

                                    <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                                        <CardElement className='text-white'/>
                                        <br />
                                        <div className='mt-6 mb-4 flex justify-between items-end'>
                                            <button onClick={backStep}>
                                                <FaArrowCircleLeft className='text-4xl md:text-5xl text-cyan-500'/>
                                            </button>
                                            <button type='submit' disabled={!stripe} className='text-xl md:text-xl font-semibold bg-cyan-500 hover:bg-cyan-600 text-black p-3 md:p-3 rounded-xl'>
                                                Pay {checkoutToken.subtotal.formatted_with_symbol}
                                            </button>
                                        </div>
                                    </form>
                                )
                            }
                        </ElementsConsumer>
                    </Elements>
                </section>
            </article>
        </main>
    )
}

export default PaymentDetails