import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import {
  Container,
  ChallengeViewCount,
  Recruitment,
  ChallengeDescriptionWrapper,
  ChallengeDescription,
  Certification,
  CertificationWrapper,
  CertificationDescription,
  CertificationImage,
  Image,
  ReviewImageWrapper,
  ReviewImage,
  ViewMore,
  FullWidth,
  Review,
  ButtonWrapper,
} from '../../style/ChallengeDetail/ChallengeDetailStyle';

import ImageModal from './ImageModal';
import Swal from 'sweetalert2';
import Loading from '../Loading/Loading';
import smile from '../../image/smile.jpg';

export default function ChallengeDetail() {
  const parmas = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [challenge, setChallenge] = useState([]);
  const [imageModalOpen, setImageModalOpen] = useState(false);

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
      console.log('error', error);
    }
  };

  //챌린지조회 axios 실행
  useEffect(() => {
    getChallenge();
  }, []);

  // 참여하기 클릭시 페이지 이동
  const NavigateMPaymentPage = async () => {
    if (challenge.challengeFeePerPerson !== 0) {
      const response = await Swal.fire({
        icon: 'question',
        title: '재확인',
        text: `${challenge.challengeTitle}에 도전 하시겠습니까?`,
        showCancelButton: true,
        confirmButtonText: '도전!',
        cancelButtonText: '다음에...',
      });
      if (response.isConfirmed) {
        //결제페이지로 이동
        return navigate('/ordersheet');
      }
    }
    if (challenge.challengeFeePerPerson === 0) {
      //챌린지 도전중 페이지로 이동
      const response = await Swal.fire({
        icon: 'question',
        title: '재확인',
        text: `${challenge.challengeTitle}에 도전 하시겠습니까?`,
        showCancelButton: true,
        confirmButtonText: '도전!',
        cancelButtonText: '다음에...',
      });
      if (response.isConfirmed) {
        //챌린지 도전중 페이지로 이동
        return navigate(`/challengedetail/${id}`);
      }
    }
  };

  //후기사진 더보기 모달창 띄우기
  const showImageModal = () => {
    setImageModalOpen(true);
  };

  const imageTest = [
    '인증 예시1',
    '인증 예시2',
    '인증 예시3',
    '인증 예시4',
    '인증 예시5',
    '인증 예시6',
    '인증 예시7',
    '인증 예시8',
    '인증 예시9',
    '인증 예시10',
  ];

  //early return pattern
  if (loading) return <Loading />;

  return (
    <Container>
      <ChallengeViewCount>{`조회수 ${challenge.challengeViewCount}`}</ChallengeViewCount>
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
                <span onClick={NavigateMPaymentPage}>참여하기</span>
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
        <CertificationDescription>
          <div className="title">인증 방법 / 인증 예시</div>
          <div className="pd-5">{challenge.challengeAuthDescription}</div>
          {/* 인증예시 */}
          <CertificationImage>
            {challenge.challengeExamImagePath.map((image, index) => {
              return <Image key={index}>{image}</Image>;
            })}
          </CertificationImage>
        </CertificationDescription>
      </Certification>

      <Review>
        <div>후기 사진</div>
        <ReviewImageWrapper>
          {/* {challenge.challengeExamImagePath.map((image) => { */}
          {imageTest.splice(0, 8).map((image, index) => {
            return (
              <ReviewImage key={index}>
                {/* <img src="*" alt="" /> */}

                {index === 7 ? (
                  <ViewMore>
                    <div onClick={showImageModal}>더보기</div>
                    {imageModalOpen && (
                      <ImageModal setImageModalOpen={setImageModalOpen} />
                    )}
                  </ViewMore>
                ) : (
                  <FullWidth>
                    <div>{image}</div>
                  </FullWidth>
                )}
              </ReviewImage>
            );
          })}
        </ReviewImageWrapper>
      </Review>
    </Container>
  );
}
