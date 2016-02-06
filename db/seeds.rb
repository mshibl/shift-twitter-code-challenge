require_relative '../app/helpers/helpers'
include HelperMethods

@meg = User.new(first_name: 'Meg', last_name: 'Nakamura', email: 'meg@shiftpayments.com', image: generate_image())
@meg.password = 123456
@meg.save!

@eugene = User.new(first_name: 'Eugene', last_name: 'Otto', email: 'eugene@shiftpayments.com', image: generate_image())
@eugene.password = 123456
@eugene.save!

@admin = User.new(first_name: 'Admin', last_name: 'Admin', email: 'admin@shift.com', image: generate_image())
@admin.password = 123456
@admin.save!

50.times do
  @user = User.new(first_name: Faker::Name.first_name, last_name: Faker::Name.last_name ,  email: Faker::Internet.email, image: generate_image())
  @user.password = 123456
  @user.save!
end

300.times do
	Tweet.create!(user_id: rand(1..52), text: Faker::Lorem.sentence(3))
end

500.times do
	Relationship.create!(friend_id: rand(1..52), follower_id: rand(1..57))
end