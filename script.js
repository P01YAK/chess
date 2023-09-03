document.addEventListener('DOMContentLoaded', () => {
	let board = null
	const game = new Chess()
	const moveHistory = document.getElementById('move-history')
	let moveCount = 1
	let userColor = 'w'

	const makeRandomMove = () => {
		const possibleMoves = game.moves()

		if (game.game_over()) {
			alert('Мат!')
		} else {
			const randomIdx = Math.floor(Math.random() * possibleMoves.length)
			const move = possibleMoves[randomIdx]
			game.move(move)
			board.position(game.fen())
			recordMove(move, moveCount)
			moveCount += 1
		}
	}

	const recordMove = (move, count) => {
		const forattedMove =
			count % 2 === 1 ? `${Math.ceil(count / 2)}. ${move}` : `${move} -`
		moveHistory.textContent += forattedMove + ' '
		moveHistory.scrollTop = moveHistory.scrollHeight
	}

	const onDragStart = (source, piece) => {
		return !game.game_over() && piece.search(userColor) === 0
	}

	const onDrop = (source, target) => {
		const move = game.move({
			from: source,
			to: target,
			promotion: 'q',
		})

		if (move === null) return 'snapback'

		window.setTimeout(makeRandomMove, 250)
		recordMove(move.san, moveCount)
		moveCount++
	}
	const onSnapEnd = () => {
		board.position(game.fen())
	}
	const boardConfig = {
		showNotation: true,
		draggable: true,
		position: 'start',
		onDragStart,
		onDrop,
		onSnapEnd,
		moveSpeed: 'fast',
		snapBackSpeed: 500,
		snapSpeed: 100,
	}
	board = Chessboard('board', boardConfig)

	document.querySelector('.play-again').addEventListener('click', () => {
		game.reset()
		board.start()
		moveHistory.textContent = ''
		moveCount = 1
		userColor = 'w'
	})

	document.querySelector('.set-pos').addEventListener('click', () => {
		const fen = prompt('Введи FEN описание для ситуации!')
		if (fen != null) {
			if (game.load(fen)) {
				board.position(fen)
				moveHistory.textContent = ''
				moveCount = 1
				userColor = 'w'
			} else {
				alert('Неверный FEN. Попробуйте снова!')
			}
		}
	})

	document.querySelector('.flip-board').addEventListener('click', () => {
		board.flip()
		makeRandomMove()
		userColor = userColor === 'w' ? 'b' : 'w'
	})
})

document.addEventListener('DOMContentLoaded', function () {
	const body = document.body
	const container = document.querySelector('.container')
	const buttons = document.querySelectorAll('.buttons button')

	// Функция для смены темы
	function toggleTheme() {
		body.classList.toggle('light-theme')
		body.classList.toggle('dark-theme')
		container.classList.toggle('light-theme')
		container.classList.toggle('dark-theme')
		move-history.classList.toggle('light-theme')
		move-history.classList.toggle('dark-theme')
		buttons.forEach(button => button.classList.toggle('light-theme'))
	}

	// Добавьте обработчик события для кнопки смены темы
	const themeButton = document.querySelector('.toggle-theme-button')
	themeButton.addEventListener('click', toggleTheme)
})
