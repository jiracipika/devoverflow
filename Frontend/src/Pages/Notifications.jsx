import React, {useState} from 'react'
import NotificationFilterTab from '../Components/NotificationFilterTab.jsx'
import NotificationCard from '../Components/NotificationCard.jsx'
import NotifData from '../assets/NotifData.js'

const Notifications = () => {
    const [filterQuery, setFilterQuery] = useState("All")
    const [notifications, setNotifications] = useState(NotifData)

    const filteredData = filterQuery === "All" 
        ? notifications 
        : notifications.filter(item => item.category === filterQuery);

    const handleFilterChosen = (userquery) => {
        setFilterQuery(userquery)
    }

    const handleRemoveNotification = (id) => {
        setNotifications(prevNotifications => 
            prevNotifications.filter(notification => notification.id !== id)
        );
    }
    
    return(
        <div className='min-h-screen text-white py-8 gap-8 flex flex-col px-8 max-h-fit w-full lg:w-[calc(100%-330px)] bg-gradient-to-r from-[#0A0B10] to-black'>
            <NotificationFilterTab onChosenFilter={handleFilterChosen}/>
            <section className='flex flex-col gap-3 justify-center'>
                {filteredData.map((item) => (
                    <NotificationCard 
                        key={item.id}
                        id={item.id}
                        userquery={filterQuery}
                        category={item.category}
                        title={item.title}
                        text={item.text}
                        imgSrc={item.imgSrc}
                        friendRequest={item.category === "Requests"}
                        messageView={item.category === "Messages"}
                        onRemove={handleRemoveNotification}
                    />
                ))}
            </section>
        </div>
    )
}

export default Notifications