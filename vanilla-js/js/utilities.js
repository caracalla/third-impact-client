(function (window, document, undefined) {
  window.utilities = window.utilities || {};

  utilities.getRequest = function (url, element, successCallback) {
    element.innerHTML = views.spinner();

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.open("get", url);

    if (utilities.isLoggedIn()) {
      xhr.setRequestHeader("X-Auth-Email", localStorage["auth-email"]);
      xhr.setRequestHeader("X-Auth-Token", localStorage["auth-token"]);
    }

    xhr.onreadystatechange = function () {
      utilities.responseHandler(xhr, element, successCallback);
    };

    xhr.send(null);
  };

  utilities.postRequest = function (url, body, headers, successCallback) {
    var xhr = new XMLHttpRequest();
    xhr.open("post", url)

    Object.keys(headers).forEach(function (field) {
      xhr.setRequestHeader(field, headers[field]);
    });

    xhr.onreadystatechange = function () {
      successCallback(xhr);
    }

    xhr.send(JSON.stringify(body));
  };

  utilities.responseHandler = function (xhr, element, successCallback) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        document.getElementById("errors").innerHTML = "";
        successCallback(element, JSON.parse(xhr.responseText));

        if (utilities.isLoggedIn()) {
          stuff.showLoggedInState();
        } else {
          stuff.showLoggedOutState();
        };
      } else if (xhr.status === 401) {
        localStorage.removeItem("auth-email");
        localStorage.removeItem("auth-token");
        localStorage.removeItem("username");
        localStorage.removeItem("user-id");

        stuff.showLoggedOutState();
        models.post.index();
      } else if (xhr.status == 500) {
        utilities.renderErrors('{"errors": {"500": "Internal Server Error"}}')
      } else if (xhr.responseText) {
        utilities.renderErrors(xhr.responseText)
      }
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

  utilities.makeUserLinkHandlers = function () {
    // convert HTMLCollection object to Array
    var userLinks = Array.prototype.slice.call(document.getElementsByClassName("user-link"));

    userLinks.forEach(function (userLink) {
      userLink.onclick = function () {
        models.user.show(userLink.dataset.userid);
      };
    });
  };

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
})(window, window.document);
