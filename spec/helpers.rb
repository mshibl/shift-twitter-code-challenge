require 'sinatra/base'

module SpecHelpers
  def fake_new_user_data(options = {})
    new_user = {
      firstName: options[:first_name] || Faker::Name.first_name, 
      lastName: options[:last_name] || Faker::Name.last_name,  
      email: options[:email] || Faker::Internet.email, 
      password: options[:password] || Faker::Internet.password
    }
    while User.find_by_email(new_user[:email]) do
      new_user['password'] = Faker::Internet.password
    end
    new_user
  end

  def fake_user_account(password)
      new_user = fake_new_user_data({password: password})
      post '/users', new_user.to_json
      id = JSON.parse(last_response.body)["id"]
      user = User.find(id)
  end

  def valid_json?(json)
    begin
      JSON.parse(json)
      return true
    rescue JSON::ParserError => e
      return false
    end
  end
end