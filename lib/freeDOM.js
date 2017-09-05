/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class DomNodeCollection {
  constructor (HTMLElements) {
    this.elements = HTMLElements;
  }

  html (string) {
    if (string === undefined) {
      return this.elements[0].innerHTML;
    }
    else {
      this.elements.forEach(function(el) {
        el.innerHTML = string;
      });
    }
  }

  empty () {
    this.html('');
  }

  append (content) {
    this.elements.forEach ( el => {
      if (typeof content === "string") {
        el.innerHTML += content;
      } else if (content instanceof HTMLElement) {
        el.innerHTML += content.outerHTML;
      }
    });


  }


  attr (key, val) {
    if (val === undefined) {
      return this.elements[0].getAttribute(key);
    } else {
      this.elements[0].setAttribute(key, val);
    }
  }

  addClass (name) {
    this.elements.forEach( el => {
      el.classList.add(name);
    });
  }

  removeClass (name) {
    this.elements.forEach( el => {
      el.classList.remove(name);
    });
  }

  children () {
    let children_elements = [];
    this.elements.forEach( el => {
      let children = el.children;
      for (let i = 0; i < children.length; i++) {
        children_elements.push(children[i]);
      }
    });
    return new DomNodeCollection(children_elements);
  }

  parent () {
    let parent_elements = [];
    this.elements.forEach( el => {
      if ( !parent_elements.includes(el.parentElement)) {
        parent_elements.push(el.parentElement);
    }
    });
    return new DomNodeCollection(parent_elements);
  }

  find (selector) {
    let all_descendents = [];
    this.elements.forEach( el => {
      let descendents = el.querySelectorAll(selector);
      for (let i = 0; i < descendents.length; i++ ) {
        all_descendents.push(descendents[i]);
      }
    });
    return new DomNodeCollection(all_descendents);
  }

  remove () {
    this.elements.forEach ( el => {
      el.remove();
    });
    this.elements = [];
  }

  on (e, callback) {
    this.elements.forEach ( el => {
      el.addEventListener(e, callback);
      el.listener = el.listener || {};
      el.listener[e] = callback;
    });
  }

  off (e) {
    this.elements.forEach ( el => {
      el.removeEventListener(e, el.listener[e]);
      delete el.listener[e];
    });
  }

}







module.exports = DomNodeCollection;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const DomNodeCollection = __webpack_require__(0);
window.$l_callbacks = [ ];

window.$l = function (arg) {
  if (arg instanceof Function) {
    if (document.readyState === 'complete') {
      arg();
    }
    else {
      window.$l_callbacks.push(arg);
    }
    return;
  }
  let elements = arg;
  if (typeof arg === "string") {
    elements = Array.from(document.querySelectorAll(arg));
  }
  return new DomNodeCollection(elements);
};

$l.extend = function (initObj, ...pojos) {
  pojos.forEach( pojo => {
    for (let key in pojo) {
      initObj[key] = pojo[key];
    }
  });

  return initObj;
};

$l.ajax = function (options) {
  let defaults = {
    method: "GET",
    url: "",
    data: {},
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    success: () => {},
    error: () => {},
  };
  const req_options = defaults;
  $l.extend(req_options, options);

  const xhr = new XMLHttpRequest();
  xhr.open(req_options.method, req_options.url);

  xhr.onload = (res) => {
    if (xhr.status >= 200 && xhr.status < 300 && xhr.responseType === "json") {
      req_options.success(JSON.parse(res));
    }
    else if (xhr.status >= 400 && xhr.status < 500) {
      req_options.error(res);
    }
  };
  xhr.send(req_options.data);
};

window.onload = function () {
  window.$l_callbacks.forEach (el => {
    el();
  });
  window.$l_callbacks = [];
};


/***/ })
/******/ ]);