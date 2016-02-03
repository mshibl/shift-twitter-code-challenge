class User < ActiveRecord::Base
	has_many :followships, class_name: "Relationship" , foreign_key: "friend_id"
	has_many :followers, through: :followships, foreign_key: "friend_id"

	has_many :friendships, class_name: "Relationship" , foreign_key: "follower_id"
	has_many :friends, through: :friendships, foreign_key: "follower_id"

	has_many :tweets
end
