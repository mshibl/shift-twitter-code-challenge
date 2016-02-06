require 'json'

after do
  logger.info "clearing active connection for this thread"
  ActiveRecord::Base.connection.close
end

# single view and route that you will layer angular on top of
get '/' do
  erb :index
end

# User Login
  post '/login' do
    credentials = JSON.parse(request.body.read)
    user = User.find_by_email(credentials['email'].downcase)
    if !user.nil? && user.password == credentials['password']
      user.token = Faker::Internet.password
      user.save
      response = {followers_count: user.followers.count, friends_count: user.friends.count, first_name: user.first_name, last_name: user.last_name, user_id: user.id, token: user.token}
      content_type :json
      response.to_json
    else
      puts 'something went wrong, user failed to sign in'
      status 401
      body 'Either email or password incorrect'
    end
  end

# Create new user account
  post '/users' do
    credentials = JSON.parse(request.body.read)
    user = User.new(first_name: credentials['firstName'], last_name: credentials['lastName'], email: credentials['email'], image: generate_image())
    user.password = credentials['password']
    user.token = Faker::Internet.password
    if user.save
      response = {user_id: user.id, token: user.token}
      content_type :json
      response.to_json
    else
      puts "something went wrong, failed to create new account"
      error = user.errors.full_messages[0]
      status 409
      body error
    end  
  end

# Logout
  delete '/users/:id/logout' do
    User.find(params[:id].to_i).update(token: '')
  end

get '/users' do
  users = User.all
  content_type :json
  users.to_json
end

get '/users/:id/search/:count' do
  user = User.find(params[:id].to_i)
  count = params[:count].to_i
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
  content_type :json
  results.to_json
end

get '/users/:id' do
  user = User.find(params[:id].to_i)
  if !!user.logged_in(params['requesterId'],params['token'])
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
  else  
    status 401
  end
end

get '/users/:id/tweets' do
  user = User.find(params[:id].to_i)
  tweets = user.tweets
  content_type :json
  tweets.to_json
end    

post '/users/:id/tweets' do
  tweet = JSON.parse(request.body.read)
  new_tweet = Tweet.new(user_id: params[:id].to_i, text: tweet['text'])
  if new_tweet.save
    puts 'new tweet added'
    content_type :json
    new_tweet.to_json
  else
    400
  end
end

post '/users/:id/follow' do
  friend_id = JSON.parse(request.body.read)
  relationship = Relationship.new(friend_id: friend_id['friendId'], follower_id: params[:id].to_i)
  if relationship.save
    puts "relationship created"
  else
    puts "something went wrong"
  end 
end
