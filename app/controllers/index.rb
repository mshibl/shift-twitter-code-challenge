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

#######################################

# Create new user account
post '/users' do
  user = create_new_account(request.body.read)
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
  response = get_user_data(params[:id])
  content_type :json
  response
end


# Get user follow suggestions
get '/users/:id/search' do
  min_suggestions = 5
  results = get_user_suggestions(params[:id].to_i,min_suggestions)
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
  id = JSON.parse(request.body.read)['id'].to_i
  relationship = Relationship.new(friend_id: id, follower_id: params[:id].to_i)
  user = User.find(id)
  if relationship.save
    puts "relationship created"
  else
    puts "something went wrong"
    400
  end 
end


# get '/users' do
#   users = User.all
#   content_type :json
#   users.to_json
# end
