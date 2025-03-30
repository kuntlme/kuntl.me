import React from 'react'
import Card from './card'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const HomeProject = () => {
  return (
    <div className=''>
        <h1 className='text-4xl font-extrabold text-white my-5'>Projects</h1>
        <div className='grid grid-cols-2 gap-4'>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
        </div>
        <div className='flex justify-center items-center gap-2 text-zinc-300 my-10'>
          <Link href="/projects">
            <p className='text-gray-100 text-sm font-medium flex items-center cursor-pointer'>See more <ArrowRight size={16} className='ml-1'/></p>
          </Link>
        </div>
    </div>
  )
}

export default HomeProject