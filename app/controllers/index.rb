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

get '/users/:id' do
  user = User.find(params[:id])
  user_data = {
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    id: user.id,
    followers_count: user.followers.count,
    friends_count: user.friends.count
  }
  content_type :json
  user_data.to_json
end


get '/users/:id/tweets' do
  user = User.find(params[:id])
  tweets = user.tweets
  content_type :json
  tweets.to_json
end    

post '/users/:id/tweets' do
  tweet = JSON.parse(request.body.read)
  new_tweet = Tweet.new(user_id: params[:id], text: tweet['text'])
  if new_tweet.save
    puts 'new tweet added'
  else
    puts 'something went wrong'
  end
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
