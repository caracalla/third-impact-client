(function (window, document, undefined) {
  'use strict';

  window.views = window.views || {}
  window.views.session = window.views.session || {}

  views.session.create = function () {
    var logInFormHTML =
      '<div class="row">'
    +   '<div class="col-sm-6 offset-sm-3">'
    +     '<h3>Log In</h3>'
    +     '<hr>'
    +     '<div id="log-in-errors"></div>'
    +     '<form>'
    +       '<div class="form-group">'
    +         '<label for="username-field">Username</label>'
    +         '<input type="text" class="form-control" id="username-field">'
    +       '</div>'
    +       '<div class="form-group">'
    +         '<label for="password-field">Password</label>'
    +         '<input type="password" class="form-control" id="password-field">'
    +       '</div>'
    +       '<button type="submit" class="btn btn-primary" id="log-in-button">Log In</button>'
    +     '</form>'
    +   '</div>'
    + '</div>';

    return logInFormHTML;
  };
}(window, window.document));
