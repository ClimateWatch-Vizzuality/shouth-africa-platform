require 'rails_helper'

RSpec.describe Ghg::ProjectedEmissionBoundary, type: :model do
  it 'should be invalid when name not present' do
    expect(
      FactoryBot.build(:projected_emission_boundary, name: '')
    ).to have(1).error_on(:name)
  end
  it 'should be valid' do
    expect(FactoryBot.build(:projected_emission_boundary)).to be_valid
  end
end
