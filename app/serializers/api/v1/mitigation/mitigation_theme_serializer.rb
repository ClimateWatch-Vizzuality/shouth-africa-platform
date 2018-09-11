# == Schema Information
#
# Table name: mitigation_categories
#
#  id         :bigint(8)        not null, primary key
#  title      :string
#  position   :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

module Api
  module V1
    module Mitigation
      class MitigationThemeSerializer < ActiveModel::Serializer
        attributes :title, :position

        has_many :flagship_programmes,
                 serializer: Api::V1::Mitigation::FlagshipProgrammeSerializer
      end
    end
  end
end