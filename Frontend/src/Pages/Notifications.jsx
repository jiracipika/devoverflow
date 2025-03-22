import React, {useState} from 'react'
import NotificationFilterTab from '../Components/NotificationFilterTab.jsx'
import NotificationCard from '../Components/NotificationCard.jsx'
import NotifData from '../assets/NotifData.js'

const Notifications = () => {

    const [filterQuery, setFilterQuery] = useState("")

    const handleFilterChosen = (userquery) =>{
        setFilterQuery(userquery)
        if (userquery == "All"){
        }
        console.log(userquery)
      }
    
    return(
        <div className='min-h-screen text-white py-8 gap-8 flex flex-col px-8 max-h-fit w-[calc(100%-330px)] bg-gradient-to-r from-[#0A0B10] to-black'>
            <NotificationFilterTab onChosenFilter={handleFilterChosen}/>
            <section>
                {NotifData.map((item, index) =>{
                    return (<NotificationCard id={index} title={item.title} text={item.text}/>)
                })}
            </section>
        </div>
    )
}

export default Notifications