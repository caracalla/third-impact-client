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
    };

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
    models.post.read(postid, function (post, element) {
      mainElement.innerHTML = views.post.edit(post);
      utilities.makeLinkHandlers();

      var submitPostButton = document.getElementById("submit-post-button");
      submitPostButton.onclick = controllers.post.edit;
    });
  };

  controllers.post.edit = function () {
    var post = {
      id: document.getElementById("id-field").value,
      title: document.getElementById("title-field").value,
      content: document.getElementById("content-field").value
    };

    models.post.update(post, function () {
      utilities.flash("Post updated");
      controllers.post.show(post.id);
    });
  };

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
