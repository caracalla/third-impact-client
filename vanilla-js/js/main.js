(function (window, document, undefined) {
  'use strict';

  window.baseURL = "http://api.caracal.la/";
  window.mainElement = document.getElementById("main");

  window.addEventListener("load", models.post.index);
})(window, window.document);
