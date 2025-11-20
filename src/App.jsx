import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Explore from './components/Explore';
import Profile from './components/Profile';
import NavbarMain from './components/NavbarMain';

function App() {
  return (
  <HashRouter>
    <NavbarMain/>

      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/explore" element={<Explore />}/>
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </HashRouter>
    );
}

export default App;
