const fs = require('fs');
const path = require('path');


function sendUserList() {
	const userListFilePath = path.join(__dirname, '../data/users.json');
	return fs.readFileSync(userListFilePath);
}


module.exports = sendUserList;
