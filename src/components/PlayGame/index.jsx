import React, { useRef } from "react"
import "./style.scss"

export default function PlayGame(props) {
	// PROPS
	const { betList, randomItems, onPlayGame, handleResult } = props

	// HOOKS
	const animationId = useRef(0)

	// HANDLE FUNCTIONS
	const handlePlayGame = () => {
		if (onPlayGame) {
			animationId.current = Date.now()
			onPlayGame()
		}
	}

	// HANDLE ANIMATION FUNCTIONS
	const handleAnimationEnd = index => {
		if (handleResult && index === 0) {
			handleResult()
		}
	}

	// RENDER FUNCTIONS
	const renderRandomBox = () => {
		if (!Array.isArray(randomItems)) return

		const styles = {
			animation: `rotateAnimation${animationId.current} 1.25s ease forwards`,
		}

		return randomItems.map((item, index) => (
			<div className="box-3d random-item" key={item.id}>
				<div
					className="inner-box"
					style={styles}
					onAnimationEnd={() => handleAnimationEnd(index)}
				>
					<div className="image">
						<img src={item.image} alt={item.name} />
					</div>
					{renderRestFaceImages(item)}
				</div>
			</div>
		))
	}

	const renderRestFaceImages = randomItem => {
		if (
			!Array.isArray(betList) ||
			typeof randomItem !== "object" ||
			randomItem === null
		)
			return

		return betList
			.filter(bet => bet.name !== randomItem.name)
			.map(bet => (
				<div className="image" key={bet.id}>
					<img src={bet.image} alt={bet.name} />
				</div>
			))
	}

	const renderKeyframes = () => {
		if (animationId.current === 0) {
			return null
		}

		return `
			@keyframes rotateAnimation${animationId.current} {
				from {
					transform: rotateX(10deg) rotateY(10deg) 
				}
				to {
					transform: rotateX(1090deg) rotateY(1090deg)
				}
			}
		`
	}

	return (
		<div className="play-game">
			<style>{renderKeyframes()}</style>
			<div className="play-game__random-box">{renderRandomBox()}</div>
			<div className="play-game__control">
				<button className="play-game-btn" onClick={handlePlayGame}>
					Play game
				</button>
			</div>
		</div>
	)
}
