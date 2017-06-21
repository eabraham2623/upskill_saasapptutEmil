class AddAttachmentAvatorToProfiles < ActiveRecord::Migration
  def self.up
    change_table :profiles do |t|
      t.attachment :avator
    end
  end

  def self.down
    remove_attachment :profiles, :avator
  end
end
