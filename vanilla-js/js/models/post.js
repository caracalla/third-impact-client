(function (window, document, undefined) {
  window.models = window.models || {};
  window.models.post = window.models.post || {};

  models.post.index = function () {
    var postsURL = baseURL + "posts";

    utilities.getRequest(postsURL, mainElement, function (element, posts) {
      if (utilities.isLoggedIn()) {
        element.innerHTML = views.post.indexLoggedIn(posts);
        var submitPostButton = document.getElementById("submit-post-button");
        submitPostButton.onclick = models.post.create;
      } else {
        element.innerHTML = views.post.indexLoggedOut(posts);
        var signUpBanner = document.getElementById("sign-up-banner");
        signUpBanner.onclick = stuff.showSignUp;
      }

      utilities.makeUserLinkHandlers();
    });
  };

  models.post.create = function (event) {
    event.preventDefault();

    var title = document.getElementById("title-field").value;
    var content = document.getElementById("content-field").value;
    var url = baseURL + "posts";
    var body = { post: { title: title, content: content, user_id: localStorage["user-id]"]} };
    var headers = {
      "Content-type": "application/json",
      "X-Auth-Email": localStorage["auth-email"],
      "X-Auth-Token": localStorage["auth-token"]
    };

    utilities.postRequest(url, body, headers, function (xhr) {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // why does a 500 go here?
        // add post to top of posts, don't just get posts
        post = JSON.parse(xhr.responseText)

        models.post.index();
      } else if (xhr.readyState === 4 && xhr.responseText) {
        utilities.renderErrors(xhr.responseText);
      }
    });
  };

  models.post.show = function (postid) {
    var postURL = baseURL + "posts/" + postid;

    utilities.getRequest(postURL, mainElement, function (element, post) {
      // if (utilities.isLoggedIn()) {
        element.innerHTML = views.post.show(post);
      // } else {
      //   element.innerHTML = templates.loggedOutPostWithComments(post);
      //   var signUpBanner = document.getElementById("sign-up-banner");
      //   signUpBanner.onclick = stuff.showSignUp;
      // }

      utilities.makeUserLinkHandlers();
    });
  };
})(window, window.document);