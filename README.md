
### What you're going to make
Your mission: build a Twitter clone using Angular that consumes your sinatra api

### User stories
* A user can create an account
* A user can login/logout from their account
* User passwords should be encrypted and stored in a password-hash field. You may implement this yourself or use the bcyrpt gem
* A user is directed to their profile page upon logging in
* A user can see their last 50 tweets on their profile
* A user can post a new tweet(no longer than 140 characters)
* A user can follow friends
* A user can be followed
* A user can navigate to view other users' profiles
* A user can see a list of who they follow
* A user can see a list of who follows them
* A user can see a "home" page which displays tweets from all users limited to 50 tweets


### Bonus
* Add validation to the user model including password length and appropriately formated email
* Display appropriate error messages to the user for invalid data
* Unit tests to test your Sinatra routes
* Make it responsive and show off your design skills



### To create your database and run migrations

1. bundle exec rake db:create
2. bundle exec rake db:migrate

### To peek around your database from the console

1. bundle exec rake console

### As needed, create models & migrations with the `rake` tasks:

```
rake generate:migration  # Create an empty migration in db/migrate, e.g., rake generate:migration NAME=create_users
rake generate:model      # Create an empty model in app/models, e.g., rake generate:model NAME=User
```

### To start up the app

1.  `bundle install`
2.  `shotgun config.ru`
3.  navigate to http://localhost:9393

#### File structure guide
* The angular app is initialized in layout.erb. From here you can call in javascript, css and vendor files as needed
* Postgres and Active Record(a simple orm) are configured in the config folder
* In app/controllers you can find 2 simple sample routes
* The public folder has starter files for css and angular with examples


