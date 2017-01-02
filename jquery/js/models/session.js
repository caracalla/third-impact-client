(function (window, document, undefined) {
  'use strict';

  window.models = window.models || {};
  window.models.session = window.models.session || {};

  models.session.create = function (event) {
    event.preventDefault();

    var username = document.getElementById("username-field").value;
    var password = document.getElementById("password-field").value;
    var url = baseURL + "session";
    var body = { user: { username: username, password: password } };
    var headers = { "Content-type": "application/json" };

    utilities.postRequest(url, body, headers, function (user) {
      models.session.logIn(user);
      controllers.post.index();
    });
  };

  models.session.logIn = function (user) {
    localStorage.setItem('auth-email', user.email);
    localStorage.setItem('auth-token', user.auth_token);
    localStorage.setItem('username', user.username);
    localStorage.setItem('user-id', user.id);
    // seems like a bad idea, but the API should block any invalid admin-related requests
    localStorage.setItem('admin', user.admin);

    models.session.showLoggedInState();
  };

  models.session.destroy = function () {
    var url = baseURL + "session";
    var xhr = new XMLHttpRequest();

    xhr.open("delete", url)

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 204) {
        models.session.logOut();
        controllers.post.index();
      } else if (xhr.readyState === 4 && xhr.responseText) {
        utilities.renderErrors(xhr.responseText);
      }
    };

    xhr.send(null);
  };

  models.session.logOut = function () {
    localStorage.removeItem("auth-email");
    localStorage.removeItem("auth-token");
    localStorage.removeItem("username");
    localStorage.removeItem("user-id");
    localStorage.removeItem("admin");

    models.session.showLoggedOutState();
  };

  models.session.showLogIn = function () {
    mainElement.innerHTML = views.session.create();

    var usernameField = document.getElementById("username-field");
    var logInButton = document.getElementById("log-in-button");

    usernameField.focus();
    logInButton.onclick = models.session.create;
  };

  models.session.showSignUp = function () {
    mainElement.innerHTML = views.user.form();

    var usernameField = document.getElementById("username-field");
    var signUpButton = document.getElementById("sign-up-button");

    usernameField.focus();
    signUpButton.onclick = models.user.create;
  };

  models.session.showLoggedInState = function () {
    $("#navbar").html(Mustache.render(app.templates.loggedInNavbar, app.user()));

    $("#brand-link").on("click", controllers.post.index)
    $("#home-link").on("click", controllers.post.index);
    $("#users-link").on("click", models.user.index);

    $("#username-link").on("click", function (event) {
      models.user.show(localStorage["user-id"])
    });

    $("#log-out-link").on("click", function (event){
      models.session.destroy();
    });
  };

  models.session.showLoggedOutState = function () {
    $("#navbar").html(Mustache.render(app.templates.loggedOutNavbar));

    $("#brand-link").on("click", controllers.post.index)
    $("#home-link").on("click", controllers.post.index);
    $("#log-in-link").on("click", models.session.showLogIn);
    $("#sign-up-link").on("click", models.session.showSignUp);
  };
})(window, window.document);
