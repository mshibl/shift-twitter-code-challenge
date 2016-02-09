# User Login
  post '/login' do
    credentials = JSON.parse(request.body.read)
    user = User.find_by_email(credentials['email'].downcase)
    if !user.nil? && user.password == credentials['password']
      user.token = Faker::Internet.password
      user.save
      content_type :json
      user.to_json(except: [:password_hash, :created_at, :updated_at])
    else
      body 'Either email or password incorrect'
      status 401
    end
  end

# Create new user account
  post '/users' do
    user = create_new_account(request.body.read)
    if user.save
      content_type :json
      user.to_json(except: [:password_hash, :created_at, :updated_at])
    else
      error = user.errors.full_messages[0]
      status 409
      body error
    end  
  end

# Logout
  delete '/users/:id/logout' do
    User.find(params[:id].to_i).update(token: '')
  end