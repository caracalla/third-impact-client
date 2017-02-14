(function ($, window, document, undefined) {
  'use strict';

  window.api = {
    url: "http://api.caracal.la/",

    get: function (path, successCallback) {
      var params = {
        url: api.url + path,
        method: "get",
        beforeSend: api.setHeaders
      };

      $.ajax(params).done(successCallback).fail(api.onFailure);
    },

    post: function (path, data, successCallback) {
      var params = {
        url: api.url + path,
        method: "post",
        beforeSend: api.setHeaders,
        data: data
      };

      $.ajax(params).done(successCallback).fail(api.onFailure);
    },

    delete: function(path, successCallback) {
      var params = {
        url: api.url + path,
        method: "delete",
        beforeSend: api.setHeaders
      };

      $.ajax(params).done(successCallback).fail(api.onFailure);
    },

    setHeaders: function (xhr) {
      xhr.setRequestHeader("Accept", "application/json");

      // for post: "Content-type": "application/json"

      if (app.utils.isLoggedIn()) {
        xhr.setRequestHeader("X-Auth-Email", localStorage["auth-email"]);
        xhr.setRequestHeader("X-Auth-Token", localStorage["auth-token"]);
      }
    },

    onFailure: function (xhr) {
      if (xhr.status === 401) {
        // call log out method
        // navigate to log in page
      } else if (xhr.status === 404) {
        app.router("404");
      } else {
        console.log("the response text is: [" + xhr.responseText + "]");
        utilities.renderErrors(xhr.responseText)
      }
    }
  };
}(window.jQuery, window, document));
