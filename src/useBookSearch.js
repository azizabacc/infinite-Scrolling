import axios from 'axios';
import { useEffect, useState } from 'react';

export default function useBookSearch(query, pageNumber) {
  // to store the fetched books
  const [books, setBooks] = useState([]);
  // to indicate if there are more books to fetch
  const [hasMore, setHasMore] = useState(false);
  // to track loading state
  const [loading, setLoading] = useState(true);
  // to track error state
  const [error, setError] = useState(false);

  // Clear books when query changes
  useEffect(() => {
    setBooks([]);
  }, [query]);

  // Fetch books when query or pageNumber changes
  useEffect(() => {
    setLoading(true);
    setError(false);

    // Create a cancel token source for canceling the request
    const source = axios.CancelToken.source();

    // Fetch books using Axios GET request
    axios
      .get('http://openlibrary.org/search.json', {
        params: { q: query, page: pageNumber },
        cancelToken: source.token, // Use the cancel token
      })
      .then(res => {
        // Update books with the new data
        console.log(res.data);
        setBooks(prevBooks => [...new Set([...prevBooks, ...res.data.docs.map(b => b.title)]),
        ]);
        // Check if there are more books to fetch
        setHasMore(res.data.docs.length > 0);
        // Finish loading
        setLoading(false);
      })
      .catch(e => {
        // Handle errors, including canceled requests
        if (axios.isCancel(e)) return; // Ignore canceled requests
        setError(true); // Set error state for other errors
      });

    // Clean up by canceling the request when component unmounts or effect changes
    return () => {
      source.cancel(); // Cancel the request
    };
  }, [query, pageNumber]);

  // Return states for the component using the hook
  return { loading, error, books, hasMore };
}
