(function (window, document, $, undefined) {
  'use strict';

  $(document).ready(window.models.post.index);

  window.baseURL = "http://localhost:3000/";
  window.mainElement = document.getElementById("main");
})(window, window.document, window.jQuery);