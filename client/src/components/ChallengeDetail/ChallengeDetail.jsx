import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

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
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import Loading from '../Loading/Loading';

export default function ChallengeDetail({ challengeData }) {
  const parmas = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [challenge, setChallenge] = useState([]);
  const [imageData, setImageData] = useState({ image: '', i: 0 });
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const authorizationToken = localStorage.getItem('authorizationToken');
  //url 파라미터값 받아오기
  const challengeId = Number(parmas.id);

  // 참여하기 클릭시 페이지 이동
  const NavigateMPaymentPage = async () => {
    if (challengeData.challengeFeePerPerson !== 0) {
      const response = await Swal.fire({
        icon: 'question',
        title: '재확인',
        text: `${challengeData.challengeTitle}에 도전 하시겠습니까?`,
        showCancelButton: true,
        confirmButtonText: '도전!',
        cancelButtonText: '다음에...',
      });
      if (response.isConfirmed) {
        //결제페이지로 이동
        return navigate('/ordersheet', {
          state: {
            title: challengeData.challengeTitle,
            startDate: challengeData.challengeStartDate,
            endDate: challengeData.challengeEndDate,
            price: challengeData.challengeFeePerPerson,
            image: challengeData.challengeRepImagePath,
          },
        });
      }
    } else {
      const response = await Swal.fire({
        icon: 'question',
        title: '재확인',
        text: `${challengeData.challengeTitle}에 도전 하시겠습니까?`,
        showCancelButton: true,
        confirmButtonText: '도전!',
        cancelButtonText: '다음에...',
      });
      if (response.isConfirmed) {
        try {
          await axios.post(
            `/challenges/participate/${challengeId}`,
            {
              data: '',
            },
            {
              headers: {
                'ngrok-skip-browser-warning': 'none',
                Authorization: authorizationToken,
              },
            }
          );
          alert('성공');
          window.location.reload();
          return navigate(`/detail/${challengeData.challengeId}`);
        } catch (error) {
          console.log('error', error);
        }
      }
    }
  };

  //후기사진 더보기 모달창 띄우기
  const showImageModal = () => {
    setImageModalOpen(true);
  };

  const images = [
    'https://picsum.photos/2000/3000',
    'https://picsum.photos/3000/2000',
    'https://picsum.photos/4000/3000',
    'https://picsum.photos/3000/1500',
    'https://picsum.photos/2000/3000',
    'https://picsum.photos/3000/200',
  ];

  const viewImage = (image, i) => {
    setImageData({ image, i });
  };

  const imageAction = (action) => {
    let i = imageData.i;
    if (action === 'next-image') {
      setImageData({ image: images[i + 1], i: i + 1 });
    }
    if (action === 'previous-image') {
      setImageData({ image: images[i - 1], i: i - 1 });
    }
    if (!action) {
      setImageData({ image: '', i: 0 });
    }
  };

  return (
    <>
      {imageData.image && (
        <div
          style={{
            width: '100%',
            height: '100vh',
            background: 'black',
            position: 'fixed',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            zIndex: 10000,
          }}
        >
          <button
            onClick={() => imageAction()}
            style={{ position: 'absolute', top: '10px', right: '10px' }}
          >
            X
          </button>
          <button onClick={() => imageAction('previous-image')}>이전</button>
          <img
            src={imageData.image}
            style={{ width: 'auto', maxWidth: '90%', maxHeight: '90%' }}
            alt="이미지크게보기"
          />
          <button onClick={() => imageAction('next-image')}>다음</button>
        </div>
      )}
      <Container>
        <ChallengeViewCount>{`조회수 ${challengeData.challengeViewCount}`}</ChallengeViewCount>
        <Recruitment>
          <img
            src={challengeData.challengeRepImagePath}
            alt="도전 할 항목의 이미지"
          />
          <div>
            {/* 챌린지 설명 */}
            <ChallengeDescriptionWrapper>
              <div className="challenge-name">
                {challengeData.challengeTitle}
              </div>

              <ChallengeDescription>
                <div className="title">최소 / 최대 인원:</div>
                <div>{`${challengeData.challengeMinParty} / ${challengeData.challengeMaxParty}명`}</div>
              </ChallengeDescription>
              <ChallengeDescription>
                <div className="title">신청 인원 / 정원:</div>
                <div>{`${challengeData.challengeCurrentParty} / ${challengeData.challengeMaxParty}명`}</div>
              </ChallengeDescription>
              <ChallengeDescription>
                <div className="title2">챌린지 기간:</div>
                <div>{`${challengeData.challengeStartDate} ~ ${challengeData.challengeEndDate}`}</div>
              </ChallengeDescription>
              <ChallengeDescription>
                <div className="title2">챌린지 금액:</div>
                <div>{challengeData.challengeFeePerPerson}원</div>
              </ChallengeDescription>

              {/* 참여버튼 */}
              {new Date() < new Date(challengeData.challengeStartDate) &&
              Number(challengeData.challengeMinParty) !==
                Number(challengeData.challengeMaxParty) ? (
                // {new Date() < new Date(challengeData.challengeStartDate) ? (
                <ButtonWrapper>
                  <button className="custom-btn btn-8">
                    <span onClick={NavigateMPaymentPage}>참여하기</span>
                  </button>
                  {/* <div>공유아이콘</div> */}
                </ButtonWrapper>
              ) : null}
            </ChallengeDescriptionWrapper>
          </div>
        </Recruitment>

        {/* 챌린지 설명 */}
        <Certification>
          <CertificationWrapper>
            <div className="title">챌린지 설명</div>
            <div className="pd-5">{challengeData.challengeDescription}</div>
          </CertificationWrapper>

          {/* 인증 방법 */}
          <CertificationDescription>
            <div className="title">인증 방법 / 인증 예시</div>
            {/* <div style></div> */}
            <div className="pd-5">{challengeData.challengeAuthDescription}</div>
            {/* 인증예시 */}
            <CertificationImage>
              {challengeData.challengeExamImagePath.map((image, index) => {
                return <Image key={index} src={image}></Image>;
              })}
            </CertificationImage>
          </CertificationDescription>
        </Certification>

        <Review>
          <div style={{ marginBottom: '1%' }}>후기 사진</div>
          <Masonry columnsCount={3} gutter="10px">
            {images.map((image, i) => (
              <img
                key={i}
                src={image}
                style={{ width: '100%', display: 'block', cursor: 'pointer' }}
                alt="후기사진들"
                onClick={() => viewImage(image, i)}
              />
            ))}
          </Masonry>
        </Review>
      </Container>
    </>
  );
}
