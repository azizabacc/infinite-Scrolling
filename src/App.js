import React, { useState, useRef, useCallback } from 'react'
import useBookSearch from './useBookSearch'

export default function App() {
  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(1)

  const {
    books,
    hasMore,
    loading,
    error
  } = useBookSearch(query, pageNumber)

  const observer = useRef()
  console.log(observer);
  const lastBookElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  function handleSearch(e) {
    setQuery(e.target.value)
    setPageNumber(1)
  }

  return (
    <>
      <input type="text" value={query} onChange={handleSearch}></input>
      {books.map((book, index) => {
        if (books.length === index + 1) {
          return <div className='booktitle' ref={lastBookElementRef} key={book}>{book}</div>
        } else {
          return <div  className='booktitle' key={book}>{book}</div>
        }
      })}
      <div id='loading'>{loading && 'Loading...'}</div>
      <div>{error && 'Error'}</div>
    </>
  )
}
