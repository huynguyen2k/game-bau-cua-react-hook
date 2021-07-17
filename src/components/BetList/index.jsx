import React from "react"
import "./style.scss"

export default function BetList(props) {
	// PROPS
	const { betList, onChangeBetAmount } = props

	// HANDLE FUNCTIONS
	const handleChangeBetAmount = (id, type) => {
		if (onChangeBetAmount) {
			const newItem = {
				id,
				type,
			}
			onChangeBetAmount(newItem)
		}
	}

	// RENDER FUNCTIONS
	const renderBetList = () => {
		if (!Array.isArray(betList)) return

		return betList.map(item => (
			<div className="bet-list__item col-4" key={item.id}>
				<div className="image">
					<img src={item.image} alt={item.name} />
				</div>
				<div className="control-box">
					<button onClick={() => handleChangeBetAmount(item.id, "decrease")}>
						-
					</button>
					<span className="amount">{item.amount}</span>
					<button onClick={() => handleChangeBetAmount(item.id, "increase")}>
						+
					</button>
				</div>
			</div>
		))
	}

	return <div className="bet-list row">{renderBetList()}</div>
}
