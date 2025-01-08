import React from 'react'

const profile = () => {
    return (
        <section className='relative bg-[#25438B] h-full w-full p-6 flex-col items-center'>
            <div className='p-6 mt-20 rounded-md bg-[#B1B2B5] h-[670px] rounded-[20px] left-[157px] top-[101px]' id='upperBanner'>
                <h1 className='absolute w-[456px] h-[87px] text-4xl left-[400px] top-[302px] right-[500px]'>Profile Name</h1>
                <div className='top-[200px] w-[318px] h-[305px] rounded-[50%] bg-[#8DA7CF]' id="profilePicture"></div>
                <div className='mt-10 bg-[#FAF7F8] w-full h-[300px] rounded-[20px]' id='lowerBanner'>
                    <h1 className='w-[456px] h-[87px] text-4xl left-[821px] top-[302px] right-[500px]'>Current Position</h1>
                    <h2 className='text-2xl'>Current Company</h2>
                    <h3>Dates</h3>
                </div>       
            </div>  
                
            <div className='p-6 mt-12 rounded-md bg-[#FAF7F8] w-full h-[487px] rounded-[20px]' id='ProfileExperience'>
                <h1 className='w-[456px] h-[87px] text-4xl left-[821px] top-[302px] right-[500px]'>Profile Experience</h1>
                <section>
                    <h2 className='text-2xl'>Company 1</h2>
                    <h3>Dates</h3>
                    <hr></hr>
                    <ul className='list-disc'>
                        <li>Accomplishment 1</li>
                        <li>Accomplishment 2</li>
                    </ul>
                </section>
                <section>
                    <h2 className='text-2xl'>Company 2</h2>
                    <h3>Dates</h3>
                    <hr></hr>
                    <ul className='list-disc'>
                        <li>Accomplishment 1</li>
                        <li>Accomplishment 2</li>
                    </ul>
                </section>
            </div>

            <div className='p-6 mt-12 rounded-md bg-[#FAF7F8] w-full h-[487px] rounded-[20px]' id='ProfileSkills'>
                <h1 className='w-[456px] h-[87px] text-4xl left-[821px] top-[302px] right-[500px]'>Profile Skill</h1>
                <ul className='list-disc'>
                    <li>Skill 1 (Years of Experience)</li>
                    <li>Skill 2 (Years of Experience)</li>
                    <li>Skill 3 (Years of Experience)</li>
                </ul>
            </div>
        </section>
    )
}

export default profile