(function (window, document, undefined) {
  window.templates = window.templates || {}

  window.templates.post = function (postResponse) {
    var post = {
      id: postResponse.id || "",
      title: postResponse.title || "",
      content: postResponse.content || "",
      author_id: postResponse.user_id || "",
      author_username: postResponse.user.username || "",
      created_at: postResponse.created_at || "",
      updated_at: postResponse.updated_at || ""
    };

    var output =
      '<div class="row">'
    +   '<div class="col-md-12 card card-block">'
    +     '<h4 class="card-title">'
    +       post.title
    +     '</h4>'
    +     '<p class="card-text small">'
    +       "Author: "
    +       '<a href="#" class="user-link" data-userid="' + post.author_id + '">'
    +          post.author_username
    +       '</a>'
    +       ' - Posted at: ' + post.created_at
    +     '</p>'
    +     '<p class="card-text">'
    +       post.content
    +     '</p>'
    +   '</div>'
    + '</div>';

    return output;
  };

  window.templates.user = function (userResponse) {
    var user = {
      id: userResponse.id || "",
      username: userResponse.username || "",
      email: userResponse.email || "",
      admin: userResponse.admin || ""
    };

    var output =
      '<div class="row">'
    +   '<div class="col-sm-4">'
    +     '<p class="lead">'
    +        user.username
    +     '</p>'
    +     '<p class="small">'
    +        user.email
    +     '</p>'
    +   '</div>'
    +   '<div class="col-sm-8">'
    +     '<p id="user-posts">'
    +     '</p>'
    +   '</div>'
    + '</div>';

    return output;
  };

  window.templates.spinner = function () {
    var spinnerHTML =
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
    + '</div>';

    return spinnerHTML;
  }
}(window, window.document));
