class RenameUserGroupGroupUser < ActiveRecord::Migration[5.0]
  def change
   rename_table :user_groups, :group_users
  end
end
