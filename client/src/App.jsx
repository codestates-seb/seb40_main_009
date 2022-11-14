import ChallengeList from './pages/ChallengeList';
import UserList from './pages/UserList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SearchResult from './pages/SearchResult';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/challengelist" element={<ChallengeList />} />
          <Route path="/userlist" element={<UserList />} />
          <Route path="/searchresult" element={<SearchResult />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
