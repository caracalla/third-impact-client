(function (window, document, undefined) {
  'use strict';

  window.views = window.views || {}
  window.views.user = window.views.user || {}

  views.user.show = function (userResponse) {
    var user = {
      id: userResponse.id || "",
      username: userResponse.username || "",
      email: userResponse.email || "",
      admin: userResponse.admin || ""
    };

    var userHTML =
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
    +     '<div id="user-posts">'
    +     '</div>'
    +   '</div>'
    + '</div>';

    return userHTML;
  };

  views.user.index = function (users) {
    return users.map(function (user) {
      return '<div class="row">'
      +   '<div class="col-sm-6 offset-sm-3">'
      +     '<p class="lead">'
      +       '<a href="#" class="user-link" data-userid="' + user.id + '">'
      +          user.username
      +       '</a>'
      +     '</p>'
      +   '</div>'
      + '</div>';
    }).join("\n");
  };

  views.user.form = function () {
    var signUpFormHTML =
      '<div class="row">'
    +   '<div class="col-sm-6 offset-sm-3">'
    +     '<h3>Sign Up</h3>'
    +     '<form>'
    +       '<div class="form-group">'
    +         '<label for="username-field">Username</label>'
    +         '<input type="text" class="form-control" id="username-field">'
    +       '</div>'
    +       '<div class="form-group">'
    +         '<label for="email-field">Email</label>'
    +         '<input type="email" class="form-control" id="email-field">'
    +       '</div>'
    +       '<div class="form-group">'
    +         '<label for="password-field">Password</label>'
    +         '<input type="password" class="form-control" id="password-field">'
    +       '</div>'
    +       '<div class="form-group">'
    +         '<label for="confirm-password-field">Confirm Password</label>'
    +         '<input type="password" class="form-control" id="confirm-password-field">'
    +       '</div>'
    +       '<button type="submit" class="btn btn-primary" id="sign-up-button">Sign Up</button>'
    +     '</form>'
    +   '</div>'
    + '</div>';

    return signUpFormHTML;
  };
}(window, window.document));
