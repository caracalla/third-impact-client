(function (window, document, undefined) {
  window.utilities = window.utilities || {};

  utilities.getRequest = function (url, element, successCallback) {
    var headers = {
      "X-Auth-Email": localStorage["auth-email"],
      "X-Auth-Token": localStorage["auth-token"]
    };

    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'json',
      beforeSend: function (xhr) {
        element.innerHTML = views.spinner();

        // Always authenticate requests for logged in users, even if not necessary.  This way,
        // we can log out users with invalid credentials as quickly as possible.
        if (utilities.isLoggedIn()) {
          utilities.setHeaders(xhr, headers);
        }
      },
      success: function (data, status, xhr) {
        utilities.handleSuccess(data, successCallback, element);
      },
      error: utilities.handleError,
    });
  };

  utilities.handleSuccess = function (data, successCallback, element) {
    document.getElementById("errors").innerHTML = "";
    successCallback(data, element);

    if (utilities.isLoggedIn()) {
      models.session.showLoggedInState();
    } else {
      models.session.showLoggedOutState();
    }
  };

  utilities.handleError = function (xhr, status, error) {
    if (xhr.status === 401) {
      models.session.logOut();
      models.session.showLoggedOutState();
      models.session.showLogIn();
      utilities.renderErrors(xhr.responseText)
    } else if (xhr.status == 500) {
      utilities.renderErrors('{"errors": {"500": "Internal Server Error"}}')
    } else if (xhr.responseText && xhr.responseText !== " ") {
      // console.log("the response text is: [" + xhr.responseText + "]");
      utilities.renderErrors(xhr.responseText)
    }
  };

  utilities.setHeaders = function (xhr, headers) {
    $.each(headers, function(field, value) {
      xhr.setRequestHeader(field, value);
    });
  };

  utilities.postRequest = function (url, data, headers, successCallback) {
    $.ajax({
      url: url,
      type: 'POST',
      data: JSON.stringify(data),
      dataType: 'json',
      beforeSend: function (xhr) {
        utilities.setHeaders(xhr, headers);
      },
      success: function (data, status, xhr) {
        utilities.handleSuccess(data, successCallback);
      },
      error: utilities.handleError,
    });
  };

  utilities.deleteRequest = function (url, successCallback) {
    var xhr = new XMLHttpRequest();
    xhr.open("delete", url)

    xhr.setRequestHeader("X-Auth-Email", localStorage["auth-email"]);
    xhr.setRequestHeader("X-Auth-Token", localStorage["auth-token"]);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 204) {
          successCallback();
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
    var error = JSON.parse(errorsText);
    var errorsElement = document.getElementById("errors");

    if (error.errors) {
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
    } else {
      var errorText = error.error;
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
    }
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
  }

  utilities.isLoggedIn = function () {
    if (localStorage["auth-email"] &&
        localStorage["auth-token"] &&
        localStorage["username"] &&
        localStorage["user-id"]) {
      return true;
    } else {
      return false;
    }
  };

  utilities.makeArray = function (HTMLCollectionObject) {
    // convert HTMLCollection object to Array
    return Array.prototype.slice.call(HTMLCollectionObject);
  };
})(window, window.document);
