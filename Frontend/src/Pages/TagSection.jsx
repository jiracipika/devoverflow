import React, { useMemo }  from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import articles from '../assets/FakeData.js'
import ExpandableCard from '../Components/ExpandableCard.jsx';
import { useTags } from '../context/TagsContext.jsx';

// Memoize the ExpandableCard to prevent unnecessary re-renders
const MemoizedExpandableCard = React.memo(ExpandableCard);

const TagSection = () => {
    const { id } = useParams();
    const { filteredTags } = useTags();
    const navigate = useNavigate();
    
    // Find the tag from filteredTags with proper error handling
    const selectedData = useMemo(() => 
        filteredTags.find((data) => data.id === parseInt(id, 10))
    , [filteredTags, id]);

    // Memoize the filtered articles to prevent recalculation on every render
    const filteredArticles = useMemo(() => {
        if (!selectedData) return [];
        
        return articles.filter(article => 
            article.tags?.includes(selectedData.title)
        );
    }, [selectedData]);

    // Handle back navigation with proper keyboard support
    const handleBackClick = (e) => {
        if (e) {
            e.preventDefault();
        }
        navigate('/tags');
    };

    // Handle keyboard navigation
    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            handleBackClick();
        }
    };

    // Show loading state while data is being fetched
    if (!selectedData) {
        return (
            <div 
                className="min-h-screen text-white py-8 px-8 w-full lg:w-[calc(100%-330px)] bg-gradient-to-r from-[#0A0B10] to-black dark:bg-gradient-to-r dark:from-gray-300 dark:to-gray-300"
                role="status"
                aria-live="polite"
            >
                <p className="text-gray-400">Loading tag information...</p>
            </div>
        );
    }

    return (
        <main 
        className="min-h-screen text-white py-8 px-8 w-full lg:w-[calc(100%-330px)] bg-gradient-to-r from-[#0A0B10] to-black dark:bg-gradient-to-r dark:from-gray-300 dark:to-gray-300"
        role="main"
        aria-label={`Questions tagged with ${selectedData.title}`}
    >
        <div className="mb-8">
            <h1 
                className="text-2xl font-bold mb-2 dark:text-black"
                tabIndex="-1" // Allow programmatic focus
            >
                {selectedData.title}
            </h1>
            <p className="text-gray-300 dark:text-gray-700 mb-4">
                {selectedData.description}
            </p>
            
            <Link 
                to="/tags" 
                onClick={handleBackClick}
                onKeyDown={handleKeyDown}
                className="text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center"
                aria-label="Back to all tags"
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 mr-1" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path 
                        fillRule="evenodd" 
                        d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" 
                        clipRule="evenodd" 
                    />
                </svg>
                Back to All Tags
            </Link>
        </div>

        {filteredArticles.length > 0 ? (
            <div 
                className="space-y-4"
                role="list"
                aria-label={`List of questions tagged with ${selectedData.title}`}
            >
                {filteredArticles.map((item) => (
                    <MemoizedExpandableCard 
                        key={item.id} 
                        {...item}
                        aria-labelledby={`question-${item.id}-title`}
                    />
                ))}
            </div>
        ) : (
            <div 
                className="text-center py-12"
                role="status"
                aria-live="polite"
            >
                <p className="text-gray-400">
                    No questions found with this tag.
                </p>
            </div>
        )}
    </main>
    )
}

export default TagSection;