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
end

helpers HelperMethods