import React from 'react'

const Stepper = ({ steps, activeStep }) => {

    return (
        
        <section className='mt-4 flex flex-col gap-4 justify-center items-center'>
            
            {/* Div for Steps  */}
            <div className='flex justify-center items-center gap-4'>
                {
                    (activeStep === 0) ?  
                        <>
                            <div className='w-8 h-8 font-semibold md:font-semibold bg-cyan-500 md:w-12 md:h-12 rounded-full text-xl md:text-2xl flex justify-center items-center'>1</div>
                            <hr className='w-[16vw]'/>
                            <div className='w-8 h-8 md:w-12 md:h-12 rounded-full text-xl md:text-2xl flex justify-center items-center bg-gray-500'>2</div>
                            <hr className='w-[16vw]'/>
                            <div className='w-8 h-8 md:w-12 md:h-12 rounded-full text-xl md:text-2xl flex justify-center items-center bg-gray-500'>3</div> 
                        </>
                    :(activeStep === 1) ?
                    <> 
                        <div className='w-8 h-8 font-semibold md:font-semibold bg-cyan-500 md:w-12 md:h-12 rounded-full text-xl md:text-2xl flex justify-center items-center'>1</div>
                        <hr className='w-[16vw]'/>
                        <div className='w-8 h-8 font-semibold md:font-semibold bg-cyan-500 md:w-12 md:h-12 rounded-full text-xl md:text-2xl flex justify-center items-center'>2</div> 
                        <hr className='w-[16vw]'/>
                        <div className='w-8 h-8 md:w-12 md:h-12 rounded-full text-xl md:text-2xl flex justify-center items-center bg-gray-500'>3</div> 
                    </> :
                    <>
                        <div className='w-8 h-8 font-semibold md:font-semibold bg-cyan-500 md:w-12 md:h-12 rounded-full text-xl md:text-2xl flex justify-center items-center'>1</div>
                        <hr className='w-[16vw]'/>
                        <div className='w-8 h-8 font-semibold md:font-semibold bg-cyan-500 md:w-12 md:h-12 rounded-full text-xl md:text-2xl flex justify-center items-center'>2</div> 
                        <hr className='w-[16vw]'/>
                        <div className='w-8 h-8 font-semibold md:font-semibold bg-cyan-500 md:w-12 md:h-12 rounded-full text-xl md:text-2xl flex justify-center items-center'>3</div>
                    </>
                }
                {/* <hr className='w-[16vw]'/>
                <div className='w-8 h-8 md:w-12 md:h-12 rounded-full text-xl md:text-2xl flex justify-center items-center bg-gray-500'>2</div>
                <hr className='w-[16vw]'/>
                <div className='w-8 h-8 md:w-12 md:h-12 rounded-full text-xl md:text-2xl flex justify-center items-center bg-gray-500'>3</div> */}
            </div>

            {/* Div for actual Step name */}
            <div className='mt-6 mb-4 text-xl md:text-4xl text-white font-semibold'>
                {(steps[activeStep] === 'Confirm Details') ? "" : steps[activeStep]}
            </div>
        </section>
    )
}

export default Stepper