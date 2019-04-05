const Controller = require("@dotmh/lambda-controller");

const post = require("..");

function controllerFactory(event, callback) {
	return new Controller(event, null, callback).add(post);
}

describe("Lambda Controller Post Extentions", () => {

});
