(function (window, document, undefined) {
  'use strict';

  window.controllers = window.controllers || {};
  window.controllers.post = window.controllers.post || {};

  controllers.post.index = function () { // Refactor?
    models.post.list(function (posts) {
      if (utilities.isLoggedIn()) {
        mainElement.innerHTML = views.post.indexLoggedIn(posts);
        var submitPostButton = document.getElementById("submit-post-button");
        submitPostButton.onclick = controllers.post.create;
      } else {
        mainElement.innerHTML = views.post.indexLoggedOut(posts);
        var signUpBanner = document.getElementById("sign-up-banner");
        signUpBanner.onclick = models.session.showSignUp;
      }

      utilities.makeLinkHandlers();
    });
  };

  controllers.post.create = function (event) {
    event.preventDefault();

    var post = {
      title: document.getElementById("title-field").value,
      content: document.getElementById("content-field").value
    }

    models.post.create(post, function (post) {
      controllers.post.index();
    });
  };

  controllers.post.show = function (postid) {
    models.post.read(postid, function (post, element) {
      mainElement.innerHTML = views.post.show(post);
      utilities.makeLinkHandlers();
    });
  };

  controllers.post.showEdit = function (postid) {
    var postElement = document.getElementById("post-" + postid);
    var post = {
      id: postid,
      title: postElement.getElementsByClassName("post-title")[0].innerHTML,
      content: postElement.getElementsByClassName("post-content")[0].innerHTML
    };

    postElement.innerHTML = views.post.edit(post);
  };

  controllers.post.edit = function () {

  }

  controllers.post.destroy = function (postid) {
    models.post.delete(postid, function () {
      utilities.flash("Post deleted");
      controllers.post.index();
    });
  };

  controllers.post.makePostLinkHandlers = function () {
    var postLinks = utilities.makeArray(document.getElementsByClassName("post-link"));

    postLinks.forEach(function (postLink) {
      postLink.onclick = function () {
        controllers.post.show(postLink.dataset.postid);
      };
    });
  };

  controllers.post.makePostEditButtonHandlers = function () {
    var postEditButtons = utilities.makeArray(document.getElementsByClassName("post-edit-button"));

    postEditButtons.forEach(function (postEditButton) {
      postEditButton.onclick = function () {
        controllers.post.showEdit(postEditButton.dataset.postid);
      };
    });
  };

  controllers.post.makeAddCommentButtonHandlers = function () {
    var addCommentButtons = utilities.makeArray(document.getElementsByClassName("add-comment-button"));

    addCommentButtons.forEach(function (addCommentButton) {
      addCommentButton.onclick = function () {
        controllers.post.show(addCommentButton.dataset.postid);
      };
    });
  };

  controllers.post.makePostDeleteButtonHandlers = function () {
    var postDeleteButtons = utilities.makeArray(document.getElementsByClassName("post-delete-button"));

    postDeleteButtons.forEach(function (postDeleteButton) {
      postDeleteButton.onclick = function () {
        controllers.post.destroy(postDeleteButton.dataset.postid);
      };
    });
  };
})(window, window.document);
