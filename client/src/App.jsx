import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Common/Header';
import Footer from './components/Common/Footer';
import MainPage from './components/Common/MainPage';

import ChallengeList from './pages/ChallengeList';
import UserList from './pages/UserList';
import SearchResult from './pages/SearchResult';

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/challengelist" element={<ChallengeList />} />
          <Route path="/userlist" element={<UserList />} />
          <Route path="/searchresult" element={<SearchResult />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
