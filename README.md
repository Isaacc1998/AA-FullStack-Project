# AA-FullStack-Project

1) Hosting on Heroku
2) User account creation, login, and guest login
  * User can create an account, login and logout
  * User can use login as a guest to use features
  * Users that aren't logged in can't use features such as creating flashcards or posting questions.
3) Flashcards
  * Users can create flashcards, and make flashcard sets
  * Option to make flashcard sets public or private
  * Users can edit previously made flashcards
4) Questions
  * Users can post questions, and edit questions
  * Users can answer others' questions
5) Search 
  * Users should be able to search for flashcard sets and/or questions
6) Dashboard and User Profile
  * Dashboard should contain recently made flashcard sets or questions by other users
  * Dashboard should have recommended flashcard sets based on similarity of subject matter
  * Alerts to see if their questions have been answered
  * Users have their own profile that show their created flashcard sets and questions
7) Production README



## Schema

`users`
Column Name | Data Type | Details
----------- | --------- | -------
id | integer | not null, primary key
username | string | not null, indexed, unique
email | string | not null, indexed, unique
password_digest | string | not null
session_token | string | not null, indexed, unique
created_at | datetime | not null
updated_at | datetime | not null

* index on username, unique: true
* index on email, unique: true
* index on session_token, unique: true
* has_many flashcard_sets
* has_many questions
* has_many answers

`flashcard`
Column Name | Data Type | Details
----------- | --------- | -------
id | integer | not null, primary key
front | string | not null
back | string | not null
set_id | integer | not null, indexed, foreign key
created_at | datetime | not null
updated_at | datetime | not null

* set_id references flashcard_sets
* index on set_id
* belongs_to flashcard_set

`flashcard_set`
Column Name | Data Type | Details
----------- | --------- | -------
id | integer | not null, primary key
title | string | not null, indexed
author_id | integer | not null, indexed, foreign key
created_at | datetime | not null
updated_at | datetime | not null

* author_id references users
* index on author_id
* belongs_to author
* has_many flashcards

`question`
Column Name | Data Type | Details
----------- | --------- | -------
id | integer | not null, primary key
body | string | not null
author_id | integer | not null, indexed, foreign key
created_at | datetime | not null
updated_at | datetime | not null

* author_id references users
* index on author_id
* belongs_to author
* has_many answers

`answer`
Column Name | Data Type | Details
----------- | --------- | -------
id | integer | not null, primary key
body | string | not null
author_id | integer | not null, indexed, foreign key
question_id | integer | not null, indexed, foreign key
created_at | datetime | not null
updated_at | datetime | not null

* author_id references users
* index on author_id
* question_id references questions
* index on question_id
* belongs_to author
* belongs_to questions
