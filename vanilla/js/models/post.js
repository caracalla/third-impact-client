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
      } else {
        element.innerHTML = views.post.indexLoggedOut(posts);
        var signUpBanner = document.getElementById("sign-up-banner");
        signUpBanner.onclick = models.session.showSignUp;
      }

      utilities.makeLinkHandlers();
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

      utilities.makeLinkHandlers();
    });
  };

  models.post.edit = function (postid) {
    var postElement = document.getElementById("post-" + postid);
    var post = {
      id: postid,
      title: postElement.getElementsByClassName("post-title")[0].innerHTML,
      content: postElement.getElementsByClassName("post-content")[0].innerHTML
    };

    postElement.innerHTML = views.post.edit(post);
  };

  models.post.destroy = function (postid) {
    var destroyPostURL = baseURL + "posts/" + postid;

    utilities.deleteRequest(destroyPostURL, function () {
      utilities.flash("Post deleted");
      models.post.index();
    });
  };

  models.post.makePostLinkHandlers = function () {
    var postLinks = utilities.makeArray(document.getElementsByClassName("post-link"));

    postLinks.forEach(function (postLink) {
      postLink.onclick = function () {
        models.post.show(postLink.dataset.postid);
      };
    });
  };

  models.post.makePostEditButtonHandlers = function () {
    var postEditButtons = utilities.makeArray(document.getElementsByClassName("post-edit-button"));

    postEditButtons.forEach(function (postEditButton) {
      postEditButton.onclick = function () {
        models.post.edit(postEditButton.dataset.postid);
      };
    });
  };

  models.post.makeAddCommentButtonHandlers = function () {
    var addCommentButtons = utilities.makeArray(document.getElementsByClassName("add-comment-button"));

    addCommentButtons.forEach(function (addCommentButton) {
      addCommentButton.onclick = function () {
        models.post.show(addCommentButton.dataset.postid);
      };
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
