const querystring = require('querystring');

module.exports = {
    get json() {
        try {
            return JSON.parse(this.rawPost);
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    get urlencoded() {
        return querystring.parse(this.rawPost);
    },

    get plain() {
        return this.rawPost;
    },

    get rawPost() {
        const postData = this.event.body;
        if(!this.isPost() || (this.isPost() && !postData)) {
            return null;
        }

        if(this.event.isBase64Encoded) {
            return this._base64decode(postData);
        } else {
            return postData;
        }
    },

    isPost() {
        return this.event.httpMethod.toLowerCase() === "post";
    },

    _base64decode(text) {
        return Buffer.from(text, 'base64').toString('utf-8');
    }
}