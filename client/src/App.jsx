import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ChallengeList from './pages/ChallengeList';
import UserList from './pages/UserList';
import MyProfilePage from './pages/MyProfilePage';
import OrderSheetPage from './pages/OrderSheetPage';
import Header from './components/Common/Header';
import Footer from './components/Common/Footer';
import MainPage from './components/Main/MainPage';
import SearchResult from './pages/SearchResult';
import ChallengeDetail from './pages/ChallengeDetail';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/challengelist/*" element={<ChallengeList />} />
          <Route path="/challengedetail/*" element={<ChallengeDetail />} />
          <Route path="/userlist/*" element={<UserList />} />
          <Route path="/search/*" element={<SearchResult />} />
          <Route path="/profile" element={<MyProfilePage />} />
          <Route path="/ordersheet" element={<OrderSheetPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
