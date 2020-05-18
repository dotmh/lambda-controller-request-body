/***
 *    Copyright 2020 DotMH Martin Haynes <oss@dotmh.io>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
const querystring = require("querystring");

module.exports = {
	get jsonBody() {
		try {
			return this.rawRequestBody ? JSON.parse(this.rawRequestBody) : null;
		} catch (error) {
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

		if (this.rawRequestBody === null) {
			return null;
		}

		switch (this.headers["content-type"]) {
			case "application/json":
				requestBody = this.jsonBody;
				break;
			case "application/x-www-form-urlencoded":
				requestBody = this.urlencodedBody;
				break;
			case "text/plain":
				requestBody = this.plainBody;
				break;
			default:
				requestBody = null;
				break;
		}

		return requestBody;
	},

	get post() {
		return this.requestBody;
	},

	get put() {
		return this.requestBody;
	},

	get patch() {
		return this.requestBody;
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
		return ["POST", "PUT", "PATCH"].includes(this.method.toUpperCase());
	},

	_base64decode(text) {
		return Buffer.from(text, "base64").toString("utf-8");
	}
};
