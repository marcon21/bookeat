function errorRes(res, err, errMsg = 'failed operation', statusCode = 500) {
	console.error('ERROR:', err);
	return res.status(statusCode).json({
		success: false,
		error: errMsg
	});
}

function successRes(res, msg, data = {}, statusCode = 200) {
	return res.status(statusCode).json({
		success: true,
		message: msg,
		data
	});
}

module.exports = {
	errorRes,
	successRes
};