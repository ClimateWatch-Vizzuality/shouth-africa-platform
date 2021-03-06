Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  mount Locations::Engine => 'api/v1/locations'

  mount HistoricalEmissions::Engine => 'api/v1'
  get 'api/v1/emissions/download', to: 'historical_emissions/historical_emissions#download'

  namespace :api do
    namespace :v1 do
      resources :inventory_improvement_projects,
                only: [:index],
                defaults: { format: 'json' }
      namespace :mitigation do
        resources :flagship_programmes, only: [:index],
                  controller: :flagship_programmes,
                  defaults: { format: 'json' }
        resources :flagship_themes, only: [:index],
                  controller: :flagship_themes,
                  defaults: { format: 'json' }
        resources :mitigation_actions, only: [:index],
                  controller: :mitigation_actions,
                  defaults: { format: 'json' }
        resources :mitigation_themes, only: [:index],
                  controller: :mitigation_themes,
                  defaults: { format: 'json' }
        resources :mitigation_sectors, only: [:index],
                  controller: :mitigation_sectors,
                  defaults: { format: 'json' }
        resources :mitigation_effects, only: [:index],
                  controller: :mitigation_effects,
                  defaults: { format: 'json' }
      end
      namespace :financial_resource do
        resources :support_needs, only: [:index],
                  controller: :support_needs,
                  defaults: { format: 'json' }
        resources :received_supports, only: [:index],
                  controller: :received_supports,
                  defaults: { format: 'json' }
      end
      namespace :ghg do
        resources :projected_emissions, only: [:index],
                  controller: :projected_emissions,
                  defaults: { format: 'json' }
      end
      namespace :national_circumstance do
        resources :priorities, only: [:index],
                  controller: :priorities,
                  defaults: { format: 'json' }
        resources :categories, only: [:index],
                  controller: :categories,
                  defaults: { format: 'json' }
        resources :category_groups, only: [:index],
                  controller: :category_groups,
                  defaults: { format: 'json' }
      end
      resources :inventory_improvement_projects,
                only: [:index],
                defaults: { format: 'json' }
      resources :metadata,
                only: [:index],
                defaults: { format: 'json' }
      resources :section_content,
                only: [:index],
                defaults: { format: 'json' }
      get '(*endpoint)', controller: :api, action: :route_not_found
    end
  end

  root 'application#index'
  get '(*frontend)', to: 'application#index'
end
