require 'json'

# Run before to test user credentials
before '/users/*' do
    begin
      user = User.find(params['id'])
      redirect to('/login') if !logged_in(params['id'],params['token'])
    rescue
      redirect to('/login')
    end
end

after do
  logger.info "clearing active connection for this thread"
  ActiveRecord::Base.connection.close
end

get '/' do
  erb :index
end

# Create new user account
post '/users' do
  credentials = JSON.parse(request.body.read)
  user = User.new(first_name: credentials['firstName'], last_name: credentials['lastName'], email: credentials['email'], image: generate_image())
  user.password = credentials['password']
  user.token = Faker::Internet.password
  if user.save
    content_type :json
    user.to_json(except: [:password_hash, :created_at, :updated_at], include: [:followers,:friends])
  else
    puts "something went wrong, failed to create new account"
    error = user.errors.full_messages[0]
    status 409
    body error
  end  
end

# Get user data
get '/users/:id' do
  user = User.find(params[:id].to_i)
  content_type :json
  user.to_json(except: [:token, :password_hash, :created_at, :updated_at], include: [:followers,:friends])
end

# get '/users' do
#   users = User.all
#   content_type :json
#   users.to_json
# end

# Get user follow suggestions
get '/users/:id/search/:count' do
  results = get_user_suggestions(params[:id].to_i,params[:count].to_i)
  content_type :json
  results.to_json 
end

# Get user tweets
get '/users/:id/tweets' do
  user = User.find(params[:id].to_i)
  tweets = user.tweets
  content_type :json
  tweets.to_json
end    

# Post a tweet
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

# Follow a new user
post '/users/:id/follow' do
  friend_id = JSON.parse(request.body.read)['friendId'].to_i
  relationship = Relationship.new(friend_id: friend_id, follower_id: params[:id].to_i)
  user = User.find(friend_id)
  if relationship.save
    puts "relationship created"
    content_type :json
    user.to_json
  else
    puts "something went wrong"
  end 
end
