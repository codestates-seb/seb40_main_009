import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ChallengeList from './pages/ChallengeList';
import UserList from './pages/UserList';
import MyProfilePage from './pages/MyProfilePage';
import OrderSheetPage from './pages/OrderSheetPage';
import Header from './components/Common/Header';
import Footer from './components/Common/Footer';
import MainPage from './components/Common/MainPage';
import SearchResult from './pages/SearchResult';


function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/challengelist" element={<ChallengeList />} />
          <Route path="/userlist" element={<UserList />} />

          <Route path="/profile" element={<MyProfilePage />} />
          <Route path="/ordersheet" element={<OrderSheetPage />} />

          <Route path="/searchresult" element={<SearchResult />} />

        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
