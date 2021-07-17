import React from "react"
import "./style.scss"
import { animated, useSpring } from "react-spring"

export default function GameHeader(props) {
	// PROPS
	const { money } = props

	// ANIMATION HOOKS
	const { number } = useSpring({
		from: {
			number: 0,
		},
		to: {
			number: money,
		},
	})

	// RENDER
	return (
		<div className="game-header">
			<h1 className="game-header__title">GAME BẦU CUA</h1>
			<div className="game-header__money">
				<span className="amount">
					Tiền thưởng:{" "}
					<animated.span>{number.to(n => n.toFixed(0))}</animated.span>$
				</span>
			</div>
		</div>
	)
}
