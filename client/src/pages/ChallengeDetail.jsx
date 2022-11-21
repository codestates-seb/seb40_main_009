import * as S from '../style/ChallengeDetail/ChallengeDetailStyle';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Loading from '../components/Loading/Loading';
import ChartBar from '../components/ProfileList/ChartBar';

function ChallengeDetail() {
  const [loading, setLoading] = useState(true);
  const [challenge, setChallenge] = useState([]);

  // 챌린지조회
  useEffect(() => {
    setLoading(true);
    axios
      // .get(`http://localhost:3001/challenge?challengeCategoryId=2`)
      .get(
        `https://localhost:3001/challenge`
        // headers: {
        //   key: 'ngrok-skip-browser-warning',
        //   value: 1,
        // },
      )
      .then((res) => {
        setChallenge(res.data);
        setLoading(false);
        console.log('challenge>>>', challenge);
      })
      .catch((error) => {
        // window.alert(error);
        console.log('error', error);
      });
  }, []);

  return (
    <S.Container>
      {loading ? <Loading /> : null}
      <S.Recruitment>
        <img src="./img/smile.jpg" alt="도전 할 항목의 이미지" />
        <div>
          {/* 챌린지 설명 */}
          <S.Description>
            <div className="challenge-name">{challenge.challengeTitle}</div>

            <S.Title>
              <div className="pd-5">
                <S.PaddingB>참여 인원</S.PaddingB>
                <S.PaddingB>진행률</S.PaddingB>
                <S.PaddingB>챌린지 기간</S.PaddingB>
                <S.PaddingB>결제 금액</S.PaddingB>
                <S.PaddingB>모인 금액</S.PaddingB>
              </div>
              <div>
                <S.PaddingB>참여 인원</S.PaddingB>
                <S.PaddingB>
                  <ChartBar />
                </S.PaddingB>
                <S.PaddingB>{`${challenge.challengeStartDate} ~ ${challenge.challengeEndDate}`}</S.PaddingB>
                <S.PaddingB>{challenge.challengeFeePerPerson}</S.PaddingB>
                <S.PaddingB>모인 금액</S.PaddingB>
              </div>
            </S.Title>
          </S.Description>
        </div>
      </S.Recruitment>
    </S.Container>
  );
}
export default ChallengeDetail;
