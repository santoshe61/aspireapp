let validateCard = {};


function checkCard(cardno) {
	let visa = /^5[1-5]{1}[0-9]{2}[\s]?[0-9]{4}[\s]?[0-9]{4}[\s]?[0-9]{4}$/;
	if (visa.test(cardno)) { return true; }


	let master = /^4{1}[0-9]{3}[\s]?[0-9]{4}[\s]?[0-9]{4}[\s]?[0-9]{1}$/;
	let master1 = /^4{1}[0-9]{3}[\s]?[0-9]{4}[\s]?[0-9]{4}[\s]?[0-9]{4}$/;
	if (master.test(cardno) || master1.test(cardno)) { return true; }


	let amex = /^3[4|7]{1}[0-9]{2}[\s]?[0-9]{4}[\s]?[0-9]{4}[\s]?[0-9]{3}$/;
	if (amex.test(cardno)) { return true; }

	return false;
}

function checkDate(val) {
	let [month, year] = val.split(" / ");
	if (+month < 1 || +month > 12 || +year < 22) return false;
	return new Date(`20${year}`, month-2) > new Date();
}



validateCard.cardNumber = (val) => {
	return (val && val.length === 19 && checkCard(val)) || 'Please enter correct card number';
}

validateCard.cardCvv = (val) => {
	return (+val && val.length === 3) || 'Please enter correct 3 digit CVV';
}

validateCard.cardExpiry = (val) => {
	if (!val || val.length !== 7) {
		return 'Please enter correct expiry date';
	} else if (!checkDate(val)){
		return 'Invalid date or your card has expired';
	}
}

export default validateCard;