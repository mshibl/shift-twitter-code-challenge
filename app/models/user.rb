require 'bcrypt'

class User < ActiveRecord::Base
	has_many :followships, class_name: "Relationship" , foreign_key: "friend_id"
	has_many :followers, through: :followships, foreign_key: "friend_id"

	has_many :friendships, class_name: "Relationship" , foreign_key: "follower_id"
	has_many :friends, through: :friendships, foreign_key: "follower_id"

	has_many :tweets

	validates :first_name, :last_name, :email, :password_hash, presence: true
	validates :email, uniqueness: { case_sensitive: false }

	# Passowrd creation and verfication 
	include BCrypt

	def password
		@password ||= Password.new(password_hash)
	end

	def password=(new_password)
		@password = Password.create(new_password)
		self.password_hash = @password
	end
end
