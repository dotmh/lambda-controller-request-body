const Controller = require("@dotmh/lambda-controller");
const {expect} = require("chai");

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
		const subject = new TestController(event, null, () => null)

		expect(subject.requestBody).to.be.an("object").and.deep.equal({a:1, b:2, c:3});
	});

	it("should correctly handle a valid URL encoded request body", function () {
		const event = loadMock("valid-urlencoded");
		const subject = new TestController(event, null, () => null)

		expect(subject.requestBody).to.be.an("object").and.deep.equal({a:"1", b:"2", c:"3"});
	});

	it("should correctly handle a valid Plain request body");
});
