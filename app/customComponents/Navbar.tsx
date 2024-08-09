import React from 'react'
import { Foldit } from 'next/font/google'
import { PiSealWarning } from 'react-icons/pi'

const foldIt = Foldit({subsets : ["latin"]})
const Navbar = () => {
  return (
    <nav className='w-full flex flex-col items-center justify-center'>
        <h3 className={`${foldIt.className} text-[2rem]`}>PicToPlate</h3>
        <p className='max-w-[32rem] mx-auto font-[500] text-center text-[1.2rem]'>AI-powered cooking assistant. Upload a picture of any dish and learn how to prepare it at a go.</p>
        {/* <div className='flex gap-1 items-center justify-center font-[500] p-[3px] rounded-[5px] w-[30rem] bg-gray-200'>
            <PiSealWarning/><p className='text-[0.95rem]'>AI may provide inaccurate results.</p>
        </div> */}
    </nav>
  )
}

export default Navbar