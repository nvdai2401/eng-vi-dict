const SEARCH_HISTORY = 'SEARCH_HISTORY'

export const getSearchHistory = () =>
	JSON.parse(localStorage.getItem(SEARCH_HISTORY))

export const setSearchHistory = (history) =>
	localStorage.setItem(SEARCH_HISTORY, JSON.stringify(history))
