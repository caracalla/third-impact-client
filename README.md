# third-impact client

A collection of clients for the third-impact API, a basic microblogging toy service with users, authentication, and other basic features.

Publicly viewable at http://caracal.la

### Clients:

* Vanilla - A single page app with custom templating, uses no jQuery or frameworks
* jQuery - A reimplementation of Vanilla with jQuery, using Mustache for templating
* Backbone - Planned
* React - Planned

The [API][api-repo] is running on [Heroku][heroku-api], and someday at [api.caracal.la][final-api]

TODOs:
* Implement title handling
* Implement a more secure session/authentication solution.  Currently, plain tokens are stored in the database on the server side and in localstorage on the client side.
  * Redis session store?
  * JSON web tokens?
* Set up non-Heroku server
* Set up SSL

[api-repo]: https://github.com/caracalla/third-impact-api
[heroku-api]: https://infinite-mesa-56815.herokuapp.com/
[final-api]: https://api.caracal.la/
