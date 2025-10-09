import React, { useEffect, useState, useMemo, useCallback } from 'react'
import ExpandableCard from '../Components/ExpandableCard'

// Memoize the ExpandableCard to prevent unnecessary re-renders
const MemoizedExpandableCard = React.memo(ExpandableCard);

const Collections = () => {
  const [bookmarkedCards, setBookmarkedCards] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  // Load bookmarked cards from localStorage
  useEffect(() => {
    try {
      const savedCollections = JSON.parse(localStorage.getItem('collections') || '[]');
      setBookmarkedCards(savedCollections);
    } catch (error) {
      console.error('Error loading collections:', error);
      // Optionally, show an error message to the user
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Handle removing a card from collections
  const handleRemoveCard = useCallback((cardId) => {
    setBookmarkedCards(prev => {
      const updated = prev.filter(card => card.id !== cardId);
      // Update localStorage
      try {
        localStorage.setItem('collections', JSON.stringify(updated));
      } catch (error) {
        console.error('Error updating collections:', error);
      }
      return updated;
    });
  }, []);

  // Memoize the rendered cards to prevent unnecessary re-renders
  const renderedCards = useMemo(() => {
    return bookmarkedCards.map((item) => (
      <MemoizedExpandableCard 
        key={item.id} 
        {...item} 
        isBookmarked={true}
        onRemove={handleRemoveCard}
      />
    ));
  }, [bookmarkedCards, handleRemoveCard]);

  if (isLoading) {
    return (
      <div 
        className="min-h-screen text-white py-8 px-8 w-full lg:w-[calc(100%-330px)] bg-gradient-to-r from-[#0A0B10] to-black dark:bg-gradient-to-r dark:from-gray-300 dark:to-gray-300"
        role="status"
        aria-live="polite"
      >
        <p className="text-gray-400">Loading your collections...</p>
      </div>
    );
  }

  return (
    <main 
      className="min-h-screen text-white py-8 gap-8 flex flex-col px-8 w-full lg:w-[calc(100%-330px)] bg-gradient-to-r from-[#0A0B10] to-black dark:bg-gradient-to-r dark:from-gray-300 dark:to-gray-300"
      role="main"
      aria-label="Saved questions collection"
    >
      <h1 className="text-2xl font-bold mb-6">Saved Questions</h1>
      
      {bookmarkedCards.length === 0 ? (
        <p 
          className="text-gray-400 text-center py-12"
          role="status"
          aria-live="polite"
        >
          No questions saved yet. Start by bookmarking interesting questions!
        </p>
      ) : (
        <div 
          className="space-y-4"
          role="list"
          aria-label="List of saved questions"
        >
          {renderedCards}
        </div>
      )}
    </main>
  )
}

export default React.memo(Collections);