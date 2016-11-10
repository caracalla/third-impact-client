require "httparty"

class User
  def initialize(username, password)
    @base_url = "http://localhost:3000/"
    @username = username
    @password = password

    @cookie = get_cookie_string(sign_in_response.headers)
  end

  def sign_in_response
    sign_in_url   = @base_url + "session"
    sign_in_body  = { user: { username: @username, password: @password } }

    response = HTTParty.post(sign_in_url, body: sign_in_body)

    if response.code != 200
      raise "couldn't sign in!"
    end

    response
  end

  def get_cookie_string(headers)
    cookies = HTTParty::CookieHash.new
    cookies.add_cookies(headers["set-cookie"]) unless headers["set-cookie"].nil?
    cookies.to_cookie_string
  end

  def headers
    headers = {}

    headers[:Cookie] = @cookie unless @cookie.empty?

    headers
  end

  ############################################################################
  # User actions
  ############################################################################

  def get_users
    HTTParty.get(url("users"), headers: headers)
  end

  def get_user(user_id)
    HTTParty.get(url("users/#{user_id}"), headers: headers)
  end

  ############################################################################
  # Post actions
  ############################################################################

  def get_posts
    HTTParty.get(url("posts"), headers: headers)
  end

  def get_post(post_id)
    HTTParty.get(url("posts/#{post_id}"), headers: headers)
  end

  def get_user_posts(user_id)
    HTTParty.get(url("users/#{user_id}/posts"), headers: headers)
  end

  def create_post(content, title:)
    post_info = { post: { content: content, title: title } }
    HTTParty.post(url("posts"), headers: headers, body: post_info)
  end

  ############################################################################
  # Comment actions
  ############################################################################

  def get_user_comments(user_id)
    HTTParty.get(url("users/#{user_id}/comments"), headers: headers)
  end

  def get_post_comments
    HTTParty.get(url("posts/#{post_id}/comments"), headers: headers)
  end

  def get_comment(comment_id)
    HTTParty.get(url("comments/#{comment_id}"), headers: headers)
  end

  def create_comment(content)
    comment_info = { comment: { content: content } }
    HTTParty.post(url("comments"), headers: headers, body: comment_info)
  end

  def url(path)
    @base_url + path
  end
end
