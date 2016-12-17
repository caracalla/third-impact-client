(function (window, document, undefined) {
  'use strict';

  window.models = window.models || {};
  window.models.post = window.models.post || {};

  models.post.index = function () {
    var postsURL = baseURL + "posts";

    utilities.getRequest(postsURL, mainElement, function (posts, element) {
      if (utilities.isLoggedIn()) {
        element.innerHTML = views.post.indexLoggedIn(posts);
        var submitPostButton = document.getElementById("submit-post-button");
        submitPostButton.onclick = models.post.create;

        models.post.makePostDeleteButtonHandlers();
      } else {
        element.innerHTML = views.post.indexLoggedOut(posts);
        var signUpBanner = document.getElementById("sign-up-banner");
        signUpBanner.onclick = models.session.showSignUp;
      }

      models.user.makeUserLinkHandlers();
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

    utilities.postRequest(url, body, headers, function (post) {
      models.post.index();
    });
  };

  models.post.show = function (postid) {
    var postURL = baseURL + "posts/" + postid;

    utilities.getRequest(postURL, mainElement, function (post, element) {
      // if (utilities.isLoggedIn()) {
        element.innerHTML = views.post.show(post);
      // } else {
      //   element.innerHTML = templates.loggedOutPostWithComments(post);
      //   var signUpBanner = document.getElementById("sign-up-banner");
      //   signUpBanner.onclick = models.session.showSignUp;
      // }

      models.user.makeUserLinkHandlers();
    });
  };

  models.post.destroy = function (postid) {
    var destroyPostURL = baseURL + "posts/" + postid;

    utilities.deleteRequest(destroyPostURL, function () {
      utilities.flash("Post deleted");
      models.post.index();
    });
  };

  models.post.makePostDeleteButtonHandlers = function () {
    var postDeleteButtons = utilities.makeArray(document.getElementsByClassName("post-delete-button"));

    postDeleteButtons.forEach(function (postDeleteButton) {
      postDeleteButton.onclick = function () {
        models.post.destroy(postDeleteButton.dataset.postid);
      };
    });
  };
})(window, window.document);