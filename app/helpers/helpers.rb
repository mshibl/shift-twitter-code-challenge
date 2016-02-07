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

	def logged_in(id,token)
		user = User.find(id)
		user.token == token
	end

  def get_user_suggestions(id,count)
    user = User.find(id)
    start = 1
    finish = count
    results = []
    until results.count >= count do
      candidates = User.where(id: (start..finish))
      results << candidates.select{|candidate| (user.friends.include?(candidate) == false) && (candidate != user)}
      results.flatten!
      start = finish + 1
      finish = start + count
    end
    return results
  end
end

helpers HelperMethods