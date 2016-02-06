# User Login
  post '/login' do
    credentials = JSON.parse(request.body.read)
    user = User.find_by_email(credentials['email'].downcase)
    if !user.nil? && user.password == credentials['password']
      user.token = Faker::Internet.password
      user.save
      followers_count = user.followers
      content_type :json
      user.to_json(except: [:password_hash, :created_at, :updated_at], include: [:followers,:friends])
    else
      puts 'something went wrong, user failed to sign in'
      status 401
      body 'Either email or password incorrect'
    end
  end

  # Logout
  delete '/users/:id/logout' do
    User.find(params[:id].to_i).update(token: '')
  end