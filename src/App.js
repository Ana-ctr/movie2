import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';


import Lesson from './ein';
import Lesson1 from './details';
import Header from './header';
import App1 from './category';
import App2 from './popular';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Lesson/>}> </Route>
          <Route path="details" element={<Lesson1/>}> </Route>
          <Route path="header" element={<Header/>}> </Route>
          <Route path="category" element={<App1/>}> </Route>
          <Route path="popular" element={<App2/>}> </Route>



        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
