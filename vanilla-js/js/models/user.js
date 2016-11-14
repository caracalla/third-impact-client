(function (window, document, undefined) {
  window.models = window.models || {};
  window.models.user = window.models.user || {};

  models.user.index = function () {
    var usersURL = baseURL + "users";

    utilities.getRequest(usersURL, mainElement, function(element, users) {
      element.innerHTML = views.user.index(users)
      utilities.makeUserLinkHandlers();
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

    utilities.postRequest(url, body, headers, function (xhr) {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // why does a 500 go here?
        models.session.logIn(JSON.parse(xhr.responseText));
        models.post.index();
      } else if (xhr.readyState === 4 && xhr.responseText) {
        utilities.renderErrors(xhr.responseText);
      }
    });
  };

  models.user.show = function (userid) {
    var userURL = baseURL + "users/" + userid;

    utilities.getRequest(userURL, mainElement, function (element, user) {
      element.innerHTML = views.user.show(user);
      models.user.posts(userid);
    });
  };

  models.user.posts = function (userid) {
    var userPostsURL = baseURL + "users/" + userid + "/posts";
    var element = document.getElementById("user-posts")

    utilities.getRequest(userPostsURL, element, function (element, posts) {
      element.innerHTML = posts.map(views.post.show).join("\n");
      utilities.makeUserLinkHandlers();
    });
  };
})(window, window.document);