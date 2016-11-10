(function (window, document, undefined) {
  var base_url = "http://localhost:3000/"
  var output = document.getElementById("output");
  var brandLink = document.getElementById("brand-link");
  var homeLink = document.getElementById("home-link");

  var processPosts = function (posts) {
    var output = [];

    for (var i = 0; i < posts.length; i++) {
      output[i] = templates.post(posts[i]);
    }

    return output.join("\n");
  };

  var makeUserLinkHandlers = function () {
    var userLinks = document.getElementsByClassName("user-link");

    for (var i = 0; i < userLinks.length; i++) {
      userLinks[i].addEventListener("click", function (userLink) {
        return function (event) {
          getUser(userLink.dataset.userid);
        };
      }(userLinks[i]));
    }
  };

  var getRequest = function (url, element, func) {
    element.innerHTML =
      '<div class="sk-circle">'
    +   '<div class="sk-circle1 sk-child"></div>'
    +   '<div class="sk-circle2 sk-child"></div>'
    +   '<div class="sk-circle3 sk-child"></div>'
    +   '<div class="sk-circle4 sk-child"></div>'
    +   '<div class="sk-circle5 sk-child"></div>'
    +   '<div class="sk-circle6 sk-child"></div>'
    +   '<div class="sk-circle7 sk-child"></div>'
    +   '<div class="sk-circle8 sk-child"></div>'
    +   '<div class="sk-circle9 sk-child"></div>'
    +   '<div class="sk-circle10 sk-child"></div>'
    +   '<div class="sk-circle11 sk-child"></div>'
    +   '<div class="sk-circle12 sk-child"></div>'
    + '</div>'

    var xhr = new XMLHttpRequest();
    xhr.open("get", url);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        func(element, JSON.parse(xhr.responseText));
      } else {
        element.innerHTML = "Error: " + xhr.status.toString();
      }
    };

    xhr.send(null);
  }

  var getPosts = function () {
    var posts_url = base_url + "posts";

    getRequest(posts_url, output, function (element, posts) {
      element.innerHTML = processPosts(posts);
      makeUserLinkHandlers();
    });
  };

  var getUser = function (userid) {
    var user_url = base_url + "users/" + userid;

    getRequest(user_url, output, function (element, user) {
      element.innerHTML = window.templates.user(user);
      getUserPosts(userid);
    });
  };

  var getUserPosts = function (userid) {
    var user_posts_url = base_url + "users/" + userid + "/posts";
    var element = document.getElementById("user-posts")

    getRequest(user_posts_url, element, function (element, posts) {
      element.innerHTML = processPosts(posts);
    });
  };

  window.addEventListener("load", getPosts);
  brandLink.addEventListener("click", getPosts);
  homeLink.addEventListener("click", getPosts);
})(window, window.document);
