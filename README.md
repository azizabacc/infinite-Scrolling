```sh
npx create-react-app .
npm run axios
```

```js
useEffect(() => {
  setBooks([]);
}, [query]);
```

```js
useEffect(() => {...}, [query]);
```

This sets up an effect that runs whenever the value of the query dependency changes.

```js
setBooks([]);
```

 Inside the effect, the setBooks function is called with an empty array ([]). This line of code updates the state of the books variable to be an empty array. It effectively clears any existing book data stored in the state whenever the query changes.
