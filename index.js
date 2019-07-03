const querystring = require("querystring");

module.exports = {
	get jsonBody() {
		try {
			return this.rawRequestBody ? JSON.parse(this.rawRequestBody) : null;
		} catch (error) {
			console.error(error);
			return null;
		}
	},

	get urlencodedBody() {
		return this.rawRequestBody ? querystring.parse(this.rawRequestBody) : null;
	},

	get plainBody() {
		return this.rawRequestBody;
	},

	get requestBody() {
		let requestBody;

		switch (this.event["Content-Type"]) {
			case "application/json":
				requestBody = this.json;
				break;
			case "application/x-www-form-urlencoded":
				requestBody = this.urlencoded;
				break;
			case "text/plain":
				requestBody = this.plain;
				break;
			default:
				requestBody = null;
				break;
		}

		return requestBody;
	},

	get post() {
		return this.requestBody
	},

	get put() {
		return this.requestBody
	},

	get patch() {
		return this.requestBody
	},

	get rawRequestBody() {
		const requestBody = this.event.body;
		if (this.isAllowedRequestBody() === false || (this.isAllowedRequestBody() && !requestBody)) {
			return null;
		}

		if (this.event.isBase64Encoded) {
			return this._base64decode(requestBody);
		}

		return requestBody;
	},

	isAllowedRequestBody() {
		return ["POST", "PUT", "PATCH"].includes(this.event.httpMethod.toUpperCase());
	},

	_base64decode(text) {
		return Buffer.from(text, "base64").toString("utf-8");
	}
};
