(function($, window, document, undefined) {
  'use strict';

  app.templates.navbar = {
    loggedOut:
      '<button class="navbar-toggler hidden-sm-up" type="button" data-toggle="collapse" data-target="#navbar-header"></button>'
    + '<div class="collapse navbar-toggleable-xs" id="navbar-header">'
    +   '<a href="/" class="navbar-brand" id="brand-link">Third Impact</a>'
    +   '<ul class="nav navbar-nav">'
    +     '<li class="nav-item active">'
    +       '<a href="/" class="nav-link" id="home-link">Home</a>'
    +     '</li>'
    +     '<li class="nav-item float-sm-right">'
    +       '<a href="/sign-up" class="nav-link" id="sign-up-link">Sign Up</a>'
    +     '</li>'
    +     '<li class="nav-item float-sm-right hidden-xs-down">'
    +       '<span class="navbar-text">|</span>'
    +     '</li>'
    +     '<li class="nav-item float-sm-right">'
    +       '<a href="/log-in" class="nav-link" id="log-in-link">Log In</a>'
    +     '</li>'
    +   '</ul>'
    + '</div>',

    loggedIn:
      '<button class="navbar-toggler hidden-sm-up" type="button" data-toggle="collapse" data-target="#navbar-header"></button>'
     + '<div class="collapse navbar-toggleable-xs" id="navbar-header">'
     +   '<a class="navbar-brand" id="brand-link" href="/">Third Impact</a>'
     +   '<ul class="nav navbar-nav">'
     +     '<li class="nav-item active">'
     +       '<a href="/" class="nav-link" id="home-link">Home</a>'
     +     '</li>'
     +     '<li class="nav-item active">'
     +       '<a href="/users" class="nav-link" id="users-link">Users</a>'
     +     '</li>'
     +     '<li class="nav-item float-sm-right">'
     +       '<a href="/log-out" class="nav-link" id="log-out-link">Log Out</a>'
     +     '</li>'
     +     '<li class="nav-item float-sm-right hidden-xs-down">'
     +       '<span class="navbar-text">|</span>'
     +     '</li>'
     +     '<li class="nav-item float-sm-right">'
     +       '<a href="/user/{{id}}" class="nav-link" id="username-link">{{username}}</a>'
     +     '</li>'
     +   '</ul>'
     + '</div>'
   };
}(window.jQuery, window, document));
