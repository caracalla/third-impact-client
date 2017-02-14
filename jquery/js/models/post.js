(function ($, window, document, undefined) {
  'use strict';

  app.models.post = {
    create: function (post, callback) {
      api.post("posts", post, callback);
    },

    read: function (postID, callback) {
      api.get("posts/" + postID, callback);
    },

    list: function (callback) {
      api.get("posts/", callback);
    },

    update: function (post, callback) {
      api.put("posts/" + post.id, post, callback)
    },

    destroy: function (postID, callback) {
      api.delete("posts/" + postID, callback);
    }
  };
})(window.jQuery, window, window.document);
