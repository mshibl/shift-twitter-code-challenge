class User < ActiveRecord::Base
	has_many :followers, class_name: "Relationship", foreign_key: "friend_id"
	has_many :friends, class_name: "Relationship", foreign_key: "follower_id"
end
