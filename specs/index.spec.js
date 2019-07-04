/* eslint-disable prefer-arrow-callback */
const Controller = require("@dotmh/lambda-controller");
const {
	expect
} = require("chai");

const {
	loadMock
} = require("./helpers");
const requestBody = require("..");

class TestController extends Controller {
	constructor(event, ctx, cb) {
		super(event, ctx, cb);
		this.add(requestBody);
	}
}

describe("Lambda Controller Post Extentions", () => {
	describe("valid test", function () {
		it("should correctly handle a valid JSON request body", function () {
			const event = loadMock("valid-json");
			const subject = new TestController(event, null, () => null);

			expect(subject.requestBody).to.be.an("object").and.deep.equal({
				a: 1,
				b: 2,
				c: 3
			});
		});

		it("should correctly handle a valid URL encoded request body", function () {
			const event = loadMock("valid-urlencoded");
			const subject = new TestController(event, null, () => null);

			expect(subject.requestBody).to.be.an("object").and.deep.equal({
				a: "1",
				b: "2",
				c: "3"
			});
		});

		it("should correctly handle a valid Plain request body", () => {
			const event = loadMock("valid-plain");
			const subject = new TestController(event, null, () => null);

			expect(subject.requestBody).to.be.an("string").and.equal(event.body);
		});

		it("should return null for a invalid/unknown MIME Type");
		it("should return null for a non POST, PUT, PATCH request");
	});

	describe("invalid", function () {
		it("should return null on an invalid json");
	});

	describe("short cut properties", function () {
		it("should return the body data when using post()");
		it("should return the body data when using put()");
		it("should return the body data when using patch()");
	});
});
