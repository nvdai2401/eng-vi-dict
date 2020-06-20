const url = process.env.REACT_APP_SERVER

export const getSuggestions = (searchText) =>
	fetch(`${url}suggestions?searchQuery=${searchText}`).then((res) => res.json())

export const getWordInfo = (searchText) =>
	fetch(`${url}search?searchQuery=${searchText}`).then((res) => res.json())
