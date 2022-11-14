import Header from './components/Common/Header';
import Footer from './components/Common/Footer';

import ChallengeList from './pages/ChallengeList';
import UserList from './pages/UserList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/challengelist" element={<ChallengeList />} />
          <Route path="/userlist" element={<UserList />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
