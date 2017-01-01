(function (window, document, undefined) {
  'use strict';

  window.models = window.models || {};
  window.models.post = window.models.post || {};

  models.post.create = function (post, callback) {
    var title = document.getElementById("title-field").value;
    var content = document.getElementById("content-field").value;
    var createPostURL = baseURL + "posts";
    var body = {
      post: {
        title: post.title,
        content: post.content,
        user_id: localStorage["user-id]"]
      }
    };
    var headers = {
      "Content-type": "application/json",
      "X-Auth-Email": localStorage["auth-email"],
      "X-Auth-Token": localStorage["auth-token"]
    };

    utilities.postRequest(createPostURL, body, headers, callback);
  };

  models.post.read = function (postid, callback) {
    var readPostURL = baseURL + "posts/" + postid;

    utilities.getRequest2(readPostURL, callback);
  };

  models.post.list = function (callback) {
    var listPostsURL = baseURL + "posts/";

    utilities.getRequest2(listPostsURL, callback);
  };

  models.post.update = function (post, callback) {
    var updatePostURL = baseURL + "posts/" + post.id;
    var body = {
      post: {
        title: post.title,
        content: post.content
      }
    };
    var headers = {
      "Content-type": "application/json",
      "X-Auth-Email": localStorage["auth-email"],
      "X-Auth-Token": localStorage["auth-token"]
    };

    utilities.putRequest(updatePostURL, body, headers, callback);
  };

  models.post.delete = function (postid, callback) {
    var deletePostURL = baseURL + "posts/" + postid;

    utilities.deleteRequest(deletePostURL, callback);
  };
})(window, window.document);
