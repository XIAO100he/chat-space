# README
## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|
|email|text|null: false|unique: true|
|passwords|text|null:false|unique: true|

### Association
- has_many :groups, through: :user_groups
- has_many :messages

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|
|user_id|integer|null: false, foreign_key: true|
|message_id|integer|null: false, foreign_key: true|

### Association
- has_many :users, through: :user_groups
- has_many :messages, through: :group_messages


## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|text|text|
|image|text|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :users
- has_many :groups, through: :group_messages


## user_groupsテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|


## group_messagesテーブル

|Column|Type|Options|
|------|----|-------|
|group_id|integer|null: false, foreign_key: true|
|message_id|integer|null: false, foreign_key: true|