require File.expand_path '../spec_helper.rb', __FILE__
require_relative 'helpers.rb'

# Login Tests
	describe "login" do
		#Create new user to use for testing login
		before(:all) do 
			@user = fake_user_account(123456)
		end

		it "should log user in, and return proper user data" do
			post '/login', {email: @user.email, password: 123456}.to_json
			user_data = JSON.parse(last_response.body)
			expect(last_response).to be_ok
			expect(["id","email","first_name","last_name","image","token"].all? {|key| user_data.key? key}).to be_truthy
		end

		it "should return 401 status and proper error message, if failed to login" do
			post '/login', {email: @user.email, password: 000000}.to_json
			expect(last_response.status).to equal(401)
			expect(last_response.body).eql?('Either email or password incorrect')
		end
	end

# Create Account Tests
	describe "new account" do
		#Generate new user data to use for testing creating a new account
		before(:all) do
			@new_user = fake_new_user_data
		end
			
		it "should create new user account" do
			post '/users', @new_user.to_json
			expect(!!User.find_by_email(@new_user[:email])).to be_truthy
			expect(last_response).to be_ok
			expect(valid_json?(last_response.body)).to be_truthy
		end

		it "should return 409 status if failed to create new account" do
			@new_user['email'] = User.first[:email]
		  	post '/users', @new_user.to_json
		  	expect(last_response.status).to equal(409)
		end
	end