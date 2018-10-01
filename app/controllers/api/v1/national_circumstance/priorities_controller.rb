module Api
  module V1
    module NationalCircumstance
      class PrioritiesController < ApiController
        def index
          values = ::NationalCircumstance::Priority.all

          respond_to do |format|
            format.json do
              render json: values,
                     each_serializer: Api::V1::NationalCircumstance::PrioritySerializer,
                     meta: ::NationalCircumstance::Indicator.all.
                       as_json(except: %w[id created_at updated_at])
            end
            format.csv do
              send_data values.to_csv,
                        type: 'text/csv',
                        filename: 'priorities.csv',
                        disposition: 'attachment'
            end
          end
        end
      end
    end
  end
end