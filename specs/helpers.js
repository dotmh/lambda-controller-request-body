const fs = require("fs");
const path = require("path");

module.exports.loadMock = function (mock) {
	const mockPath = path.resolve(path.join(__dirname, ".", "mocks", `${mock}.json`));
	return JSON.parse(fs.readFileSync(mockPath, "utf-8"));
};
