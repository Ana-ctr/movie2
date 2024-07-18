import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';


import Lesson from './ein';
import Lesson1 from './details';
import Header from './header';
import App1 from './category';
import App2 from './popular';
import WeatherComponent from './weather';
import WeatherDetails from './wdetails';
import WeatherComponent2 from './w3';
import CurrencyList from './currency';
import CurrencyDetails from './cdetails';
import CurrencyList1 from './w3';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Lesson/>}> </Route>
          <Route path="details/:id" element={<Lesson1/>}> </Route>
          <Route path="header" element={<Header/>}> </Route>
          <Route path="category" element={<App1/>}> </Route>
          <Route path="popular" element={<App2/>}> </Route>
          <Route path="weather" element={<WeatherComponent/>}> </Route>
          <Route path="wdetails/:id" element={<WeatherDetails/>}> </Route>
          <Route path="w3" element={<WeatherComponent2/>}> </Route>
          <Route path="currency" element={<CurrencyList/>}> </Route>
          <Route path="cdetails/:id" element={<CurrencyDetails/>}> </Route>
          <Route path="c3" element={<CurrencyList1/>}> </Route>
 
 

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
