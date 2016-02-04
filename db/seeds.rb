50.times do
  @user = User.new(first_name: Faker::Name.first_name, last_name: Faker::Name.last_name ,  email: Faker::Internet.email)
  @user.password = 123456
  @user.save!
end

300.times do
	Tweet.create!(user_id: rand(1..57), text: Faker::Lorem.sentence(3))
end

500.times do
	Relationship.create!(friend_id: rand(1..57), follower_id: rand(1..57))
end
