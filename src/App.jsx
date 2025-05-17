import { Routes, Route } from 'react-router-dom';
import Layout from './components/Common/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Quran from './pages/Quran';
import ShowPictures from './components/Quran/ShowPictures';
import Azkar from './pages/Azkar';
import Monga from './pages/Monga';
import Anached from './pages/Anached';






function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="services/quran" element={<Quran />} />
        <Route path="services/athkar" element={<Azkar />} />
        <Route path="services/munajah" element={<Monga />} />
        <Route path="services/anasheed" element={<Anached />} />
        <Route path="/quran/:suraId" element={<ShowPictures />} />

      </Route>
    </Routes>
  );
}

export default App;