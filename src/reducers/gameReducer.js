import {
	CHANGE_AMOUNT,
	HANDLE_RESULT,
	PLAY_GAME,
} from "../constants/ActionType"

const initialState = {
	money: 1000,
	randomItems: [
		{
			id: 1,
			name: "Cua",
			image: "./assets/images/cua.png",
		},
		{
			id: 2,
			name: "Cua",
			image: "./assets/images/cua.png",
		},
		{
			id: 3,
			name: "Cua",
			image: "./assets/images/cua.png",
		},
	],
	betList: [
		{
			id: 1,
			name: "Ga",
			image: "./assets/images/ga.png",
			amount: 0,
		},
		{
			id: 2,
			name: "Bau",
			image: "./assets/images/bau.png",
			amount: 0,
		},
		{
			id: 3,
			name: "Ca",
			image: "./assets/images/ca.png",
			amount: 0,
		},
		{
			id: 4,
			name: "Nai",
			image: "./assets/images/nai.png",
			amount: 0,
		},
		{
			id: 5,
			name: "Cua",
			image: "./assets/images/cua.png",
			amount: 0,
		},
		{
			id: 6,
			name: "Tom",
			image: "./assets/images/tom.png",
			amount: 0,
		},
	],
	betAmount: 100,
}

const gameReducer = (state = initialState, action) => {
	switch (action.type) {
		case CHANGE_AMOUNT: {
			const newBetList = [...state.betList]
			const item = newBetList.find(item => item.id === action.item.id)

			if (!item) return state

			if (action.item.type === "increase") {
				if (state.money - state.betAmount < 0) return state

				item.amount += state.betAmount
				state.money -= state.betAmount
			} else {
				if (item.amount <= 0) return state

				item.amount -= state.betAmount
				state.money += state.betAmount
			}

			return {
				...state,
				betList: newBetList,
			}
		}

		case PLAY_GAME: {
			return {
				...state,
				randomItems: action.newRandomItems,
			}
		}

		case HANDLE_RESULT: {
			return {
				...state,
				money: action.money,
				betList: state.betList.map(item => ({
					...item,
					amount: 0,
				})),
			}
		}

		default:
			return state
	}
}

export default gameReducer
