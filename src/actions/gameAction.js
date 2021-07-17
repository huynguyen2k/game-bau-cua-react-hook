import {
	CHANGE_AMOUNT,
	HANDLE_RESULT,
	PLAY_GAME,
} from "../constants/ActionType"

export const changeAmountAction = item => {
	return {
		type: CHANGE_AMOUNT,
		item,
	}
}

export const playGameAction = newRandomItems => {
	return {
		type: PLAY_GAME,
		newRandomItems,
	}
}

export const handleResultAction = money => {
	return {
		type: HANDLE_RESULT,
		money,
	}
}
