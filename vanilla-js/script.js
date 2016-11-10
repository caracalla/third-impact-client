(function (window, document, undefined) {
  var button = document.getElementById("getPostsButton");
  var output = document.getElementById("output");

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
          getUser(userLink.dataset.userid)
        };
      }(userLinks[i]));
    }
  };

  var getPosts = function (event) {
    var xhr = new XMLHttpRequest();
    xhr.open("get", "http://localhost:3000/posts")

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        output.innerHTML = processPosts(JSON.parse(xhr.responseText));
        makeUserLinkHandlers();
      } else {
        output.innerHTML = "Error: " + xhr.status.toString();
      }
    }

    xhr.send(null);
  };

  var getUser = function (userid) {
    var xhr = new XMLHttpRequest();
    xhr.open("get", "http://localhost:3000/users/" + userid)

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        output.innerHTML = window.templates.user(JSON.parse(xhr.responseText));
      } else {
        output.innerHTML = "Error: " + xhr.status.toString();
      }
    }

    xhr.send(null);
  };

  button.addEventListener("click", getPosts);
})(window, window.document);


// "id":1,
// "content":"this is my first post",
// "title":"first!",
// "user_id":1,
// "created_at":"2016-10-23T17:52:44.224Z",
// "updated_at":"2016-10-23T17:52:44.224Z"