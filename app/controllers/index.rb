require 'json'

# Run before to test user credentials
before '/users/*' do
  user = User.find_by_id(params['id'])
  redirect to('/login') if !user || !logged_in?(user, params['token'])
end

after do
  logger.info "clearing active connection for this thread"
  ActiveRecord::Base.connection.close
end

get '/' do
  erb :index
end

#######################################

# Get user data
get '/users/:id' do
  response = get_user_data(params[:id])
  content_type :json
  response
end

# Get full detailed list of friends and followers
get '/users/:id/list' do
  user = User.find(params[:id].to_i)
  friends = user.friends.collect{|friend| {id: friend.id, first_name: friend.first_name, last_name: friend.last_name, image: friend.image, email: friend.email}}
  followers = user.followers.collect{|follower| {id: follower.id, first_name: follower.first_name, last_name: follower.last_name, image: follower.image, email: follower.email}}
  list = {friends_list: friends, followers_list: followers}
  content_type :json
  list.to_json
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
  tweets.to_json(:include => { :user => {only: [:id, :first_name, :last_name, :image] } })
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
  p 'we are here'
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
