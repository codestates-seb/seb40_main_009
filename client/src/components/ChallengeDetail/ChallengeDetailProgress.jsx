import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';

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
  CertifiationImageWrapper,
  CertificationImage,
  ViewMore,
  Width,
  ReviewImageWrapper,
  ReviewImage,
  CertificationDescription,
  Image,
} from '../../style/ChallengeDetailProgress/ChallengeDetailProgressStyle';

import Loading from '../Loading/Loading';
import ChartBar from '../ProfileList/ChartBar';
import DdayFormatter from './DdayFormatter';
import Modal from './Modal';
import ImageModal from './ImageModal';

export default function ChallengeDetailProgress() {
  const parmas = useParams();
  const [loading, setLoading] = useState(true);
  const [challenge, setChallenge] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [talk, setTalk] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const memberId = localStorage.getItem('LoginId');
  const memberName = localStorage.getItem('LoginName');

  //url 파라미터값 받아오기
  const challengeId = Number(parmas.id);

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

  // 댓글보내기
  const postTalk = async () => {
    setLoading(true);
    try {
      await axios.post(
        `/challenge-talks`,
        {
          challengeTalkBody: talk,
          challengeId: challenge.challengeId,
        },
        {
          headers: {
            'ngrok-skip-browser-warning': 'none',
            Authorization:
              'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0MUBrYWthby5jb20iLCJpYXQiOjE2Njg1NjQ0OTMsImV4cCI6MTY3Nzc4NDY3M30.U8NmMuT3VVJGhaBbe33gvm5WnEBHQFRFNwogwzLwYNYfa2BdluAbSRPu81y29LGQaLxi-AHvwmd-6ONPwR_KMA',
          },
        }
      );
      alert('성공');
    } catch (error) {
      console.log('error', error);
    }
  };

  // 댓글삭제
  const deleteTalk = async () => {
    setLoading(true);
    try {
      await axios.delete(`/challenge-talks/2`, {
        headers: {
          'ngrok-skip-browser-warning': 'none',
          Authorization:
            'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0MkBrYWthby5jb20iLCJpYXQiOjE2Njg1NjQ0OTMsImV4cCI6MTY3Nzc4NDY3M30.pcx-guhyVpHAQwSwpgoHwkgqXDzGDYhWWp-s-r2iNRSGXYi7ZD1LOILaZc-oM4m6jJJ0hTpyH2rC6YWSBAgU4w',
        },
      });
      alert('삭제성공');
    } catch (error) {
      console.log('error', error);
    }
  };

  //인증하기 모달창 띄우기
  const showCertificationModal = () => {
    setModalOpen(true);
  };

  //인증사진 더보기 모달창 띄우기
  const showImageModal = () => {
    setImageModalOpen(true);
  };

  //챌린지 진행률 계산
  const today = new Date();
  const startDate = new Date(challenge.challengeStartDate);
  const endDate = new Date(challenge.challengeEndDate);

  //챌린지 총 일수
  const distance = endDate.getTime() - startDate.getTime();
  const totalDay = Math.floor(distance / (1000 * 60 * 60 * 24));

  //챌린지 해온 시간
  const gap = today.getTime() - startDate.getTime();
  const pastDay = Math.floor(gap / (1000 * 60 * 60 * 24));
  // console.log('지나온 시간>>', pastDay);
  const progress = Math.ceil((pastDay / totalDay) * 100);
  // console.log('진행률>>>', progress);

  const certificationCount = challenge.challengeCertImages?.filter(
    (member) => member.memberId === 100001
  ).length;

  //early return pattern
  if (loading) return <Loading />;

  return (
    <Container>
      <div>{`조회수 ${challenge.challengeViewCount}`}</div>
      <ChallengeProgress>
        {/* 이미지 */}
        <div className="image">
          <ChallengeImage
            src={challenge.challengeRepImagePath}
            alt="도전 할 항목의 이미지"
          />
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
              <ChartBar percentage={progress} />
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

          <ChallengeDescription>
            <div className="margin_left">도전중인 유저:</div>
            {challenge.participatingMember &&
              challenge.participatingMember.map((member) => {
                return (
                  <div key={challenge.participatingMember.memberId}>
                    {member.participatingMemberName}
                  </div>
                );
              })}
          </ChallengeDescription>
        </ChallengeWrapper>
      </ChallengeProgress>

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
              return <Image key={index} src={image}></Image>;
            })}
          </CertificationImage>
        </CertificationDescription>
      </Certification>

      <Review>
        <div className="flex">
          <div className="marginRight"> 인증 사진</div>
          <div>
            <div>{`인증 횟수  ${certificationCount} / ${challenge.challengeAuthCycle}`}</div>
            {challenge.challengeAuthAvailableTime ===
            dayjs().format('HH:mm') ? (
              <div className="cursur" onClick={showCertificationModal}>
                인증 사진 올리기
              </div>
            ) : null}
            {/* <div className="cursur" onClick={showCertificationModal}>
              인증 사진 올리기
            </div> */}
          </div>
          {modalOpen && (
            <Modal
              setModalOpen={setModalOpen}
              // imageTransform={imageTransform}
              // setImageTransfrom={setImageTransfrom}
              challengeId={challengeId}
            />
          )}
        </div>
        {/* 인증사진 */}
        <CertifiationImageWrapper>
          {challenge.challengeCertImages.slice(0, 8).map((image, index) => {
            return (
              <CertificationImage key={index}>
                {index === 7 ? (
                  <ViewMore key={index}>
                    <div onClick={showImageModal}>더보기</div>
                    {imageModalOpen && (
                      <ImageModal
                        setImageModalOpen={setImageModalOpen}
                        image={challenge.challengeCertImages}
                      />
                    )}
                  </ViewMore>
                ) : (
                  // <Width>
                  <img src={image.imagePath} alt="인증사진들"></img>
                  // </Width>
                )}
              </CertificationImage>
            );
          })}
        </CertifiationImageWrapper>
      </Review>

      <Review>
        <div>후기 사진</div>
        <ReviewImageWrapper>
          {/* {challenge.challengeExamImagePath.map((image) => { */}
          {challenge.challengeReviews.slice(0, 8).map((image, index) => {
            return (
              <ReviewImage key={index}>
                {index === 7 ? (
                  <ViewMore key={index}>
                    <div onClick={showImageModal}>더보기</div>
                    {imageModalOpen && (
                      <ImageModal
                        setImageModalOpen={setImageModalOpen}
                        image={challenge.challengeReviews}
                      />
                    )}
                  </ViewMore>
                ) : (
                  // <Width>
                  <img
                    src={image.challengeReviewImagePath}
                    alt=""
                    style={{ width: '200px' }}
                  />
                  // </Width>
                )}
              </ReviewImage>
            );
          })}
        </ReviewImageWrapper>
      </Review>

      <div style={{ border: '1px solid red', marginTop: '3%' }}>
        <div style={{ display: 'flex' }}>
          <div>{memberName}</div>
          <input
            placeholder="댓글을 작성해주세요."
            onChange={(event) => {
              setTalk(event.target.value);
            }}
            value={talk}
            onKeyUp={(event) => {
              event.target.value.length > 0
                ? setIsValid(true)
                : setIsValid(false);
            }}
          ></input>
          <button onClick={postTalk} disabled={isValid ? false : true}>
            입력
          </button>
        </div>
        <div style={{ border: '1px solid green' }}>
          {challenge.challengeTalks.map((talk) => {
            return (
              <div style={{ display: 'flex' }}>
                <div>{talk.memberBadge}</div>
                <div>{talk.memberName}</div>
                <div>{talk.challengeTalkBody}</div>
                <div>{talk.updated_at}</div>
                {/* 본인이 작성한 것만 authorized,랑 id 로그인 한사람거넣기 */}
                <div>수정</div>
                <div onClick={deleteTalk}>삭제{talk.challengeReviewId}</div>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
}
