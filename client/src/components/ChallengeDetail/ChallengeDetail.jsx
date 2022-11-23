import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {
  Container,
  Recruitment,
  ChallengeDescriptionWrapper,
  ChallengeDescription,
  Certification,
  CertificationWrapper,
  Review,
  ButtonWrapper,
} from '../../style/ChallengeDetail/ChallengeDetailStyle';

import Loading from '../Loading/Loading';
import smile from '../../image/smile.jpg';

export default function ChallengeDetail() {
  const parmas = useParams();
  const [loading, setLoading] = useState(true);
  const [challenge, setChallenge] = useState([]);

  //url 파라미터값 받아오기
  const id = Number(parmas.id);

  // 챌린지조회
  const getChallenge = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/challenges/${id}`, {
        headers: {
          'ngrok-skip-browser-warning': 'none',
        },
      });
      const challengeList = response.data.data;
      console.log('challengeList>>>', challengeList);
      setChallenge(challengeList);
      setLoading(false);
    } catch (error) {
      //useeffevt 안에서 window. 쓸필요x
      alert(error);
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
    <Container>
      <Recruitment>
        <img src={smile} alt="도전 할 항목의 이미지" />
        <div>
          {/* 챌린지 설명 */}
          <ChallengeDescriptionWrapper>
            <div className="challenge-name">{challenge.challengeTitle}</div>

            <ChallengeDescription>
              <div className="title">최소 / 최대 인원:</div>
              <div>{`${challenge.challengeMinParty} / ${challenge.challengeMaxParty}명`}</div>
            </ChallengeDescription>
            <ChallengeDescription>
              <div className="title">신청 인원 / 정원:</div>
              <div>{`${challenge.challengeCurrentParty} / ${challenge.challengeMaxParty}명`}</div>
            </ChallengeDescription>
            <ChallengeDescription>
              <div className="title2">챌린지 기간:</div>
              <div>{`${challenge.challengeStartDate} ~ ${challenge.challengeEndDate}`}</div>
            </ChallengeDescription>
            <ChallengeDescription>
              <div className="title2">챌린지 금액:</div>
              <div>{challenge.challengeFeePerPerson}원</div>
            </ChallengeDescription>

            {/* 참여버튼 */}
            <ButtonWrapper>
              <button className="custom-btn btn-8">
                <span>참여하기</span>
              </button>
              {/* <div>공유아이콘</div> */}
            </ButtonWrapper>
          </ChallengeDescriptionWrapper>
        </div>
      </Recruitment>

      {/* 챌린지 설명 */}
      <Certification>
        <CertificationWrapper>
          <div className="title">챌린지 설명</div>
          <div className="pd-5">{challenge.challengeDescription}</div>
        </CertificationWrapper>
        {/* 인증 방법 */}
        <CertificationWrapper>
          <div className="title">인증 방법</div>
          <div className="pd-5">{challenge.challengeAuthDescription}</div>
        </CertificationWrapper>
        {/* 인증 예시 */}
        <CertificationWrapper>
          <div className="title">인증 예시</div>
          <img src="./img/smile.jpg" alt="*" />
        </CertificationWrapper>
      </Certification>

      <Review>
        <div>후기 사진</div>
        <div style={{ border: '2px solid red', marginTop: '3%' }}>
          <img src="*" alt="" />
        </div>
      </Review>
    </Container>
  );
}
