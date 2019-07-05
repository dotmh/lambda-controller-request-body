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
	});

	describe("invalid", function () {
		it("should return null for a invalid/unknown MIME Type", function () {
			const event = loadMock("invalid-mime");
			const subject = new TestController(event, null, () => null);

			expect(subject.requestBody).to.equal(null);
		});

		it("should return null for a non POST, PUT, PATCH request", function () {
			const event = loadMock("invalid-verb");
			const subject = new TestController(event, null, () => null);

			expect(subject.requestBody).to.equal(null);
		});

		it("should return null on an invalid json", function () {
			const event = loadMock("invalid-json");
			const subject = new TestController(event, null, () => null);

			expect(subject.requestBody).to.equal(null);
		});
	});

	describe("short cut properties", function () {
		it("should return the body data when using post()", function () {
			const event = loadMock("valid-json");
			const subject = new TestController(event, null, () => null);

			expect(subject.post).to.be.an("object").and.deep.equal({
				a: 1,
				b: 2,
				c: 3
			});
		});

		it("should return the body data when using put()", function () {
			const event = loadMock("valid-json");
			const subject = new TestController(event, null, () => null);

			expect(subject.put).to.be.an("object").and.deep.equal({
				a: 1,
				b: 2,
				c: 3
			});
		});

		it("should return the body data when using patch()", function () {
			const event = loadMock("valid-json");
			const subject = new TestController(event, null, () => null);

			expect(subject.patch).to.be.an("object").and.deep.equal({
				a: 1,
				b: 2,
				c: 3
			});
		});
	});
});
