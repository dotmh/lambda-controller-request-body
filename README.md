Lambda Control - Request Body Plugin
====================================
[![DotMH Future Gadget Lab](https://img.shields.io/badge/DotMH-.dev-red.svg?style=flat-square)](https://www.dotmh.io)
[![Lambda Controller Plugin](https://img.shields.io/badge/Plugin-λ%20Controller-orange?style=flat-square)](https://github.com/dotmh/lambda-controller)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/1a689fa42de04ab79d2b8f67f79aa6fa)](https://www.codacy.com?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=dotmh/lambda-controller-post&amp;utm_campaign=Badge_Grade)
![Build](https://dotmh.semaphoreci.com/badges/lambda-controller-post.svg?key=e6d0fb01-e586-48ad-9849-5ae70280f258)

Adds http request body handling methods support to the lambda controller

__NOTE__ Does not support multipart forms.

Installation
============

To Install

```sh
npm i @dotmh/lambda-controller-request-body
```

Requires [Lambda Controller](https://github.com/dotmh/lambda-controller) to be installed. Lambda Controller is a peer dependancy and so won't be installed automatically

Usage
=====
To use the functionality added by this plugin you will need to add it to your controller instance. 

```js
    const Controller = require('@dotmh/lambda-controller');
    const requestBody = require('@dotmh/lambda-controller-request-body')

    class MyController extends Controller {
        constructor(event, ctx, callback) {
            super(event, ctx, callback) {
                this.add(requestBody);
            }
        }
    }
```

You will then be able to access the methods and properties added by Request Body in your controller using `this` 