# == Schema Information
#
# Table name: nc_categories
#
#  id                :bigint(8)        not null, primary key
#  category_group_id :integer          not null
#  location_id       :integer          not null
#  name              :string           not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#

module NationalCircumstance
  class Category < ApplicationRecord
    self.table_name = 'nc_categories'
    include ::GenericToCsv

    belongs_to :category_group
    belongs_to :location
    has_many :category_years

    validates_presence_of :name
    validates :name, uniqueness: {scope: %w[location category_group]}
  end
end
