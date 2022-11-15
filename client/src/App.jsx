import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChallengeList from './pages/ChallengeList';
import UserList from './pages/UserList';
import MyProfilePage from './pages/MyProfilePage';
import OrderSheetPage from './pages/OrderSheetPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/challengelist" element={<ChallengeList />} />
          <Route path="/userlist" element={<UserList />} />
          <Route path="/profile" element={<MyProfilePage />} />
          <Route path="/ordersheet" element={<OrderSheetPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
