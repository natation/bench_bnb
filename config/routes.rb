Rails.application.routes.draw do
  namespace :api do
  get 'benches/index'
  end

  namespace :api do
  get 'benches/create'
  end

  root 'static_pages#index'
  namespace :api, defaults: {format: :json} do
    resources :benches, only: [:index, :create]
  end
end
