class CreateHistories < ActiveRecord::Migration[7.0]
  def change
    create_table :histories do |t|
      t.references :owner, index: true, foreign_key: {to_table: :users}
      t.timestamps
    end
  end
end
