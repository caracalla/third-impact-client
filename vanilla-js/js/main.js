(function (window, document, undefined) {
  'use strict';

  window.baseURL = "http://localhost:3000/";
  window.mainElement = document.getElementById("main");

  window.addEventListener("load", models.post.index);
})(window, window.document);
