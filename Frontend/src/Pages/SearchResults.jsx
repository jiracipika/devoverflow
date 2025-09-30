import React, { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';
import { Loader2, Search as SearchIcon } from 'lucide-react';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const { searchQuery, setSearchQuery, searchResults, searchAll } = useSearch();
  const query = searchParams.get('q') || '';

  useEffect(() => {
    if (query) {
      setSearchQuery(query);
      searchAll(query);
    }
  }, [query, searchAll, setSearchQuery]);

  const renderResults = () => {
    const { articles, users, tags, isLoading, error } = searchResults;

    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
          <span className="ml-2">Searching...</span>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-red-500 text-center p-4">
          {error}
        </div>
      );
    }

    if (!query) {
      return (
        <div className="text-center p-8">
          <SearchIcon className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-900" />
          <h3 className="mt-2 text-lg font-medium text-white dark:text-gray-900">Search for something</h3>
          <p className="mt-1 text-gray-500 dark:text-gray-900">Try searching for articles, users, or tags</p>
        </div>
      );
    }

    const hasResults = articles.length > 0 || users.length > 0 || tags.length > 0;

    if (!hasResults) {
      return (
        <div className="text-center p-8">
          <SearchIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No results found</h3>
          <p className="mt-1 text-gray-500 dark:text-gray-400">We couldn't find anything matching your search.</p>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        {articles.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Articles</h2>
            <div className="space-y-4">
              {articles.map(article => (
                <Link 
                  key={article.id} 
                  to={`/articles/${article.id}`}
                  className="block p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
                >
                  <h3 className="text-lg font-medium text-blue-600 dark:text-blue-400">{article.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">{article.excerpt}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {users.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Users</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {users.map(user => (
                <Link 
                  key={user.id}
                  to={`/users/${user.username}`}
                  className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
                >
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="h-10 w-10 rounded-full mr-3"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{user.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">@{user.username}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {tags.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <Link
                  key={tag.id}
                  to={`/tags/${tag.slug}`}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                >
                  #{tag.name}
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full lg:w-[80%] bg-gray-900 dark:bg-gray-300 px-4 py-8">
        <h1 className="text-center text-2xl font-bold mb-8 text-white">
          Search Results for "{query}"
        </h1>
        {renderResults()}
    </div>
  );
};

export default SearchResults;
