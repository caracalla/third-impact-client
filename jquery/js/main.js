(function(yourcode) {
  yourcode(window.jQuery, window, document);
}(function($, window, document, undefined) {
  $(document).ready(function() {
   ThirdImpact.init();
  });

  var ThirdImpact = {
    settings: {
      baseURL: "http://local-impact.com:3000/",
      mainElement: $("#main"),
      navbarElement: $("#navbar")
    },

    init: function () {
      ThirdImpact.showNavbar();
      ThirdImpact.showPosts();
    },

    showPosts: function () {
      var url = ThirdImpact.settings.baseURL + "posts";
      $.getJSON(url, ThirdImpact.renderPosts);
    },

    renderPosts: function (posts) {
      ThirdImpact.settings.mainElement.append($.map(posts, ThirdImpact.postHTML).join(""));
    },

    postHTML: function (post) {
      var postTemplate =
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
      + '</div>';

      return Mustache.render(postTemplate, post);
    },

    showNavbar: function () {
      ThirdImpact.settings.navbarElement.append(ThirdImpact.renderNavbar());
    },

    renderNavbar: function () {
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
    }
  };
}));

