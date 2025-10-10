import { LoaderCircle } from 'lucide-react'
import React from 'react'

export const LoadingFullAbs = () => {
  return (
    <div className='absolute rounded-2xl top-0 left-0 w-full h-full z-50 backdrop-blur-3xl flex justify-center items-center'><LoaderCircle className='animate-spin' size={40} /></div>
  )
}
