# == Schema Information
#
# Table name: flagship_programmes
#
#  id                  :bigint(8)        not null, primary key
#  mitigation_theme_id :integer
#  title               :string
#  sub_programs        :text
#  description         :text
#  position            :integer
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  work_package        :text
#  outcomes            :text
#

module Mitigation
  class FlagshipProgramme < ApplicationRecord
    include ::GenericToCsv

    self.table_name = 'flagship_programmes'
    validates_presence_of :position, :title
    belongs_to :mitigation_theme
    has_many :flagship_components
  end
end
