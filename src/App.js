import React, { useState } from 'react'
import logo from './evdict.svg'
import './App.scss'

const App = () => {
	const [searchText, setSearchText] = useState('adapt')
	const [suggestionVisible, setSuggestionVisible] = useState(false)
	const [wordInfo, setWordInfo] = useState({})

	const toggleSuggestion = (value) => {
		setSuggestionVisible(value)
	}

	const onSubmit = () => {
		fetch(`http://localhost:4000/search?searchQuery=${searchText}`)
			.then((res) => res.json())
			.then((data) => setWordInfo(data))
	}

	console.log(wordInfo)

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
						onBlur={() => toggleSuggestion(false)}
						onChange={(e) => setSearchText(e.target.value)}
					/>
					<button onClick={onSubmit}>Search</button>
					{suggestionVisible && (
						<ul className='suggestions'>
							<li>Lorem ipsum</li>
							<li>Lorem ipsum</li>
							<li>Lorem ipsum</li>
							<li>Lorem ipsum</li>
							<li>Lorem ipsum</li>
							<li>Lorem ipsum</li>
							<li>Lorem ipsum</li>
							<li>Lorem ipsum</li>
							<li>Lorem ipsum</li>
							<li>Lorem ipsum</li>
							<li>Lorem ipsum</li>
							<li>Lorem ipsum</li>
							<li>Lorem ipsum</li>
							<li>Lorem ipsum</li>
							<li>Lorem ipsum</li>
							<li>Lorem ipsum</li>
							<li>Lorem ipsum</li>
							<li>Lorem ipsum</li>
						</ul>
					)}
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
