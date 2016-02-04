# single view and route that you will layer angular on top of
get '/' do
  erb :index
end

post '/login' do
  credentials = JSON.parse(request.body.read)
  user = User.find_by_email(credentials['email'].downcase)
  if !user.nil? && user.password == credentials['password']
    puts user
    content_type :json
    user.to_json(except: :password_hash)
  else
    puts 'something went wrong'
    # redirect_to home_url
  end
end

get '/users' do
  users = User.all
  content_type :json
  users.to_json
end

post '/users' do
  user = JSON.parse(request.body.read)
  new_user = User.new(first_name: user['first_name'], last_name: user['last_name'], email: user['email'])
  new_user.password = user['password']
  if new_user.save
  	puts "user created"
  else
  	puts "something went wrong"
  end  
end
