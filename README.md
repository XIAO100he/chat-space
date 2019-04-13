# README
## usersテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|name|string|null: false|
|email|text|null: false|
|passwords|text|null:false|

### Association
- has_many :groups, through: :users_groups
- has_many :messages

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|name|string|null: false|
|user_id|integer|null: false, foreign_key: true|
|message_id|integer|null: false, foreign_key: true|

### Association
- has_many :users, through: :users_groups
- has_many :messages, through: :groups_messages


## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|text|text|
|image|text|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :users
- has_many :groups, through: :groups_messages