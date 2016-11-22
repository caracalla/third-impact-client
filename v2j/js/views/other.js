(function (window, document, undefined) {
  window.views = window.views || {}

  views.error = function (errorText) {
    var errorHTML =
      '<div class="alert alert-danger" role="alert">'
    +    errorText
    + '</div>';

    return errorHTML;
  };

  views.flash = function (message) {
    var flashHTML =
      '<div class="alert alert-success" role="alert">'
    +    message
    + '</div>';

    return flashHTML;
  };

  views.spinner = function () {
    // from http://tobiasahlin.com/spinkit/
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
  };

  views.loggedOutNavbar = function () {
    var navbarHTML =
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
    + '</div>';

    return navbarHTML;
  };

  views.loggedInNavbar = function (username) {
    var navbarHTML =
      '<button class="navbar-toggler hidden-sm-up" type="button" data-toggle="collapse" data-target="#navbar-header"></button>'
    + '<div class="collapse navbar-toggleable-xs" id="navbar-header">'
    +   '<a class="navbar-brand" id="brand-link" href="#">Third Impact</a>'
    +   '<ul class="nav navbar-nav">'
    +     '<li class="nav-item active">'
    +       '<a class="nav-link" id="home-link" href="#">Home</a>'
    +     '</li>'
    +     '<li class="nav-item active">'
    +       '<a class="nav-link" id="users-link" href="#">Users</a>'
    +     '</li>'
    +     '<li class="nav-item float-sm-right">'
    +       '<a class="nav-link" id="log-out-link" href="#">Log Out</a>'
    +     '</li>'
    +     '<li class="nav-item float-sm-right hidden-xs-down">'
    +       '<span class="navbar-text">|</span>'
    +     '</li>'
    +     '<li class="nav-item float-sm-right">'
    +       '<a class="nav-link" id="username-link" href="#">'
    +          username
    +       '</a>'
    +     '</li>'
    +   '</ul>'
    + '</div>';

    return navbarHTML;
  };
}(window, window.document));
