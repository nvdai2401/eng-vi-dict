import React, { useState, useEffect } from 'react'
import AwesomeDebouncePromise from 'awesome-debounce-promise'

import { getSuggestions, getWordInfo } from './api'
import { getSearchHistory, setSearchHistory } from './utils'

import logo from './evdict.svg'
import './App.scss'

const getSuggestionsDebounce = AwesomeDebouncePromise(getSuggestions, 500)

const App = () => {
	const [searchText, setSearchText] = useState('')
	const [suggestionVisible, setSuggestionVisible] = useState(false)
	const [suggestions, setSuggestions] = useState([])
	const [wordInfo, setWordInfo] = useState({})

	useEffect(() => {
		const history = getSearchHistory()
		if (!history) {
			setSearchHistory([])
		}
	}, [])

	const updateSearchHistory = (word) => {
		const history = getSearchHistory()
		if (!history.includes(word)) {
			setSearchHistory([word, ...history])
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

	const handleOnInputChange = async (searchText) => {
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
		const history = getSearchHistory()
		if (history.length) setSuggestions(history)
		setSuggestionVisible(true)
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
						onBlur={() => setTimeout(() => setSuggestionVisible(false), 200)}
						onChange={(e) => handleOnInputChange(e.target.value)}
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

			<div className='footer'>
				<span>
					© Developed by{' '}
					<a
						href='https://www.linkedin.com/in/nvdai2401/'
						target='_blank'
						rel='noopener noreferrer'
					>
						Michael
					</a>
				</span>
			</div>
		</div>
	)
}

export default App
