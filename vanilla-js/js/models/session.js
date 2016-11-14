(function (window, document, undefined) {
  window.models = window.models || {};
  window.models.session = window.models.session || {};

  models.session.create = function (event) {
    event.preventDefault();

    var username = document.getElementById("username-field").value;
    var password = document.getElementById("password-field").value;
    var url = baseURL + "session";
    var body = { user: { username: username, password: password } };
    var headers = { "Content-type": "application/json" };

    utilities.postRequest(url, body, headers, function (xhr) {
      var errors = document.getElementById("log-in-errors");

      if (xhr.readyState === 4 && xhr.status === 200) {
        models.session.logIn(JSON.parse(xhr.responseText));
        models.post.index();
      } else if (xhr.readyState === 4 && xhr.responseText) {
        utilities.renderErrors(xhr.responseText);
      }
    });
  };

  models.session.logIn = function (user) {
    localStorage.setItem('auth-email', user.email);
    localStorage.setItem('auth-token', user.auth_token);
    localStorage.setItem('username', user.username);
    localStorage.setItem('user-id', user.id);
    // seems like a bad idea, but the API should block any invalid admin-related requests
    localStorage.setItem('admin', user.admin);

    stuff.showLoggedInState();
  };

  models.session.destroy = function () {
    var url = baseURL + "session";
    var xhr = new XMLHttpRequest();

    xhr.open("delete", url)

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 204) {
        localStorage.removeItem("auth-email");
        localStorage.removeItem("auth-token");
        localStorage.removeItem("username");
        localStorage.removeItem("user-id");

        stuff.showLoggedOutState();
        models.post.index();
      } else if (xhr.readyState === 4 && xhr.responseText) {
        utilities.renderErrors(xhr.responseText);
      }
    };

    xhr.send(null);
  };
})(window, window.document);