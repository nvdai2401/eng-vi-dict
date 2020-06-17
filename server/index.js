const express = require('express')
const readline = require('readline')
const fs = require('fs')
const cors = require('cors')
const AvlTree = require('./tree/avl-tree/AvlTree')

const app = express()
const port = 4000

const mapSuggestions = new Map()
const AVLTree = new AvlTree()

console.time()

const rl = readline.createInterface({
	input: fs.createReadStream('server/en-vi-dict.txt'),
})

let word = ''
let pronunciation = ''
let definitions = []

rl.on('line', function (line) {
	if (line[0] === '@') {
		if (word && definitions.length !== 0) {
			AVLTree.insert(word, {
				word,
				pronunciation,
				definitions,
			})
			definitions = []
		}
		let temp = line.slice(1, line.length).split(' ')
		word = temp.shift()
		pronunciation = temp.join('')
	}

	let tempType = ''
	let tempSynonymous = []
	let tempMeanings = []

	if (line[0] === '*') {
		tempType = line.slice(3, line.length)
		definitions.push({
			type: tempType,
			meanings: tempMeanings,
			synonymous: tempSynonymous,
		})
	} else if (line[0] === '-') {
		if (definitions[definitions.length - 1]) {
			definitions[definitions.length - 1].meanings.push(
				...line.slice(2, line.length).split('; ')
			)
		}
	} else if (line[0] === '=') {
		// tempSynonymous = line
		if (definitions[definitions.length - 1]) {
			definitions[definitions.length - 1].synonymous.push(
				...line.slice(1, line.length).split('; ')
			)
		}
	}
})

rl.on('close', () => {
	console.timeEnd()
	rl.close()
})

app.use(cors())

app.get('/', (req, res) => {
	return res.send('Hello World')
})

app.get('/suggestions', (req, res) => {
	console.log('call Suggestions')
	const searchText = req.query.searchQuery
	const foundSuggestions = AVLTree.findSuggestions(searchText)
	if (!mapSuggestions.has(searchText)) {
		mapSuggestions.set(searchText, foundSuggestions)
	}
	const matchedWords = foundSuggestions
		.traverseInOrder()
		.filter((word) => word.slice(0, searchText.length) === searchText)
	console.log(matchedWords, mapSuggestions)
	res.json(matchedWords)
})

app.get('/search', (req, res) => {
	console.log(req.query.searchQuery)
	const searchQuery = req.query.searchQuery
	const result = AVLTree.find(searchQuery)
	res.json(result.word)
})

app.listen(port, () =>
	console.log(`Server listening at http://localhost:${port}`)
)
