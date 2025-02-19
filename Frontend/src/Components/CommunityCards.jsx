import React from 'react'

const CommunityCard = ({TagName, Users, id}) => {
    return(
        <div id={id} className='bg-card-gradient flex flex-col gap-3 p-10 rounded-lg'>
            <label className='font-semibold text-[20px] p-2 rounded-lg cursor-pointer'>{TagName|| "TagName"}</label>
            <h2 className='font-semibold text-[20px] p-2 rounded-lg cursor-pointer'>{Users|| 122} Users</h2>
        </div>
    )
}
export default CommunityCard