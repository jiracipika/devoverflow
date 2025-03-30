import React from 'react'
import CommunityPic from '../Components/CommunityPic'
import {Link} from "react-router-dom";

const CommunityCard = ({TagName, Users, id}) => {
    return(
        <div id={id} className='bg-card-gradient flex flex-col gap-3 p-10 rounded-lg'>
            <CommunityPic/>
            <label className='font-semibold text-[20px] flex items-center justify-center p-2 rounded-lg'>{TagName|| "TagName"}</label>
            <Link to={`/Communities/${TagName}`}><button className='bg-gradient-to-r from-[#FF7000] to-[#E2995F] text-m basis-[48%] h-10 w-full rounded-md text-white font-medium border-0 outline-none' type="button" >Join</button></Link>
            <h2 className='font-semibold text-[20px] p-2 rounded-lg'>{Users|| 122} Users</h2>
        </div>
    )
}
export default CommunityCard