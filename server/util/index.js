module.exports = {
	notifyMe: (cardId, data) => {
		const nfs = { cardId, ...data }
		return nfs
	}
}