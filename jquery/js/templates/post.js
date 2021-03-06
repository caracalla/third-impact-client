(function($, window, document, undefined) {
  'use strict';

  app.templates.post = {
    show:
      '<div id="post-{{id}}" class="row post">'
    +   '<div class="col-lg-10 offset-lg-1">'
    +     '<div class="card">'
    +       '<h4 class="card-header">'
    +         '<a href="/post/{{post.id}}" class="post-link" data-postid="{{post.id}}">{{post.title}}</a>'
    +         '{{#delete}}'
    +         '<button type="button" class="close post-delete-button" data-postid="{{post.id}}">'
    +           '<span>&times;</span>'
    +         '</button>'
    +         '{{/delete}}'
    +       '</h4>'
    +       '<div class="card-block">'
    +         '<p class="card-text">{{post.content}}</p>'
    +       '</div>'
    +       '<div class="card-footer text-muted">'
    +         '<div class="row">'
    +           '<div class="col-sm-6">'
    +             '<p class="card-text small">'
    +               '<a href="/users/{{post.user_id}}" class="user-link" data-userid="{{post.user_id}}">{{post.user.username}}</a> - {{post.created_at}}'
    +             '</p>'
    +           '</div>'
    +           '<div class="col-sm-6">'
    +             '<div class="text-sm-right">'
    +               '{{#edit}}'
    +               '<a href="/posts/{{post.id}}/edit" class="tag tag-primary post-edit-button" data-postid="{{post.id}}">edit</a>'
    +               '{{/edit}}'
    +               '<a href="#" class="tag tag-primary post-comment-button" data-postid="{{post.id}}">add comment</a>'
    +             '</div>'
    +           '</div>'
    +         '</div>'
    +       '</div>'
    +     '</div>'
    +   '</div>'
    + '</div>',

    form:
      '<div class="row post-form">'
    +   '<div class="col-lg-10 offset-lg-1">'
    +     '<div class="card">'
    +       '<h4 class="card-header text-xs-center">New Post</h4>'
    +        '<div class="card-block">'
    +          '<form>'
    +            '<div class="form-group">'
    +              '<input type="text" class="form-control" id="title-field" placeholder="Title">'
    +            '</div>'
    +            '<div class="form-group">'
    +              '<textarea class="form-control" id="content-field" rows="3" placeholder="Content"></textarea>'
    +            '</div>'
    +            '<button type="submit" class="btn btn-primary" id="submit-post-button">Submit</button>'
    +          '</form>'
    +        '</div>'
    +     '</div>'
    +   '</div>'
    + '</div>',

    editForm:
      '<div id="post-{{post.id}}" class="row post">'
    +   '<div class="col-lg-10 offset-lg-1">'
    +     '<div class="card">'
    +       '<h4 class="card-header text-xs-center">Edit Post</h4>'
    +       '<div class="card-block">'
    +         '<form>'
    +           '<div class="form-group">'
    +             '<input type="text" class="form-control" id="title-field" value="{{post.title}}">'
    +           '</div>'
    +           '<div class="form-group">'
    +             '<textarea class="form-control" id="content-field" rows="3">{{post.content}}</textarea>'
    +           '</div>'
    +           '<input type="text" class="hidden-xs-up" id="id-field" value="{{post.id}}">'
    +           '<button type="submit" class="btn btn-primary" id="submit-post-button">Submit</button>'
    +         '</form>'
    +       '</div>'
    +     '</div>'
    +   '</div>'
    + '</div>'
  };
}(window.jQuery, window, document));
