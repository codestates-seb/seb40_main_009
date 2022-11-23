import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChallengeList from './pages/ChallengeList';
import UserList from './pages/UserList';
import MyProfilePage from './pages/MyProfilePage';
import OrderSheetPage from './pages/OrderSheetPage';
import Header from './components/Common/Header';
import Footer from './components/Common/Footer';
import DashboardPage from './pages/DashboardPage';
import SearchResult from './pages/SearchResult';
import ChallengeDetail from './pages/ChallengeDetail';
import ChallengeDetailProgress from './pages/ChallengeDetailProgress';
import CreateChallengePage from './pages/CreateChallenge';
import EditProfilePage from './pages/EditProfilePage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/challengelist/*" element={<ChallengeList />} />
          <Route path="/detail/:id" element={<ChallengeDetail />} />
          <Route
            path="/challengedetail/:id"
            element={<ChallengeDetailProgress />}
          />
          <Route path="/userlist/*" element={<UserList />} />
          <Route path="/search/*" element={<SearchResult />} />
          <Route path="/profile" element={<MyProfilePage />} />
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
