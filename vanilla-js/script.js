(function (window, document, undefined) {
  var baseURL = "http://localhost:3000/"
  var mainElement = document.getElementById("main-element");
  var brandLink = document.getElementById("brand-link");
  var homeLink = document.getElementById("home-link");
  var usersLink = document.getElementById("users-link");
  var logInLink = document.getElementById("log-in-link");
  var signUpLink = document.getElementById("sign-up-link");

  var makeUserLinkHandlers = function () {
    var userLinks = document.getElementsByClassName("user-link");

    for (var i = 0; i < userLinks.length; i++) {
      userLinks[i].onclick = function (userLink) {
        return function (event) {
          getUser(userLink.dataset.userid);
        };
      }(userLinks[i]);
    }
  };

  var getRequest = function (url, element, func) {
    element.innerHTML = templates.spinner();

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.open("get", url);

    if (isLoggedIn()) {
      xhr.setRequestHeader("X-Auth-Email", localStorage["auth-email"]);
      xhr.setRequestHeader("X-Auth-Token", localStorage["auth-token"]);
    }

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        func(element, JSON.parse(xhr.responseText));

        if (isLoggedIn()) {
          showLoggedInState();
        }
      } else if (xhr.readyState === 4 && xhr.status === 401) {
        localStorage.removeItem("auth-email");
        localStorage.removeItem("auth-token");
        localStorage.removeItem("username");
        localStorage.removeItem("user-id");

        showLoggedOutState();
        getPosts();
      } else {
        element.innerHTML = "Error: " + xhr.status.toString();
      }
    };

    xhr.send(null);
  }

  // Posts

  var getPosts = function () {
    var postsURL = baseURL + "posts";

    getRequest(postsURL, mainElement, function (element, posts) {
      if (isLoggedIn()) {
        element.innerHTML = templates.postForm() + posts.map(templates.post).join("\n");
        var submitPostButton = document.getElementById("submit-post-button");
        submitPostButton.onclick = postPost;
      } else {
        element.innerHTML = posts.map(templates.post).join("\n");
      }

      makeUserLinkHandlers();
    });
  };

  var getUserPosts = function (userid) {
    var userPostsURL = baseURL + "users/" + userid + "/posts";
    var element = document.getElementById("user-posts")

    getRequest(userPostsURL, element, function (element, posts) {
      element.innerHTML = posts.map(templates.post).join("\n");
      makeUserLinkHandlers();
    });
  };

  // Users

  var getUsers = function () {
    var usersURL = baseURL + "users";

    getRequest(usersURL, mainElement, function(element, users) {
      element.innerHTML = templates.users(users)
      makeUserLinkHandlers();
    });
  };

  var getUser = function (userid) {
    var userURL = baseURL + "users/" + userid;

    getRequest(userURL, mainElement, function (element, user) {
      element.innerHTML = templates.user(user);
      getUserPosts(userid);
    });
  };

  var postSignUp = function (event) {
    event.preventDefault();

    var email = document.getElementById("email-field").value;
    var username = document.getElementById("username-field").value;
    var password = document.getElementById("password-field").value;
    var xhr = new XMLHttpRequest();
    var url = baseURL + "users";
    var body = { user: { email: email, username: username, password: password } };
    xhr.open("post", url)

    xhr.setRequestHeader("Content-type", "application/json");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // why does a 500 go here?
        logIn(JSON.parse(xhr.responseText));
        getPosts();
      } else if (xhr.responseText) {
        renderErrors(xhr.responseText);
      }
    };

    xhr.send(JSON.stringify(body));
  };

  var renderErrors = function (errorText) {
    errors = JSON.parse(errorText).errors;

    for (error in errors) { console.log(error) }
  };

  // Authentication

  var logIn = function (user) {
    localStorage.setItem('auth-email', user.email);
    localStorage.setItem('auth-token', user.auth_token);
    localStorage.setItem('username', user.username);
    localStorage.setItem('user-id', user.id);

    showLoggedInState();
  };

  var isLoggedIn = function () {
    if (localStorage["auth-email"] &&
        localStorage["auth-token"] &&
        localStorage["username"] &&
        localStorage["user-id"]) {
      return true;
    } else {
      return false;
    }
  };

  var showLogIn = function () {
    mainElement.innerHTML = templates.logInForm();

    var logInButton = document.getElementById("log-in-button");

    logInButton.onclick = postLogIn;
  };

  var showSignUp = function () {
    mainElement.innerHTML = templates.signUpForm();

    var signUpButton = document.getElementById("sign-up-button");

    signUpButton.onclick = postSignUp;
  };

  var showLoggedInState = function () {
    logInLink.innerHTML = localStorage["username"];
    logInLink.onclick = function (event){
      getUser(localStorage["user-id"]);
    };

    signUpLink.innerHTML = "Log Out";
    signUpLink.onclick = postLogOut;
  };

  var showLoggedOutState = function () {
    logInLink.innerHTML = "Log In";
    logInLink.onclick = showLogIn;

    signUpLink.innerHTML = "Sign Up";
    signUpLink.onclick = showSignUp;
  };

  var postLogIn = function (event) {
    event.preventDefault();

    var username = document.getElementById("username-field").value;
    var password = document.getElementById("password-field").value;
    var xhr = new XMLHttpRequest();
    var url = baseURL + "session";
    var body = { user: { username: username, password: password } };
    xhr.open("post", url)

    xhr.setRequestHeader("Content-type", "application/json");

    xhr.onreadystatechange = function () {
      var errors = document.getElementById("log-in-errors");

      if (xhr.readyState === 4 && xhr.status === 200) {
        logIn(JSON.parse(xhr.responseText));
        getPosts();
      } else if (xhr.responseText) {
        renderErrors(xhr.responseText);
      }
    };

    xhr.send(JSON.stringify(body));
  };

  var postLogOut = function () {
    var xhr = new XMLHttpRequest();
    var url = baseURL + "session";
    xhr.open("delete", url)

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 204) {
        localStorage.removeItem("auth-email");
        localStorage.removeItem("auth-token");
        localStorage.removeItem("username");
        localStorage.removeItem("user-id");

        showLoggedOutState();
        getPosts();
      } else if (xhr.responseText) {
        renderErrors(xhr.responseText);
      }
    };

    xhr.send(null);
  };

  window.addEventListener("load", getPosts);
  brandLink.onclick = getPosts;
  homeLink.onclick = getPosts;
  usersLink.onclick = getUsers;
  logInLink.onclick = showLogIn;
  signUpLink.onclick = showSignUp;
})(window, window.document);
