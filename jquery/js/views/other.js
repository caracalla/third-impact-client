(function (window, document, undefined) {
  'use strict';

  window.views = window.views || {}

  views.error = function (errorText) {
    var errorHTML =
      '<div class="alert alert-danger" role="alert">'
    +    errorText
    + '</div>';

    return errorHTML;
  };

  views.flash = function (message) {
    var flashHTML =
      '<div class="alert alert-success" role="alert">'
    +    message
    + '</div>';

    return flashHTML;
  };

  views.spinner = function () {
    // from http://tobiasahlin.com/spinkit/
    var spinnerHTML =
      '<div class="sk-circle">'
    +   '<div class="sk-circle1 sk-child"></div>'
    +   '<div class="sk-circle2 sk-child"></div>'
    +   '<div class="sk-circle3 sk-child"></div>'
    +   '<div class="sk-circle4 sk-child"></div>'
    +   '<div class="sk-circle5 sk-child"></div>'
    +   '<div class="sk-circle6 sk-child"></div>'
    +   '<div class="sk-circle7 sk-child"></div>'
    +   '<div class="sk-circle8 sk-child"></div>'
    +   '<div class="sk-circle9 sk-child"></div>'
    +   '<div class="sk-circle10 sk-child"></div>'
    +   '<div class="sk-circle11 sk-child"></div>'
    +   '<div class="sk-circle12 sk-child"></div>'
    + '</div>';

    return spinnerHTML;
  };
}(window, window.document));
