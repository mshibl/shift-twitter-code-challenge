require 'sinatra/base'
require "net/http"
require "uri"

module HelperMethods
  def generate_image()
  	uri = URI.parse("http://uifaces.com/api/v1/random")
  	response = Net::HTTP.get_response(uri)
  	image_urls = JSON.parse(response.body)
  	image = image_urls["image_urls"]["epic"]
    return image
  end

  def logged_in?(user, token)
    user.token == token
  end

  def get_user_suggestions(id,count)
    user = User.find(id)

    results = []
    User.find_each(batch_size: count) do |candidate|
      results << candidate unless user.friends.include?(candidate)
      break if results.length > count
    end

    results.map!{|candidate| {id: candidate.id, first_name: candidate.first_name, last_name: candidate.last_name, image: candidate.image}}
    return results
  end

  def get_user_data(id)
    user = User.find(id)
    user_data = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      followers_count: user.followers.count,
      friends_count: user.friends.count,
      image: user.image
    }
    user_data.to_json
  end

  def create_new_account(user_data)
    credentials = JSON.parse(user_data)
    user = User.new(first_name: credentials['firstName'], last_name: credentials['lastName'], email: credentials['email'], image: generate_image())
    user.password = credentials['password']
    user.token = Faker::Internet.password
    return user
  end
end

helpers HelperMethods
