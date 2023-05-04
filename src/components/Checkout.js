import { useEffect, useState } from 'react';
import { commerce } from './commerce';
import Stepper from './Stepper';
import ShippingDetails from './ShippingDetails';
import PaymentDetails from './PaymentDetails';
import ConfirmationPage from './ConfirmationPage';


const Checkout = ({ cart, order, handleCaptureCheckout, error, steps, activeStep, setActiveStep, checkoutToken, setCheckoutToken, shippingData, setShippingData, nextStep, backStep }) => {

    const[isFinished, setIsFinished] = useState(false);

    useEffect(() => {

        const generateToken = async () => {

            try {

                const token = await commerce.checkout.generateToken(cart.id, { type: "cart" });
                console.log(token);
                setCheckoutToken(token);

            } catch (err) {

                console.log(err)
            }
        };

        generateToken();

    }, [cart]);


    // Set the state of data that's coming from shipping details:
    const next = (data) => {

        // console.log("Data:",data);
        setShippingData(data);
        // console.log(activeStep)
        nextStep();
    }; 
    

    return (
        
        <main className='bg-gray-900 w-full'>
            <article className='bg-gray-900 max-w-4xl mx-auto flex flex-col p-4 min-h-screen'>

                {/* Section for Stepper and heading */}
                {
                    <>
                        <Stepper steps={steps} activeStep={activeStep} setActiveStep={setActiveStep} />
                    </>
                }

                {/* Section for shipping/payment/confirmation form */}
                {
                    
                    (activeStep === 0) ? checkoutToken && <ShippingDetails checkoutToken={checkoutToken} next={next} className="flex"/> :
                    (activeStep === 1) ? <PaymentDetails steps={steps} checkoutToken={checkoutToken} activeStep={activeStep} setActiveStep={setActiveStep} handleCaptureCheckout={handleCaptureCheckout} shippingData={shippingData} nextStep={nextStep} backStep={backStep} />  :
                    <ConfirmationPage order={order} isFinished={isFinished} setIsFinished={setIsFinished} />
                }

            </article>
        </main>
    )
}

export default Checkout