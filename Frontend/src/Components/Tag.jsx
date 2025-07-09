import React from 'react'

const Tag = ({text, classnames}) => {
  return (
    <span className={`bg-[#161A22] text-[#7B8EC8] px-3 py-1 text-s max-lg:text-[10px] rounded-md ${classnames}`}>{text}</span>
  )
}

export default Tag