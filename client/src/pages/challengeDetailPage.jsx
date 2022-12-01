import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Loading from '../components/Loading/Loading';
import ChallengeDetail from '../components/ChallengeDetail/ChallengeDetail';
import ChallengeDetailProgress from '../components/ChallengeDetail/ChallengeDetailProgress';

export default function ChallengeDetailPage() {
  const parmas = useParams();
  const [loading, setLoading] = useState(true);
  const [challengeData, setChallengeData] = useState([]);

  const authorizationToken = localStorage.getItem('authorizationToken');

  //url 파라미터값 받아오기
  const challengeId = Number(parmas.id);
  console.log('challengeId>>>', challengeId);

  // 챌린지조회
  const getChallenge = async () => {
    setLoading(true);
    try {
      await axios
        .get(`/challenges/${challengeId}`, {
          headers: {
            'ngrok-skip-browser-warning': 'none',
            Authorization: authorizationToken,
          },
        })
        .then(async (response) => {
          const challengeList = await response.data.data;
          console.log('fdsfsdfschallengeList>>>', challengeList);
          setChallengeData(challengeList);
          setLoading(false);
        })
        .catch(async (error) => {
          if (error.response.data.status === 401) {
            try {
              const responseToken = await axios.get('/token', {
                headers: {
                  'ngrok-skip-browser-warning': 'none',
                  refresh: localStorage.getItem('refreshToken'),
                },
              });
              await localStorage.setItem(
                'authorizationToken',
                responseToken.headers.authorization
              );
              await localStorage.setItem(
                'test',
                responseToken.headers.authorization
              );
            } catch (error) {
              console.log('재요청 실패', error);
            }
          }
        });
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
      {challengeData.isSimpleResponse === true ? ( //true:참여x, false:참여
        //챌린지 상세페이지
        <ChallengeDetail challengeData={challengeData} />
      ) : (
        //챌린지 도전중 페이지
        <ChallengeDetailProgress challengeData={challengeData} />
      )}
    </>
  );
}
