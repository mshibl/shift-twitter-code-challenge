# single view and route that you will layer angular on top of
get '/' do
  erb :index
end

get '/users' do
  users = User.all
  content_type :json
  users.to_json
end

post '/users' do
  user = JSON.parse(request.body.read)
  User.create(first_name: user['first_name'], last_name: user['last_name'])
end
