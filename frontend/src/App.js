import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';

// __ __ Style Libraries/Components __ __ //
import TopBarProgress from 'react-topbar-progress-indicator';
import PageNotFound from './components/common/PageNotFound/PageNotFound.jsx';
import "./App.css"


// Lazy-loaded components
const Layout = lazy(() => import('./components/layout/layout.js'));
const Home = lazy(() => import('./components/main/Home/home.jsx'));
const MarsRover = lazy(() => import('./components/main/MarsRover/marsRover.jsx'));
const EarthPolychromatic = lazy(() => import('./components/main/EarthPolychromatic/earthPolychromatic.jsx'));
const EarthObject = lazy(() => import('./components/main/EarthObjects/earthObject.jsx'));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<TopBarProgress />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="mars-rover" element={<MarsRover />} />
            <Route path="earth-polychromatic" element={<EarthPolychromatic />} />
            <Route path="earth-objects" element={<EarthObject />} />
            <Route path="*" element={<PageNotFound />} /> 
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
