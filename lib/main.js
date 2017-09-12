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
    if (xhr.status >= 200 && xhr.status < 300) {
      req_options.success(JSON.parse(xhr.response));
    }
    else if (xhr.status >= 400 && xhr.status < 500) {
      req_options.error(xhr.response);
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
