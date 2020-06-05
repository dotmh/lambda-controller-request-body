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

/**
  * @module lambda-controller-request-body
  */
const querystring = require("querystring");

/**
 * A Plugin to allow you to handle the body of requests
 * */

module.exports = {
	/**
	 * Get the body data, when JSON encoded
	 * @type {object}
	 * @author Martin Haynes <oss@dotm.io>
	 */
	get jsonBody() {
		try {
			return this.rawRequestBody ? JSON.parse(this.rawRequestBody) : null;
		} catch (error) { /* eslint-disable-line no-unused-vars */
			return null;
		}
	},

	/**
	 * Get the body data, when URL Encoded
	 * @type {object}
	 * @author Martin Haynes <oss@dotmh.io>
	 */
	get urlencodedBody() {
		return this.rawRequestBody ? querystring.parse(this.rawRequestBody) : null;
	},

	/**
	 * Get the body when it is in an unknown serialization format. This could be used to get
	 * data that has been sent as XML, Yaml, CSV etc.
	 *
	 * @type {string}
	 * @author Martin Haynes <oss@dotmh.io>
	 */
	get plainBody() {
		return this.rawRequestBody;
	},

	/**
	 * Get the request body based on the content-type sent in the request. If the type isn't
	 * known then return null.
	 *
	 * Currently supported types are
	 * - application/json
	 * - application/x-www-form-urlencoded
	 * - text/plain
	 *
	 * @type {object|string}
	 * @author Martin Haynes <oss@dotmh.io>
	 */
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

	/**
	 * An alias to `requestBody` designed for compatablity.
	 *
	 * @deprecated
	 * @type {object|string}
	 * @author Martin Haynes <oss@dotmh.io>
	 */
	get post() {
		return this.requestBody;
	},

	/**
	 * An alias to `requestBody` designed for compatablity.
	 *
	 * @deprecated
	 * @type {object|string}
	 * @author Martin Haynes <oss@dotmh.io>
	 */
	get put() {
		return this.requestBody;
	},

	/**
	 * An alias to `requestBody` designed for compatablity.
	 *
	 * @deprecated
	 * @type {object|string}
	 * @author Martin Haynes <oss@dotmh.io>
	 */
	get patch() {
		return this.requestBody;
	},

	/**
	 * Peforms basic validation and base64 decoding on the request body.
	 *
	 * @type {string}
	 * @author Martin Haynes <oss@dotmh.io>
	 */
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

	/**
	 * Checks to see if the rquest is allowed to have a body
	 *
	 * @private
	 * @param {null}
	 * @returns {boolean} true for allowed , false for not allowed
	 * @author Martin Haynes <oss@dotmh.io>
	 */
	isAllowedRequestBody() {
		return ["POST", "PUT", "PATCH"].includes(this.method.toUpperCase());
	},

	/**
	 * Base64 decodes a string
	 *
	 * @private
	 * @param {string} text
	 * @returns {string} The base64 decoded string
	 * @author Martin Haynes <oss@dotmh.io>
	 */
	_base64decode(text) {
		return Buffer.from(text, "base64").toString("utf-8");
	}
};
