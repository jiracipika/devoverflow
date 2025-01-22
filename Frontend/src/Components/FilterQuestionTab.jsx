import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const FilterQuestionTab = ({onChosenFilter}) => {
    const [chosenFilter, setChosenFilter] = useState("");

    const handleClick = (e) =>{
        setChosenFilter(e.target.innerText)
        onChosenFilter(e.target.innerText)
    }
    
  return (
    <section className="filterTab flex gap-4 ">
        <Link 
        onClick={handleClick} 
        className={`transition-all rounded-lg p-4 bg-[#151821] text-[#7B8EC8]`}> <span className={`${chosenFilter === "Newest" ? "bg-clip-text text-transparent bg-custom-gradient" : ""}`}>Newest</span> </Link>
        <Link
         onClick={handleClick} 
        className={`rounded-lg p-4 transition-all bg-[#151821] text-[#7B8EC8]`}> <span className={`${chosenFilter === "Recommended" ? "bg-clip-text text-transparent bg-custom-gradient" : ""}`}>Recommended</span> </Link>
        <Link onClick={handleClick} className='rounded-lg transition-all p-4 bg-[#151821] text-[#7B8EC8]'> <span className={`${chosenFilter === "Frequent" ? "bg-clip-text text-transparent bg-custom-gradient" : ""}`}>Frequent</span> </Link>
        <Link onClick={handleClick} className='rounded-lg p-4 transition-all bg-[#151821] text-[#7B8EC8]'> <span className={`${chosenFilter === "Unanswered" ? "bg-clip-text text-transparent bg-custom-gradient" : ""}`}>Unanswered</span> </Link>
    </section>
  )
}

export default FilterQuestionTab