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
