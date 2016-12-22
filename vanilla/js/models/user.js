(function (window, document, undefined) {
  'use strict';

  window.models = window.models || {};
  window.models.user = window.models.user || {};

  models.user.index = function () {
    var usersURL = baseURL + "users";

    utilities.getRequest(usersURL, mainElement, function(users, element) {
      element.innerHTML = views.user.index(users);
      models.user.makeUserLinkHandlers();
    });
  };

  models.user.create = function (event) {
    event.preventDefault();

    var email = document.getElementById("email-field").value;
    var username = document.getElementById("username-field").value;
    var password = document.getElementById("password-field").value;
    var url = baseURL + "users";
    var body = { user: { email: email, username: username, password: password } };
    var headers = { "Content-type": "application/json" };

    utilities.postRequest(url, body, headers, function (user) {
      // why does a 500 go here?
      models.session.logIn(user);
      controllers.post.index();
    });
  };

  models.user.show = function (userid) {
    var userURL = baseURL + "users/" + userid;

    utilities.getRequest(userURL, mainElement, function (user, element) {
      element.innerHTML = views.user.show(user);
      models.user.posts(userid);
    });
  };

  models.user.posts = function (userid) {
    var userPostsURL = baseURL + "users/" + userid + "/posts";
    var element = document.getElementById("user-posts")

    utilities.getRequest(userPostsURL, element, function (posts, element) {
      element.innerHTML = posts.map(views.post.show).join("\n");
      models.user.makeUserLinkHandlers();
    });
  };

  models.user.makeUserLinkHandlers = function () {
    var userLinks = utilities.makeArray(document.getElementsByClassName("user-link"));

    userLinks.forEach(function (userLink) {
      userLink.onclick = function () {
        models.user.show(userLink.dataset.userid);
      };
    });
  };
})(window, window.document);
