(function (window, document, undefined) {
  window.baseURL = "http://localhost:3000/";
  window.mainElement = document.getElementById("main-element");
  window.stuff = window.stuff || {};

  stuff.showLogIn = function () {
    mainElement.innerHTML = views.session.create();

    var logInButton = document.getElementById("log-in-button");

    logInButton.onclick = models.session.create;
  };

  stuff.showSignUp = function () {
    mainElement.innerHTML = views.user.form();

    var signUpButton = document.getElementById("sign-up-button");

    signUpButton.onclick = models.user.create;
  };

  stuff.showLoggedInState = function () {
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

  stuff.showLoggedOutState = function () {
    var navbar = document.getElementById("navbar");
    navbar.innerHTML = views.loggedOutNavbar();

    var brandLink = document.getElementById("brand-link");
    var homeLink = document.getElementById("home-link");
    var usersLink = document.getElementById("users-link");
    var logInLink = document.getElementById("log-in-link");
    var signUpLink = document.getElementById("sign-up-link");

    brandLink.onclick = models.post.index;
    homeLink.onclick = models.post.index;
    logInLink.onclick = stuff.showLogIn;
    signUpLink.onclick = stuff.showSignUp;
  };

  window.addEventListener("load", models.post.index);
})(window, window.document);
