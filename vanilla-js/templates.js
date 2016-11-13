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

    var postHTML =
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

    return postHTML;
  };

  window.templates.user = function (userResponse) {
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
    +     '<p id="user-posts">'
    +     '</p>'
    +   '</div>'
    + '</div>';

    return userHTML;
  };

  window.templates.users = function (users) {
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

  window.templates.signUpForm = function () {
    var signUpFormHTML =
      '<div class="row">'
    +   '<div class="col-sm-6 offset-sm-3">'
    +     '<h3>Log In</h3>'
    +     '<form>'
    +       '<div class="form-group">'
    +         '<label for="username-field">Username</label>'
    +         '<input type="text" class="form-control" id="username-field">'
    +       '</div>'
    +       '<div class="form-group">'
    +         '<label for="email-field">Email</label>'
    +         '<input type="text" class="form-control" id="email-field">'
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

  window.templates.logInForm = function () {
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

  window.templates.postForm = function () {
    var postFormHTML =
      '<div class="row">'
    +   '<div class="col-md-12 card card-block">'
    +   '<h4 class="card-title">New Post</h4>'
    +   '<form>'
    +     '<div class="form-group">'
    +       '<input type="text" class="form-control" id="title-field" placeholder="Title">'
    +     '</div>'
    +     '<div class="form-group">'
    +       '<textarea class="form-control" id="content-field" rows="3" placeholder="Content"></textarea>'
    +     '</div>'
    +     '<button type="submit" class="btn btn-primary" id="submit-post-button">Submit</button>'
    +   '</form>'
    +   '</div>'
    +   '</div>'
    + '</div>';

    return postFormHTML;
  };

  window.templates.spinner = function () {
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
  }
}(window, window.document));
