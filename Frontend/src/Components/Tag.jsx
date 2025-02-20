import React from 'react'

const Tag = ({text, classnames}) => {
  return (
    <span className={`px-4 py-2 rounded-lg text bg-[#151821] text-[#7B8EC8] ${classnames}`}>{text}</span>
  )
}

export default Tag