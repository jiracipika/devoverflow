import React from 'react'
import AvatarPic from '../Components/AvatarPic.jsx';
import Tag from './Tag.jsx'

const UserCard = ({Name, Username, tags, id}) => {
    return(
        <div id={id} className='bg-card-gradient flex flex-col gap-3 p-10 rounded-lg'>
            <AvatarPic/>
            <label className='font-semibold text-[20px] p-2 rounded-lg cursor-pointer'>{Name|| "Name"}</label>
            <label className='text-[10px] p-2 rounded-lg cursor-pointer'>{Username|| "Username"}</label>
                <div className='flex gap-2'>
                {
                    tags ? tags.map((item) =>{
                        return (<Tag text={item}/>)
                    })
                    :
                    <Tag text={"hello"}/>
                
                }

        </div>
        </div>
    )

}

export default UserCard