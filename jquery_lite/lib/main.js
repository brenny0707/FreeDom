const DomNodeCollection = require('./dom_node_collection.js');
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

  // else if(arg instanceof HTMLElement) {
  //   elements = [HTMLElement];
  // }
  // debugger
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
    url: "http://google.com",
    data: {},
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    success: () => {},
    error: console.log
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
      // something else
      req_options.error(res);
    }
  };

  // xhr.onerror = req_options.error;
  xhr.send(req_options.data);

  // const success = xhr.response;
};

window.onload = function () {
  window.$l_callbacks.forEach (el => {
    let fn = window.$l_callbacks.shift();
    fn();
  });
};

//
//
// document.onreadystatechange = () => {
//   if (document.readyState === 'interactive') {
//
//   }
// };
