(function ($, window, document, undefined) {
  'use strict';

  app.utils = {
    isLoggedIn: function () {
      if (localStorage["auth-email"] &&
          localStorage["auth-token"] &&
          localStorage["username"] &&
          localStorage["user-id"]) {
        return true;
      } else {
        return false;
      }
    },

    makeArray: function (HTMLCollectionObject) {
      // convert HTMLCollection object to Array
      return Array.prototype.slice.call(HTMLCollectionObject);
    }
  };

  window.utilities = {}

  utilities.getRequest = function (url, element, successCallback) {
    element.innerHTML = views.spinner();

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.open("get", url);

    // Always authenticate requests for logged in users, even if not necessary.
    // This way, we can log out users with invalid credentials as quickly as possible.
    if (utilities.isLoggedIn()) {
      xhr.setRequestHeader("X-Auth-Email", localStorage["auth-email"]);
      xhr.setRequestHeader("X-Auth-Token", localStorage["auth-token"]);
    }

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          document.getElementById("errors").innerHTML = "";
          successCallback(JSON.parse(xhr.responseText), element);

          if (utilities.isLoggedIn()) {
            models.session.showLoggedInState();
          } else {
            models.session.showLoggedOutState();
          }
        } else {
          utilities.handleFailedRequest(xhr);
        }
      }
    };

    xhr.send(null);
  };

  utilities.handleFailedRequest = function (xhr) {
    if (xhr.status === 401) {
      models.session.logOut();

      models.session.showLoggedOutState();
      models.session.showLogIn();
      utilities.renderErrors(xhr.responseText)
    } else if (xhr.status == 500) {
      utilities.renderErrors('{"errors": {"500": "Internal Server Error"}}')
    } else if (xhr.responseText && xhr.responseText !== " ") {
      console.log("the response text is: [" + xhr.responseText + "]");
      utilities.renderErrors(xhr.responseText)
    }
  };

  utilities.renderErrors = function (errorsText) {
    var errors = JSON.parse(errorsText).errors;
    var errorsElement = document.getElementById("errors");

    Object.keys(errors).forEach(function (key) {
      var errorText = key + " " + errors[key];
      var errorElement = document.createElement("div")

      errorElement.innerHTML = views.error(errorText);
      errorsElement.appendChild(errorElement)

      setTimeout(function () {
        try {
          errorsElement.removeChild(errorElement);
        } catch (error) {
          // do nothing
        }
      }, 5000);
    });
  };

  utilities.flash = function (message) {
    var flashElement = document.getElementById("flash");
    var newElement = document.createElement("div");

    newElement.innerHTML = views.flash(message);
    flashElement.appendChild(newElement);

    setTimeout(function () {
      try {
        flashElement.removeChild(newElement);
      } catch (error) {
        // do nothing
      }
    }, 5000);
  };
})(window.jQuery, window, window.document);
