import Card from '@/components/card'
import React from 'react'

const page = () => {
  return (
    <div className='bg-zinc-900 flex flex-col min-h-screen'>
      <section className="container mt-30">
        <h1 className="mb-3 text-7xl text-transparent text-outline font-bold">
          My Projects
        </h1>

        <div className='grid grid-cols-2 gap-4 mt-10'>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
        </div>
      </section>
    </div>
  )
}

export default page