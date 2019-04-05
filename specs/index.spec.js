const Controller = require("@dotmh/lambda-controller");

const post = require("..");

class PostController extends Controller {
	constructor(event, ctx, cb) {
		super(event, ctx, cb);
		this.add(post);
	}
}

describe("Lambda Controller Post Extentions", () => {

});
