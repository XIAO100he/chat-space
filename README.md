# README
## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|
|email|text|null: false|unique: true|
|passwords|string|null:false|unique: true|

### Association
- has_many :groups, through: :user_groups
- has_many :user_groups
- has_many :messages

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|

### Association
- has_many :users, through: :user_groups
- has_many :user_groups
- has_many :messages


## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|text|text|
|image|string|
|user_id|reference|null: false, foreign_key: true|
|group_id|reference|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group


## user_groupsテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|reference|null: false, foreign_key: true|
|group_id|reference|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group
