const Controller = require("@dotmh/lambda-controller");

const requestBody = require("..");

class TestController extends Controller {
	constructor(event, ctx, cb) {
		super(event, ctx, cb);
		this.add(requestBody);
	}
}

describe("Lambda Controller Post Extentions", () => {

});
