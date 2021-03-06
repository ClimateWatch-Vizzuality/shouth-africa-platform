module Api
  module V1
    class SectionContentController < ApiController
      def index
        section_contents = SectionContent.all

        respond_to do |format|
          format.json do
            render json: section_contents,
                   each_serializer: Api::V1::SectionContentSerializer
          end
        end
      end
    end
  end
end
