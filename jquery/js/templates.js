(function (window, document, undefined) {
  'use strict';

  window.Templates = {
    spinner:
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
    + '</div>',

    post:
        '<div class="row post">'
      +   '<div class="col-lg-8 offset-lg-2 card card-block">'
      +     '<h4 class="card-title">'
      +       '<a href="#" class="post-link" data-postid="{{id}}">'
      +         '{{title}}'
      +       '</a>'
      +     '</h4>'
      +     '<p class="card-text small">'
      +       'Author:'
      +       '<a href="#" class="user-link" data-userid="{{user_id}}">'
      +         '{{user.username}}'
      +       '</a>'
      +       ' - Posted at: {{created_at}}'
      +     '</p>'
      +     '<p class="card-text">'
      +       '{{content}}'
      +     '</p>'
      +   '</div>'
      + '</div>',

    loggedOutNavbar:
        '<button class="navbar-toggler hidden-sm-up" type="button" data-toggle="collapse" data-target="#navbar-header"></button>'
      + '<div class="collapse navbar-toggleable-xs" id="navbar-header">'
      +   '<a class="navbar-brand" id="brand-link" href="#">Third Impact</a>'
      +   '<ul class="nav navbar-nav">'
      +     '<li class="nav-item active">'
      +       '<a class="nav-link" id="home-link" href="#">Home</a>'
      +     '</li>'
      +     '<li class="nav-item float-sm-right">'
      +       '<a class="nav-link" id="sign-up-link" href="#">Sign Up</a>'
      +     '</li>'
      +     '<li class="nav-item float-sm-right hidden-xs-down">'
      +       '<span class="navbar-text">|</span>'
      +     '</li>'
      +     '<li class="nav-item float-sm-right">'
      +       '<a class="nav-link" id="log-in-link" href="#">Log In</a>'
      +     '</li>'
      +   '</ul>'
      + '</div>'
  }
})(window, window.document);