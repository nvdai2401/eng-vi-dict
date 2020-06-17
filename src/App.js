import React, { useState } from 'react'
import logo from './evdict.svg'
import './App.scss'

const App = () => {
	const [searchText, setSearchText] = useState('')
	const [suggestionVisible, setSuggestionVisible] = useState(false)

	const toggleSuggestion = (value) => {
		setSuggestionVisible(value)
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
						onBlur={() => toggleSuggestion(false)}
						onChange={(e) => setSearchText(e.target.value)}
					/>
					<button>Search</button>
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
				<p className='word'>Word</p>
				<p className='pronunciation'>/ə'gouiɳ/</p>
				<div className='definition'>
					<p className='type'>tính từ & phó từ</p>
					<div>đang chạy, đang chuyển động; đang hoạt động, đang tiến hành</div>
					<p>to move counters of an abacus</p>
					<p>to work an abacus+ tính bằng bàn tính, gảy bàn tính</p>
				</div>
				<div className='definition'>
					<p className='type'>tính từ & phó từ</p>
					<div>đang chạy, đang chuyển động; đang hoạt động, đang tiến hành</div>
					<p>to move counters of an abacus</p>
					<p>to work an abacus+ tính bằng bàn tính, gảy bàn tính</p>
				</div>
				<div className='definition'>
					<p className='type'>tính từ & phó từ</p>
					<div>đang chạy, đang chuyển động; đang hoạt động, đang tiến hành</div>
					<p>to move counters of an abacus</p>
					<p>to work an abacus+ tính bằng bàn tính, gảy bàn tính</p>
				</div>
				<div className='definition'>
					<p className='type'>tính từ & phó từ</p>
					<div>đang chạy, đang chuyển động; đang hoạt động, đang tiến hành</div>
					<p>to move counters of an abacus</p>
					<p>to work an abacus+ tính bằng bàn tính, gảy bàn tính</p>
				</div>
				<div className='definition'>
					<p className='type'>tính từ & phó từ</p>
					<div>đang chạy, đang chuyển động; đang hoạt động, đang tiến hành</div>
					<p>to move counters of an abacus</p>
					<p>to work an abacus+ tính bằng bàn tính, gảy bàn tính</p>
				</div>
			</div>
		</div>
	)
}

export default App
