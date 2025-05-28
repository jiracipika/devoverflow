import { FaRegStar, FaRegThumbsUp, FaEye, FaComment } from "react-icons/fa";

const CollectionCard = ({title, author, asked, votes, answers, views, tags, id, imgSrc}) => {
  return (
    <div id={id} className="p-6 rounded-lg shadow-md bg-[#0B0D12]">
      {/* Question Title and Star Icon */}
      <div className="flex mb-3 justify-between">
        <h3 className="text-lg font-semibold pr-6">{title}</h3>
        <FaRegStar className="text-yellow-500 text-xl flex-none ml-4" />
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        {tags.map((tag, index) => (
          <span key={index} className="bg-[#161A22] text-[#7B8EC8] px-3 py-1 text-xs rounded-md">
            {tag}
          </span>
        ))}
      </div>

      {/* Bottom Section - Profile, Votes, Answers, Views */}
      <div className="flex justify-between items-center text-gray-400 text-sm mt-3">
        {/* Left Section - Profile Picture, Username, and Time (ALL IN ONE LINE) */}
        <div className="flex items-center space-x-2">
          <img src={imgSrc} alt="User" className="w-8 h-8 rounded-full" />
          <span className="text-white font-semibold">{author}</span>
          <span className="text-gray-500 text-xs">• {asked}</span>
        </div>

        {/* Right Section - Votes, Answers, Views */}
        <div className="flex space-x-6">
          <span className="flex items-center">
            <FaRegThumbsUp className="text-[#1DA1F2] mr-1" />Votes {votes}
          </span>
          <span className="flex items-center">
          <FaComment className='text-[#1DA1F2] mr-1'/>Answers {answers}
          </span>
          <span className="flex items-center">
            <FaEye className='text-[#1DA1F2] mr-1'/>Views {views}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;