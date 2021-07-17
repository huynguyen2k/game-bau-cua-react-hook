import React, { useState } from "react"
// hooks
import { useDispatch, useSelector } from "react-redux"
// styles
import "./style.scss"
// components
import GameHeader from "../../components/GameHeader/index"
import BetList from "../../components/BetList/index"
import PlayGame from "../../components/PlayGame/index"

// ACTIONS
import {
	changeAmountAction,
	handleResultAction,
	playGameAction,
} from "../../actions/gameAction"

export default function GameBauCua() {
	// REACT HOOKS
	const [messages, setMessages] = useState([])

	const dispatch = useDispatch()

	const betList = useSelector(state => state.gameReducer.betList)
	const randomItems = useSelector(state => state.gameReducer.randomItems)
	const money = useSelector(state => state.gameReducer.money)

	// HANDLE FUNCTIONS
	const handleChangeBetAmount = item => {
		dispatch(changeAmountAction(item))
	}

	const handlePlayGame = () => {
		const newRandomItems = []

		for (let i = 1; i <= 3; i++) {
			const randomIndex = Math.floor(Math.random() * betList.length)
			const randomItem = {
				id: i,
				name: betList[randomIndex].name,
				image: betList[randomIndex].image,
			}
			newRandomItems.push(randomItem)
		}
		dispatch(playGameAction(newRandomItems))
	}

	const handleResult = () => {
		let totalMoney = money
		randomItems.forEach(randomItem => {
			const betItem = betList.find(betItem => betItem.name === randomItem.name)

			if (betItem) {
				totalMoney += betItem.amount
			}
		})

		betList.forEach(betItem => {
			const randomItem = randomItems.find(
				randomItem => randomItem.name === betItem.name
			)

			if (randomItem) {
				totalMoney += betItem.amount
			}
		})

		if (totalMoney > 0) {
			setMessages([
				...messages,
				{
					id: Date.now(),
					title: "Congratulation!",
					content: `Chúc mừng bạn đã nhận được ${totalMoney}$`,
				},
			])
		}

		dispatch(handleResultAction(totalMoney))
	}

	return (
		<div className="wrapper">
			<div className="main-background"></div>
			<div className="game">
				<div className="container">
					<GameHeader money={money} />
					<div className="row">
						<div className="col-7">
							<BetList
								betList={betList}
								onChangeBetAmount={handleChangeBetAmount}
							/>
						</div>
						<div className="col-5">
							<PlayGame
								betList={betList}
								randomItems={randomItems}
								onPlayGame={handlePlayGame}
								handleResult={handleResult}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
