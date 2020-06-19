import React, { useState, useEffect } from 'react'
import AwesomeDebouncePromise from 'awesome-debounce-promise'
import logo from './evdict.svg'
import './App.scss'

const getSuggestions = (searchText) =>
	fetch(
		`http://localhost:4000/suggestions?searchQuery=${searchText}`
	).then((res) => res.json())

const getWordInfo = (searchText) =>
	fetch(`http://localhost:4000/search?searchQuery=${searchText}`).then((res) =>
		res.json()
	)
const getSuggestionsDebounce = AwesomeDebouncePromise(getSuggestions, 500)

const App = () => {
	const [searchText, setSearchText] = useState('')
	const [suggestionVisible, setSuggestionVisible] = useState(false)
	const [suggestions, setSuggestions] = useState([])
	const [wordInfo, setWordInfo] = useState({})

	useEffect(() => {
		const history = JSON.parse(localStorage.getItem('SEARCH_HISTORY'))
		if (!history) {
			console.log('mounted')
			localStorage.setItem('SEARCH_HISTORY', JSON.stringify([]))
		}
	}, [])

	const toggleSuggestion = (value) => {
		setSuggestionVisible(value)
	}

	const updateSearchHistory = (word) => {
		const history = JSON.parse(localStorage.getItem('SEARCH_HISTORY'))
		if (!history.includes(word)) {
			localStorage.setItem('SEARCH_HISTORY', JSON.stringify([...history, word]))
		}
	}

	const onSubmit = async () => {
		if (wordInfo.word === searchText) return
		const result = await getWordInfo(searchText)
		if (result) {
			setWordInfo(result)
			updateSearchHistory(searchText)
		}
	}

	const handleOnChange = async (searchText) => {
		setSearchText(searchText)
		if (!searchText) return
		const result = await getSuggestionsDebounce(searchText)
		if (result) {
			setSuggestions(result)
		}
	}

	const handleOnSelectSuggestion = async (suggestion) => {
		if (suggestion === searchText) return
		setSearchText(suggestion)
		const result = await getWordInfo(suggestion)
		setWordInfo(result)
		updateSearchHistory(suggestion)
	}

	const handleOnFocusSearchInput = () => {
		const history = JSON.parse(localStorage.getItem('SEARCH_HISTORY'))
		if (history.length) setSuggestions(history)
		toggleSuggestion(true)
	}

	return (
		<div className='root'>
			<div className='header'>
				<img src={logo} alt='EVDict logo' className='logo' />
				<div className='search-box'>
					<input
						placeholder='Tra từ điển Anh Việt'
						type='search'
						value={searchText}
						onFocus={handleOnFocusSearchInput}
						onBlur={() => setTimeout(() => toggleSuggestion(false), 150)}
						onChange={(e) => handleOnChange(e.target.value)}
					/>
					<button onClick={onSubmit}>Search</button>
					{suggestions.length && suggestionVisible ? (
						<ul className='suggestions'>
							{suggestions.map((suggestion, index) => (
								<li
									key={index}
									onClick={() => handleOnSelectSuggestion(suggestion)}
								>
									{suggestion}
								</li>
							))}
						</ul>
					) : null}
				</div>
			</div>

			<div className='main'>
				{wordInfo.word ? (
					<>
						<p className='word'>{wordInfo.word}</p>
						<p className='pronunciation'>{wordInfo.pronunciation}</p>
						{wordInfo.definitions.length &&
							wordInfo.definitions.map((def, index) => (
								<div key={index} className='definition'>
									<p className='type'>{def.type}</p>
									<ul className='meaning'>
										{def.meanings.map((meaning, index) => (
											<li key={index}>{meaning}</li>
										))}
									</ul>
									<ul className='synonymous'>
										{def.synonymous.length
											? def.synonymous.map((synonymous, index) => (
													<li key={index}>{synonymous}</li>
											  ))
											: null}
									</ul>
								</div>
							))}
					</>
				) : (
					<div className='welcome-text'>
						Welcome to <span>E</span>
						<span>V</span>
						<span>D</span>
						<span>i</span>
						<span>c</span>
						<span>t</span>!
					</div>
				)}
			</div>
		</div>
	)
}

export default App
