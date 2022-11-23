import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {
  Container,
  ChallengeProgress,
  ChallengeImage,
  ChallengeWrapper,
  ChallengeTitle,
  ChallengeDescription,
  Certification,
  CertificationWrapper,
  Review,
} from '../../style/ChallengeDetailProgress/ChallengeDetailProgressStyle';

import Loading from '../Loading/Loading';
import ChartBar from '../ProfileList/ChartBar';
import DdayFormatter from './DdayFormatter';
import Modal from './Modal';
import smile from '../../image/smile.jpg';

export default function ChallengeDetailProgress() {
  const parmas = useParams();
  const [loading, setLoading] = useState(true);
  const [challenge, setChallenge] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [imageTransform, setImageTransfrom] = useState('');
  console.log('imageTransform>>', imageTransform);

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

  //모달창 띄우기
  const showModal = () => {
    setModalOpen(true);
  };

  //early return pattern
  if (loading) return <Loading />;

  return (
    <Container>
      <ChallengeProgress>
        {/* 이미지 */}
        <div className="image">
          <ChallengeImage src={smile} alt="도전 할 항목의 이미지" />
        </div>

        <ChallengeWrapper>
          {/* 챌린지 이름, 디데이 */}
          <ChallengeTitle>
            <div className="title">{challenge.challengeTitle}</div>
            <div className="d_day">
              <DdayFormatter endDate={challenge.challengeEndDate} />
            </div>
          </ChallengeTitle>

          <ChallengeDescription>
            <div className="margin_left3">챌린지 진행률:</div>
            <div>
              {/* <ChartBar percentage={props.percentage} /> */}
              <ChartBar />
            </div>
          </ChallengeDescription>

          <ChallengeDescription>
            <div className="margin_left2">참여 인원:</div>
            <div>{`${challenge.challengeCurrentParty}명`}</div>
          </ChallengeDescription>

          <ChallengeDescription>
            <div className="margin_left">챌린지 기간:</div>
            <div>{`${challenge.challengeStartDate} ~ ${challenge.challengeEndDate}`}</div>
          </ChallengeDescription>

          <ChallengeDescription>
            <div className="margin_left">챌린지 금액:</div>
            <div>{challenge.challengeFeePerPerson}원</div>
          </ChallengeDescription>

          <ChallengeDescription>
            <div className="margin_left">결제한 금액:</div>
            <div>{challenge.challengeFeePerPerson}원</div>
          </ChallengeDescription>
        </ChallengeWrapper>
      </ChallengeProgress>

      <Certification>
        <CertificationWrapper>
          <div className="title">챌린지 설명</div>
          <div className="pd-5">{challenge.challengeDescription}</div>
        </CertificationWrapper>

        <CertificationWrapper>
          <div className="title">인증 방법</div>
          <div className="pd-5">{challenge.challengeAuthDescription}</div>
        </CertificationWrapper>

        <CertificationWrapper>
          <div className="title">인증 예시</div>
          <img src="./img/smile.jpg" alt="*" />
        </CertificationWrapper>
      </Certification>
      {/* challengeId, challengeCertImagePath */}

      <Review>
        <div className="flex">
          <div className="marginRight"> 인증 사진</div>
          <div className="cursur" onClick={showModal}>
            인증 사진 올리기
          </div>
          {modalOpen && (
            <Modal
              setModalOpen={setModalOpen}
              imageTransform={imageTransform}
              setImageTransfrom={setImageTransfrom}
            />
          )}
        </div>
        <div style={{ border: '2px solid red', marginTop: '3%' }}>
          <img src="*" alt="" />
        </div>
      </Review>

      <Review>
        <div>후기 사진</div>
        <div style={{ border: '2px solid red', marginTop: '3%' }}>
          <img src="*" alt="" />
        </div>
      </Review>
    </Container>
  );
}
