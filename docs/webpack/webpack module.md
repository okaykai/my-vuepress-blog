---
title: Webpack 模块化原理
author: okaykai
date: "2021-12-12"
---

## webpack 模块化原理

Webpack 打包的代码，允许我们使用各种各样的模块化，但是最常用的是**CommonJS、ES Module**，甚至允许我们混合使用。 那么它是如何支持模块化呢？

### CommonJs

```js
// format.js
const dateFormat = (date) => {
  return "1998-12-12";
};

const priceFormat = (price) => {
  return "100.00";
};

module.exports = {
  dateFormat,
  priceFormat,
};

// index.js
const { dateFormat, priceFormat } = require("./js/format");

console.log(dateFormat("aaa"));
console.log(priceFormat("bbb"));
```

我们编写一个 cjs 模块，导出两个方法，在 index.js 文件中调用这两个方法，查看 webpack 打包后的代码

#### 1. \_\_webpack_modules\_\_对象

```js
var __webpack_modules__ = {
  "./src/js/format.js": function (module) {
    const dateFormat = (date) => {
      return "2020-12-12";
    };

    const priceFormat = (price) => {
      return "100.00";
    };

    module.exports = {
      dateFormat,
      priceFormat,
    };
  },
};

// The module cache
var __webpack_module_cache__ = {};
```

webpack 会把模块以`path-function`的键值对形式存储在`__webpack_modules__`中，并创建一个缓存对象`__webpack_module_cache__`，下次加载模块，若缓存对象中存在该对象，则直接返回，不会重新执行加载函数

#### 2. 模块加载方法\_\_webpack_require\_\_

```js
// The require function
function __webpack_require__(moduleId) {
  // Check if module is in cache
  var cachedModule = __webpack_module_cache__[moduleId];
  if (cachedModule !== undefined) {
    return cachedModule.exports;
  }
  // Create a new module (and put it into the cache)
  var module = (__webpack_module_cache__[moduleId] = {
    // no module.id needed
    // no module.loaded needed
    exports: {},
  });

  // Execute the module function
  __webpack_modules__[moduleId](module, module.exports, __webpack_require__);

  // Return the exports of the module
  return module.exports;
}
```

在 webpack 中，存在着一个名为`__webpack_require__`的方法，当加载模块时，就会调用此方法，传入 moduleId（通常情况下是 path）。接着会在模块缓存对象中查找是否已经加载过此模块，如果已经加载过，则直接从缓存对象中返回；如果没加载过，则创建一个包含`exports`对象的对象`module`，将`module`、`module.export`以及`__webpack_require__`作为参数，调用`__webpack_modules__`中对应的模块方法，将原代码模块中的方法挂载到`module.exports`对象上，最终将`module.exports`对象返回

#### 3. 调用

```js
const { dateFormat, priceFormat } = __webpack_require__("./src/js/format.js");

console.log(dateFormat("abc"));
console.log(priceFormat("abc"));
```

调用`__webpack_require__`方法，得到对应的`module.exports`对象

### ES Module
