(function ($, window, document, undefined) {
  'use strict';

  app.templates.user = {
    form:
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
    + '</div>',

    listItem:
      '<div class="row">'
    +   '<div class="col-sm-6 offset-sm-3">'
    +     '<p class="lead">'
    +       '<a href="/user/{{user.id}}" class="user-link" data-userid="{{user.id}}">'
    +          '{{user.username}}'
    +       '</a>'
    +     '</p>'
    +   '</div>'
    + '</div>',

    signUpBanner:
      '<div class="row">'
    +   '<div class="col-lg-10 offset-lg-1">'
    +     '<a href="sign-up" class="btn btn-success btn-lg btn-block" id="sign-up-banner">'
    +       'Sign up to start posting!'
    +     '</a>'
    +     '<hr>'
    +   '</div>'
    + '</div>'
  };
}(window.jQuery, window, window.document));
