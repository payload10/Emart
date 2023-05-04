import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { commerce } from './commerce';
import { PropagateLoader } from 'react-spinners';
import { FaArrowCircleRight } from 'react-icons/fa';


const ShippingDetails = ({ checkoutToken, setActiveStep, next }) => {

    const[countries, setCountries] = useState([]);
    const[subdivisions, setSubdivisions] = useState([]);
    const[shippingCountries, setShippingCountries] = useState([]);
    const[shippingCountry, setShippingCountry] = useState('');
    const[shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const[shippingSubdivision, setShippingSubdivision] = useState('');
    const[shippingOptions, setShippingOptions] = useState([]);
    const[shippingOption, setShippingOption] = useState('');

    // Fetch countries:
    const fetchShippingCountries = async (checkoutToken) => {

        const shipCountries = await commerce.services.localeListShippingCountries(checkoutToken);
        console.log("shipped:", shipCountries.countries);
        const shipToCountries = shipCountries.countries;

        const countries = Object.entries(shipToCountries).map(([key, countryName]) => ({id:key, label:countryName}));
        console.log("Countries:", countries);
        setCountries(countries);
        
        // Show shipping countries:
        setShippingCountries(Object.keys(countries));
        setShippingCountry(Object.keys(shippingCountries)[0]);
    };


    // Set the checkout token immediately on component render:
    useEffect(() => {

        checkoutToken && fetchShippingCountries(checkoutToken.id);

    }, []);


    // Fetch Subdivisions:
    const fetchSubdivisions = async (countryCode) => {

        console.log("Country Code:" ,countryCode)
        const {subdivisions} = await commerce.services.localeListSubdivisions(countryCode);
        console.log("Country Subdivisions: ", subdivisions);

        const shipSubdivisions = Object.entries(subdivisions).map(([key, subdivisionName]) => ({id:key, label:subdivisionName}));

        setSubdivisions(shipSubdivisions);
        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0]);
    };

    // useEffect will run after countries changes:
    useEffect(() => {

        shippingCountry && fetchSubdivisions(shippingCountry);

    }, [shippingCountry]);


    // Set array of options:
    const shipOp = shippingOptions.map((so) => ({ id:so.id, label:`${so.description} - (${so.price.formatted_with_symbol})`}));
    console.log(shipOp);

    // Fetch shipping options:
    const fetchShippingOptions = async (checkoutToken, country, region=null) => {

        const options = await commerce.checkout.getShippingOptions(checkoutToken, {country, region});
        console.log("Options:",options);

        setShippingOptions(options);
        setShippingOption(options[0].id);      
    };

    // useEffect will run after subdivision changes:
    useEffect(() => {

       if(shippingSubdivision) fetchShippingOptions(checkoutToken, shippingCountry, shippingSubdivision);

    }, [shippingSubdivision]);


    // This is going to give us all the methods that we need to run our form
    const {register, handleSubmit} = useForm();
    const onSubmit = data => console.log(data);

    return (

        <section className='flex-grow flex justify-center items-center mb-2 mt-2'>
            <article className='flex justify-center items-center mt-4'>
                {console.log("checkouttoken:", checkoutToken)}

                {
                    (checkoutToken.id) ? (

                    <form onSubmit={handleSubmit((data) => next({...data, shippingCountry, shippingSubdivision, shippingOption}))} >

                        <section className='grid place-items-center gap-8 grid-flow-row grid-cols-1 md:grid-flow-row md:grid-cols-2'>
                        <div className='flex flex-col justify-center items-start gap-2'>
                            <label className='text-xl font-semibold text-white'>Firstname:</label>
                            <input type="text" {...register("firstname", { required: true, maxLength: 20 })} className="w-[84vw] md:w-[30vw] rounded-xl pl-4 p-2 text-xl" />
                        </div>

                        <div className='flex flex-col justify-center items-start gap-2'>
                            <label className='text-xl font-semibold text-white'>Lastname:</label>
                            <input type="text" {...register("lastname", { required: true, maxLength: 20 })} className="w-[84vw] md:w-[30vw] rounded-xl pl-4 p-2 text-xl" />
                        </div>

                        <div className='flex flex-col justify-center items-start gap-2'>
                            <label className='text-xl font-semibold text-white'>Address:</label>
                            <input type="text" {...register("address", { required: true, maxLength: 20 })} className="w-[84vw] md:w-[30vw] rounded-xl pl-4 p-2 text-xl" />
                        </div>

                        <div className='flex flex-col justify-center items-start gap-2'>
                            <label className='text-xl font-semibold text-white'>City:</label>
                            <input type="text" {...register("city", { required: true, maxLength: 20 })} className="w-[84vw] md:w-[30vw] rounded-xl pl-4 p-2 text-xl" />
                        </div>

                        <div className='flex flex-col justify-center items-start gap-2'>
                            <label className='text-xl font-semibold text-white'>Zipcode:</label>
                            <input type="number" {...register("zipcode", { required: true, maxLength: 20 })} className="w-[84vw] md:w-[30vw] rounded-xl pl-4 p-2 text-xl" />
                        </div>

                        <div className='flex flex-col justify-center items-start gap-2'>
                            <label className='text-xl font-semibold text-white'>Email:</label>
                            <input type="email" {...register("email", { required: true, maxLength: 20 })} className="w-[84vw] md:w-[30vw] rounded-xl pl-4 p-2 text-xl" />
                        </div>

                        <div className='flex flex-col justify-center items-start gap-2'>
                            <label htmlFor="country-label" className='text-xl font-semibold text-white'>Country:</label>
                            <select required value={shippingCountry} onChange={(e) => setShippingCountry(e.target.value)} name="forCountry" id="country" className="w-[84vw] md:w-[30vw] rounded-xl p-2 text-xl">
                                {countries.map((eachCountry) => (

                                    <option value={eachCountry.id} key={eachCountry.id}>
                                        {eachCountry.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className='flex flex-col justify-center items-start gap-2'>
                            <label htmlFor="subdivision-label" className='text-xl font-semibold text-white'>Subdivision:</label>
                            <select required value={shippingSubdivision} onChange={(e) => setShippingSubdivision(e.target.value)} name="forSubdivision" id="subdivision" className="w-[84vw] md:w-[30vw] rounded-xl p-2 text-xl">
                                {shippingCountry && subdivisions.map((eachSubdivision) => (

                                    <option value={eachSubdivision.id} key={eachSubdivision.id}>
                                        {eachSubdivision.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    

                        {/* Shipping Options */}
                        <div className='flex flex-col justify-center items-start gap-2'>
                            <label htmlFor="subdivision-label" className='text-xl font-semibold text-white'>Shipping Options:</label>
                            <select required value={shippingOption} onChange={(e) => setShippingOption(e.target.value)} name="option" id="option" className="w-[84vw] md:w-[30vw] rounded-xl p-2 text-xl">
                                {shipOp.map((eachSO) => (

                                    <option value={eachSO.id} key={eachSO.id}>
                                        {eachSO.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        </section>
                    
                        <div className='flex justify-end items-end'>
                            <button type="submit" className='mt-10 mb-4 self-end'>
                                <FaArrowCircleRight className='text-4xl md:text-5xl text-cyan-500'/>
                            </button>
                        </div>
                    </form>
                    
                    ) :  <PropagateLoader loading={true} color="cyan" />
                    
                }
                
            </article>
        </section>
    )
}

export default ShippingDetails