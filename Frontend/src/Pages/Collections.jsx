import React from 'react'
import CollectionCard from '../Components/CollectionCard';

const questions = [
  {
    id: 1,
    title: "The Lightning Component c:LWC_PizzaTracker generated invalid output for field status. Error How to solve this",
    tags: ["JAVASCRIPT", "REACT.JS", "INVALID FIELDS", "SALESFORCE"],
    votes: "1.2k Votes",
    answers: "900 Answers",
    views: "5.2k Views",
    userPic: "https://image.api.playstation.com/cdn/UP2538/CUSA05620_00/cKQCz5nP7YeQo5Wpot7DlvZptrxrhBSe.png?w=440&thumb=false",
    userName:"User1"
  },
  {
    id: 2,
    title: "An HTML table where specific cells come from values in a Google Sheet identified by their neighboring cell",
    tags: ["JAVASCRIPT", "REACT.JS", "INVALID FIELDS", "SALESFORCE"],
    votes: "1.2k Votes",
    answers: "900 Answers",
    views: "5.2k Views",
    userPic: "https://image.api.playstation.com/cdn/UP2538/CUSA05620_00/cKQCz5nP7YeQo5Wpot7DlvZptrxrhBSe.png?w=440&thumb=false",
    userName:"User2"
  },
  {
    id: 3,
    title: "JavaScript validation for a form stops the form data from being submitted to mysql database",
    tags: ["JAVASCRIPT", "REACT.JS", "INVALID FIELDS", "SALESFORCE"],
    votes: "1.2k Votes",
    answers: "900 Answers",
    views: "5.2k Views",
    userPic: "https://image.api.playstation.com/cdn/UP2538/CUSA05620_00/cKQCz5nP7YeQo5Wpot7DlvZptrxrhBSe.png?w=440&thumb=false",
    userName:"User3"
  },
];

const Collections = () => {
  return (
    <div className='min-h-screen text-white py-8 gap-8 flex flex-col px-8 max-h-fit w-[calc(100%-330px)] bg-gradient-to-r from-[#0A0B10] to-black'>
<h2 className="text-2xl font-bold mb-6">Saved Questions</h2>
      <div className="space-y-6">
        {questions.map((q) => (
          
            <CollectionCard key={q.id} question={q} />
          
        ))}
      </div>
    </div>
  )
}

export default Collections