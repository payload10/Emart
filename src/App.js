import Header from './components/Header';
import Products from './components/Products';
import SingleProduct from './components/SingleProduct';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import { Route, Routes } from 'react-router-dom';
import { commerce } from './components/commerce';   // Will perform all the backend stuff
import './App.css';
import { useEffect, useState } from 'react';
import PaymentDetails from './components/PaymentDetails';
import ConfirmationPage from './components/ConfirmationPage';

function App() {

  const[products, setProducts] = useState([]);
  const[cart, setCart] = useState({});
  const steps = ['Shipping Details', 'Payment Details', 'Confirm Details'];
  const[activeStep, setActiveStep] = useState(0);
  const[order, setOrder] = useState({});
  const[errorMessage, setErrorMessage] = useState("");
  const[checkoutToken, setCheckoutToken] = useState(null);
  const[shippingData, setShippingData] = useState({});


  // Fetch Products:
  const fetchProducts = async () => {

    // Commerce API will fetch products from commerce.js website where we have added products
    const {data} = await commerce.products.list();
    setProducts(data);
  };

  
  // Fetch Entire Cart:
  const fetchCart = async () => {

    const cart = await commerce.cart.retrieve();
    setCart(cart);
  };


  // Handle Add to cart:
  const handleAddToCart = async (productId, productQuantity) => {

    const item = await commerce.cart.add(productId, productQuantity);
    setCart(item);
  };

  // Empty Cart:
  const handleEmptyCart = async () => {

      const emptyCart = await commerce.cart.empty();
      setCart(emptyCart);
  };

  // Refresh cart
  const refreshCart = async () => {

    // console.log("refresh")
    const newCart = await commerce.cart.empty();
    setCart(newCart);
  };

  // Handle final checkout
  const handleCaptureCheckout = async (checkoutToken, newOrder) => {

      try {

        // console.log("checkouttoken:", checkoutToken);
        // console.log("neworder:", newOrder);
        const incomingOrder = await commerce.checkout.capture(checkoutToken, newOrder);
        console.log("Incoming order:", incomingOrder);
        setOrder(incomingOrder);
        console.log("Order:",order)
        refreshCart();

      } catch (error) {

        setErrorMessage(error.data.error.message);

      }
  };

  // Remove Item From Cart:
  const handleRemoveItemFromCart = async(cartProductId) => {

    const removedItemFromCart = await commerce.cart.remove(cartProductId);
    setCart(removedItemFromCart)
  };

  // Handle Product Increment:
  const handleProductIncrement = async(cartProductId, quantity) => {

    // console.log(cartProductId);
    // console.log(quantity);
    const updateProductQuantity = await commerce.cart.update(cartProductId, {quantity});
    console.log(updateProductQuantity)
    setCart(updateProductQuantity);
  };

  // Handle Product Decrement:
  const handleProductDecrement = async(cartProductId, quantity) => {

    const updateProductQuantity = await commerce.cart.update(cartProductId, {quantity});
    setCart(updateProductQuantity);
  };


  useEffect(() => {

      fetchProducts();
      fetchCart();

  }, []);

  // Move forward
  const nextStep = () => {

    setActiveStep((previousStep) => previousStep + 1);
  }

  // Move back
  const backStep = () => {

    setActiveStep((previousStep) => previousStep - 1);
  }

  // console.log("Products:", products);
  // console.log("Cart:", cart);

  return (

    <div className="App">
        <Header totalItems={cart.total_items}/>
        <Routes>
          <Route path='/' element={<Products products={products} onAddToCart={handleAddToCart} />} />

          <Route path='/products/:id' element={<SingleProduct products={products} onAddToCart={handleAddToCart} />} />

          <Route path='/cart' element={<Cart cart={cart} handleEmptyCart={handleEmptyCart} totalItems={cart.total_items} handleRemoveItemFromCart={handleRemoveItemFromCart} handleProductIncrement={handleProductIncrement} handleProductDecrement={handleProductDecrement} activeStep={activeStep} setActiveStep={setActiveStep} nextStep={nextStep} backStep={backStep} />} />

          <Route path='/checkout' element={<Checkout cart={cart} order={order} handleCaptureCheckout={handleCaptureCheckout} error={errorMessage} steps={steps} activeStep={activeStep} setActiveStep={setActiveStep} checkoutToken={checkoutToken} setCheckoutToken={setCheckoutToken} shippingData={shippingData} setShippingData={setShippingData} nextStep={nextStep} backStep={backStep} />} />

          <Route path='/checkout/payment' element={<PaymentDetails checkoutToken={checkoutToken} setCheckoutToken={setCheckoutToken} steps={steps} activeStep={activeStep} setActiveStep ={setActiveStep} handleCaptureCheckout={handleCaptureCheckout} shippingData={shippingData} setShippingData={setShippingData} />} />

          <Route path='/checkout/confirm' element={<ConfirmationPage/>} />
        </Routes>
    </div>
  );
}

export default App;
