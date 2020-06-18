import React, { useState } from 'react'
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
	const [searchText, setSearchText] = useState('adapt')
	const [suggestionVisible, setSuggestionVisible] = useState(false)
	const [suggestions, setSuggestions] = useState([])
	const [wordInfo, setWordInfo] = useState({})

	const toggleSuggestion = (value) => {
		setSuggestionVisible(value)
	}

	const onSubmit = async () => {
		const result = await getWordInfo(searchText)
		console.log(result)
		if (result) {
			setWordInfo(result)
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
		setSearchText(suggestion)
		const result = await getWordInfo(suggestion)
		setWordInfo(result)
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
						onFocus={() => toggleSuggestion(true)}
						onBlur={() => setTimeout(() => toggleSuggestion(false), 150)}
						onChange={(e) => handleOnChange(e.target.value)}
					/>
					<button onClick={onSubmit}>Search</button>
					{suggestions.length && suggestionVisible ? (
						<ul className='suggestions'>
							{suggestions.map((suggestion, index) => (
								<li
									key={index}
									onClick={() => {
										console.log('call')
										handleOnSelectSuggestion(suggestion)
									}}
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
					<div>Welcome to EVDict</div>
				)}
			</div>
		</div>
	)
}

export default App
