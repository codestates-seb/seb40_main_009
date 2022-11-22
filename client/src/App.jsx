import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChallengeList from './pages/ChallengeList';
import UserList from './pages/UserList';
import MyProfilePage from './pages/MyProfilePage';
import OrderSheetPage from './pages/OrderSheetPage';
import Header from './components/Common/Header';
import Footer from './components/Common/Footer';
import MainPage from './pages/MainPage';
import SearchResult from './pages/SearchResult';
import DetailPage from './pages/DetailPage';
import ChallengeDetail from './pages/ChallengeDetail';
import CreateChallengePage from './pages/CreateChallenge';
import EditProfilePage from './pages/EditProfilePage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/challengelist/*" element={<ChallengeList />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/challengedetail/:id" element={<ChallengeDetail />} />
          <Route path="/userlist/*" element={<UserList />} />
          <Route path="/search/*" element={<SearchResult />} />
          <Route path="/profile/:id" element={<MyProfilePage />} />
          <Route path="/ordersheet" element={<OrderSheetPage />} />
          <Route path="/createchallenge/*" element={<CreateChallengePage />} />
          <Route path="/editprofile" element={<EditProfilePage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
