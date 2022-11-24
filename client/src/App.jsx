import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Kakao from 'kakaojs';

import ChallengeList from './pages/ChallengeList';
import MyProfilePage from './pages/MyProfilePage';
import OrderSheetPage from './pages/OrderSheetPage';
import Header from './components/Common/Header';
import Footer from './components/Common/Footer';
import DashboardPage from './pages/DashboardPage';
import SearchResult from './pages/SearchResult';
import ChallengeDetail from './components/ChallengeDetail/ChallengeDetail';
import ChallengeDetailProgress from './components/ChallengeDetail/ChallengeDetailProgress';
import CreateChallengePage from './pages/CreateChallenge';
import EditProfilePage from './pages/EditProfilePage';
import MemberList from './pages/MemberList';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/challengelist/*" element={<ChallengeList />} />
          <Route path="/memberlist" element={<MemberList />} />
          <Route path="/detail/:id" element={<ChallengeDetail />} />
          <Route
            path="/challengedetail/:id"
            element={<ChallengeDetailProgress />}
          />
          <Route path="/search/*" element={<SearchResult />} />
          <Route path="/profile/:name" element={<MyProfilePage />} />
          <Route path="/ordersheet" element={<OrderSheetPage />} />
          <Route path="/createchallenge/*" element={<CreateChallengePage />} />
          <Route path="/profile/edit/:name" element={<EditProfilePage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
