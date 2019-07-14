const helperFunctions = {
	validateEmail: (email) => {
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	},
	validatePassword: (password) => {
		const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/;
		return pattern.test(password);
	}
}

export default helperFunctions;