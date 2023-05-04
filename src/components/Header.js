import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import logo from '../assets/logo.avif';
import { Link } from 'react-router-dom';

const Header = ({ totalItems }) => {

    return (

        <header className='z-50 sticky top-0 bg-gray-800 shadow-2xl'>
            <section className=' w-full mx-auto max-w-4xl p-4 flex justify-between items-center'>
                <Link to='/'>
                    <div className='flex justify-center items-center gap-4'>
                        <img src={logo} alt="logo" className='w-12 h-12 md:w-16 md:h-14' />
                        <h2 className='text-4xl font-semibold text-white'>Emart</h2>
                    </div>
                </Link>
                <button className='relative mr-2'>
                    <Link to='/cart'>
                        {
                            (totalItems === 0) ? null:
                            <div className='absolute left-6 bottom-4 md:left-8 md:bottom-6 flex justify-center items-center rounded-full w-6 h-6 bg-red-600 text-sm p-1 text-white font-semibold'>{totalItems}</div>
                        }
                        <FaShoppingCart className='w-8 h-8 md:w-10 md:h-10 text-white' />
                    </Link>
                </button>
            </section>
        </header>
    )
}

export default Header