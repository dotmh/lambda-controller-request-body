![Lambda Controller Logo](logo.svg)

Lambda Control - Request Body Plugin
====================================

[![DotMH Future Gadget Lab](https://img.shields.io/badge/DotMH-.dev-red.svg?style=flat-square)](https://www.dotmh.io)
[![Lambda Controller Plugin](https://img.shields.io/badge/Plugin-λ%20Controller-red.svg?style=flat-square&color=F15024)](https://github.com/dotmh/lambda-controller)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg?style=flat-square)](https://github.com/xojs/xo)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/1a689fa42de04ab79d2b8f67f79aa6fa?style=flat-square)](https://www.codacy.com?utm_source=github.com&utm_medium=referral&utm_content=dotmh/lambda-controller-post&utm_campaign=Badge_Grade)
[![Codacy Badge](https://app.codacy.com/project/badge/Coverage/1a689fa42de04ab79d2b8f67f79aa6fa)](https://www.codacy.com?utm_source=github.com&utm_medium=referral&utm_content=dotmh/lambda-controller-request-body&utm_campaign=Badge_Coverage)
![Build](https://dotmh.semaphoreci.com/badges/lambda-controller-post.svg?key=e6d0fb01-e586-48ad-9849-5ae70280f258)
![NPM](https://img.shields.io/npm/l/@dotmh/lambda-controller-request-body?style=flat-square)
![npm bundle size](https://img.shields.io/bundlephobia/min/@dotmh/lambda-controller-request-body?style=flat-square)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](code_of_conduct.md)

Adds http request body handling methods support to the lambda controller

**NOTE** Does not support multipart forms.

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

Documentation
-------------

For the API documentation see <https://dotmh.github.io/lambda-controller-request-body/>

Or to read locally 

```
npm run readdocs
```

Licence
-------

This package is [Treeware](https://treeware.earth). If you use it in production, then we ask that you [**buy the world a tree**](https://plant.treeware.earth/dotmh/lambda-controller-request-body) to thank us for our work. By contributing to the Treeware forest you’ll be creating employment for local families and restoring wildlife habitats.

Credits
-------

Logo design by [@dotmh](https://www.dotmh.io)
