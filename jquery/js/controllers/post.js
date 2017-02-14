(function ($, window, document, undefined) {
  'use strict';

  app.controllers.post = {
    index: function () {
      app.models.post.list(app.views.post.index);
    },

    getAction: function (routeElements, params) {
      var postID = routeElements[0];

      app.controllers.post.show(postID);
    },

    show: function (postID) {
      app.models.post.read(postID, app.views.post.show);
    },

    onPostSubmit: function (event) {
      event.preventDefault();

      var post = {
        post: {
          title: $("#title-field").val(),
          content: $("#content-field").value(),
          user_id: localStorage["user-id]"]
        }
      };

      app.models.post.create(post, function(post) {
        // TODO: implement stuff to do here
      });
    }
  };

  window.controllers = window.controllers || {};
  window.controllers.post = window.controllers.post || {};

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

  controllers.post.showEdit = function (postid) {
    models.post.read(postid, function (post, element) {
      mainElement.innerHTML = Mustache.render(app.templates.post.editForm, post);
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
})(window.jQuery, window, window.document);
