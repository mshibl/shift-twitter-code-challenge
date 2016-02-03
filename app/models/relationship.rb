class Relationship < ActiveRecord::Base
	belongs_to :friend, class_name: 'User'
	belongs_to :follower, class_name: 'User'
	validates :friend_id, :follower_id, presence: true
end
