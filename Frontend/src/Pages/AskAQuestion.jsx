import React, {useState} from 'react'




const AskAQuestion = () => {

  return (
    <section className='text-white Ask a py-6 px-20 question bg-gradient-to-r w-[calc(100%-330px)] from-[#0A0B10] to-black min-h-screen max-h-fit'>
      <form action="" className='flex flex-col gap-5'>
        <h1 className='text-2xl font-bold'>Ask a public question</h1>
        <div className='flex flex-col gap-1'>
          <label className='font-semibold text-[16px]' htmlFor="">Question title <span className='text-red-600'>*</span></label>
          <input type="text" className='px-2 py-4 outline-none bg-[#151821] rounded-md'/>
          <p className='text-[#7B8EC8]'>Be specific and imagine you’re asking a question to another person.</p>
        </div>
        
        <div className='flex flex-col gap-1'>
          <label className='font-semibold text-[16px]' htmlFor="">Question title <span className='text-red-600'>*</span></label>
          <input type="text" className='px-2 py-4 outline-none bg-[#151821] rounded-md'/>
          <p className='text-[#7B8EC8]'>Be specific and imagine you’re asking a question to another person.</p>
        </div>

        <div className='flex flex-col gap-1'>
          <label className='font-semibold text-[16px]' htmlFor="">Question title <span className='text-red-600'>*</span></label>
          
          <p className='text-[#7B8EC8]'>Be specific and imagine you’re asking a question to another person.</p>
        </div>
      </form>
    </section>
  )
}

export default AskAQuestion