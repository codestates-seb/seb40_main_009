import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Loading from '../components/Loading/Loading';
import ChallengeDetail from '../components/ChallengeDetail/ChallengeDetail';
import ChallengeDetailProgress from '../components/ChallengeDetail/ChallengeDetailProgress';

export default function ChallengeDetailPage() {
  const parmas = useParams();
  const [loading, setLoading] = useState(true);
  const [participate, setParticipate] = useState([]);

  const memberId = localStorage.getItem('LoginId');

  //url 파라미터값 받아오기
  const challengeId = Number(parmas.id);
  console.log('challengeId>>>', challengeId);

  // 챌린지조회
  const getChallenge = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/challenges/${challengeId}`, {
        headers: {
          'ngrok-skip-browser-warning': 'none',
          Authorization:
            'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0MUBrYWthby5jb20iLCJpYXQiOjE2Njg1NjQ0OTMsImV4cCI6MTY3Nzc4NDY3M30.U8NmMuT3VVJGhaBbe33gvm5WnEBHQFRFNwogwzLwYNYfa2BdluAbSRPu81y29LGQaLxi-AHvwmd-6ONPwR_KMA',
        },
      });
      const challengeList = response.data.data;
      console.log('challengeList>>>', challengeList);
      //참가중인 챌린지인지 체크
      const participate = challengeList?.participatingMember.map((member) => {
        return member.memberId === memberId;
      });
      console.log('participate', participate);
      setParticipate(participate);

      setLoading(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  //챌린지조회 axios 실행
  useEffect(() => {
    getChallenge();
  }, []);

  //early return pattern
  if (loading) return <Loading />;

  return (
    <>
      {participate.indexOf(true) < 0 ? (
        <ChallengeDetail />
      ) : (
        <ChallengeDetailProgress />
      )}
    </>
  );
}
