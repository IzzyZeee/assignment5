import { MainLayout } from '@/layouts/MainLayout';
import {  
  CreditsView, 
  GenresView,   
  ImagesView,
  MovieCategoriesView,
  MoviesView, 
  MovieView, 
  PersonView, 
  ReviewsView, 
  SeasonsView, 
  EpisodeView, 
  TelevisionView, 
  TelevisionCategoriesView,
  TelevisionsView,
  TrailersView, 
  TrendingView, 
  ErrorView, 
  HomeView, 
  SearchView, 
  CareerView,
  FavoritesView,
  CartView,
  SettingsView
} from '@/views';
import { Route, Routes } from 'react-router-dom';
import { UserProvider } from './context';

export const App = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<HomeView />} />
        
        <Route element={<MainLayout />} >

          <Route path="/movies" element={<MoviesView />}> 
            <Route path=":listKey" element={<MovieCategoriesView />} />
          </Route>

          <Route path="/movie/:id" element={<MovieView />}>
            <Route path="credits" element={<CreditsView kind="movie" />}/>
            <Route path="trailers" element={<TrailersView kind="movie" />}/>
            <Route path="reviews" element={<ReviewsView kind="movie" />}/>
          </Route>
        
          <Route path="/person/:id" element={<PersonView />}>
            <Route path="images" element={<ImagesView />} />
            <Route path="career" element={<CareerView />} />
          </Route>

          <Route path="/tv" element={<TelevisionsView />}> 
            <Route path=":listKey" element={<TelevisionCategoriesView />} />
          </Route>

          <Route path="/tv/id/:id" element={<TelevisionView />}>
            <Route path="seasons" element={<SeasonsView />}/>
            <Route path="season/:number" element={<EpisodeView />} />

            <Route path="credits" element={<CreditsView kind="tv" />}/>
            <Route path="trailers" element={<TrailersView kind="tv" />}/>
            <Route path="reviews" element={<ReviewsView kind="tv" />}/>
          </Route>

          <Route path="/trending" element={<TrendingView />} />

          <Route path="/genres/:type/:genre_id" element={<GenresView />} />
          
          <Route path="/search" element={<SearchView />} />

          <Route path="/favorites" element={<FavoritesView />} />
          <Route path="/cart" element={<CartView />} />
          <Route path="/settings" element={<SettingsView />} /> 

        </Route>

        <Route path="*" element={<ErrorView />} />
      </Routes>
    </UserProvider>
  );
};