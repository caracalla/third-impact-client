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
      models.post.index();
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
        models.post.index();
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

    var logInButton = document.getElementById("log-in-button");

    logInButton.onclick = models.session.create;
  };

  models.session.showSignUp = function () {
    mainElement.innerHTML = views.user.form();

    var signUpButton = document.getElementById("sign-up-button");

    signUpButton.onclick = models.user.create;
  };

  models.session.showLoggedInState = function () {
    var navbar = document.getElementById("navbar");
    navbar.innerHTML = views.loggedInNavbar(localStorage["username"]);

    var brandLink = document.getElementById("brand-link");
    var homeLink = document.getElementById("home-link");
    var usersLink = document.getElementById("users-link");
    var usernameLink = document.getElementById("username-link");
    var logOutLink = document.getElementById("log-out-link");

    brandLink.onclick = models.post.index;
    homeLink.onclick = models.post.index;
    usersLink.onclick = models.user.index;

    usernameLink.onclick = function (event) {
      models.user.show(localStorage["user-id"])
    };

    logOutLink.onclick = function (event){
      models.session.destroy();
    };
  };

  models.session.showLoggedOutState = function () {
    var navbar = document.getElementById("navbar");
    navbar.innerHTML = views.loggedOutNavbar();

    var brandLink = document.getElementById("brand-link");
    var homeLink = document.getElementById("home-link");
    var usersLink = document.getElementById("users-link");
    var logInLink = document.getElementById("log-in-link");
    var signUpLink = document.getElementById("sign-up-link");

    brandLink.onclick = models.post.index;
    homeLink.onclick = models.post.index;
    logInLink.onclick = models.session.showLogIn;
    signUpLink.onclick = models.session.showSignUp;
  };
})(window, window.document);