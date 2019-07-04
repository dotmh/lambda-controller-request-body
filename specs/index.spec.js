const Controller = require("@dotmh/lambda-controller");

const requestBody = require("..");

const {loadMock} = require("./helpers");

class TestController extends Controller {
	constructor(event, ctx, cb) {
		super(event, ctx, cb);
		this.add(requestBody);
	}
}

describe("Lambda Controller Post Extentions", () => {
	it("should correctly handle a valid JSON request body", function () {
		const event = loadMock("valid-json");
		const subject = new TestController(event, null, () => null);

		console.log('TEST Controller --> ', subject);

		// console.log(subject.requestBody);
	});

	it("should correctly handle a valid URL encoded request body");
	it("should correctly handle a valid Plain request body");
});
