import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Kakao from 'kakaojs';

import MyProfilePage from './pages/MyProfilePage';
import OrderSheetPage from './pages/OrderSheetPage';
import Header from './components/Common/Header';
import Footer from './components/Common/Footer';
import DashboardPage from './pages/DashboardPage';
import ChallengeDetailPage from './pages/challengeDetailPage';
// import ChallengeDetail from './components/ChallengeDetail/ChallengeDetail';
import ChallengeDetailProgress from './components/ChallengeDetail/ChallengeDetailProgress';
import CreateChallengePage from './pages/CreateChallengePage';
import EditProfilePage from './pages/EditProfilePage';

import KakaoLogin from './components/Login/KakaoLogin';

import ChallengeResult from './components/SearchResult/ChallengeResult';
import MemberResult from './components/SearchResult/MemberResult';
import ChallengeListPage from './pages/ChallengeListPage';
import MemberListPage from './pages/MemberListPage';
import SearchResultPage from './pages/SearchResultPage';

import SuccessPayment from './components/KakaoPay/PaymentLists/SuccessPayment';
import FailedPayment from './components/KakaoPay/PaymentLists/FailedPayment';
import CancellationPayment from './components/KakaoPay/PaymentLists/CancellationPayment';

import ProfileBoxChallenge from './components/ProfileList/ProfileBoxLists/ProfileBoxOrderList';
import ProfileBoxChallengeList from './components/ProfileList/ProfileBoxLists/ProfileBoxChallengeList';
import ProfileBoxOrderList from './components/ProfileList/ProfileBoxLists/ProfileBoxOrderList';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/challengelist/*" element={<ChallengeListPage />} />
          <Route path="/memberlist" element={<MemberListPage />} />
          {/* <Route path="/detail/:id" element={<ChallengeDetail />} /> */}
          <Route path="/detail/:id" element={<ChallengeDetailPage />} />
          <Route
            path="/challengedetail/:id"
            element={<ChallengeDetailProgress />}
          />
          <Route path="/search/:name/:id" element={<SearchResultPage />}>
            <Route path={`challenge/:id`} element={<ChallengeResult />} />
            <Route path={`member/:id`} element={<MemberResult />} />
          </Route>
          <Route path="/profile/:name" element={<MyProfilePage />} />
          <Route path="/ordersheet" element={<OrderSheetPage />} />
          <Route path="/createchallenge/*" element={<CreateChallengePage />} />
          <Route path="/profile/edit/:name" element={<EditProfilePage />} />
          <Route path="/oauth/callback/kakao" element={<KakaoLogin />} />
          <Route path="/order/success" element={<SuccessPayment />} />
          <Route path="/order/fail" element={<FailedPayment />} />
          <Route path="/order/cancel" element={<CancellationPayment />} />
          <Route
            path="/profile/:name/chellenge"
            element={<ProfileBoxChallenge />}
          />
          {/* <Route
            path="/profile/:name/challengelist"
            element={<ProfileBoxChallengeList />}
          /> */}
          <Route
            path="/profile/:name/orderlist"
            element={<ProfileBoxOrderList />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}
