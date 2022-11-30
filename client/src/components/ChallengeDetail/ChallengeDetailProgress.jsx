import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import ImageGallery from 'react-image-gallery';

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
  ChallengeViewCount,
} from '../../style/ChallengeDetailProgress/ChallengeDetailProgressStyle';

import Loading from '../Loading/Loading';
import ProgressBar from './ProgressBar';
import DdayFormatter from './DdayFormatter';
import Modal from './Modal';
import ImageModal from './ImageModal';

export default function ChallengeDetailProgress({ challengeData }) {
  const parmas = useParams();
  const [loading, setLoading] = useState(true);
  const [challenge, setChallenge] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [talk, setTalk] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const [progress, setProgress] = useState(0);
  const memberId = localStorage.getItem('LoginId');
  const memberName = localStorage.getItem('LoginName');
  const authorizationToken = localStorage.getItem('authorizationToken');
  //url 파라미터값 받아오기
  const challengeId = Number(parmas.id);
  console.log('dggfgdfgfddf>>>>', challengeData);

  // 댓글보내기
  const postTalk = async () => {
    setLoading(true);
    try {
      await axios.post(
        `/challenge-talks`,
        {
          challengeTalkBody: talk,
          challengeId: challengeData.challengeId,
        },
        {
          headers: {
            'ngrok-skip-browser-warning': 'none',
            Authorization: authorizationToken,
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
          Authorization: authorizationToken,
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

  // if (new Date() < new Date(challengeData.challengeStartDate)) {
  //   setProgress(0);
  // } else {
  //챌린지 진행률 계산
  const today = new Date();
  const startDate = new Date(challengeData.challengeStartDate);
  const endDate = new Date(challengeData.challengeEndDate);

  //챌린지 총 일수
  const distance = endDate.getTime() - startDate.getTime();
  const totalDay = Math.floor(distance / (1000 * 60 * 60 * 24));

  //챌린지 해온 시간
  const gap = today.getTime() - startDate.getTime();
  const pastDay = Math.floor(gap / (1000 * 60 * 60 * 24));
  console.log('지나온 시간>>', pastDay);
  if (pastDay !== 0) {
    //   setProgress(0);
    // } else {
    const progress = Math.ceil((pastDay / totalDay) * 100);
    setProgress(progress);
  }
  // console.log('진행률>>>', progress);
  // }

  const certificationCount = challengeData.challengeCertImages?.filter(
    (member) => member.memberId === 100001
  ).length;

  const images = [
    {
      original: 'https://picsum.photos/id/1018/1000/600/',
      thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
      thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/',
      thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
  ];

  return (
    <Container>
      <ChallengeViewCount>{`조회수 ${challengeData.challengeViewCount}`}</ChallengeViewCount>
      <ChallengeProgress>
        {/* 이미지 */}
        <div className="image">
          <ChallengeImage
            src={challengeData.challengeRepImagePath}
            alt="도전 할 항목의 이미지"
          />
        </div>

        <ChallengeWrapper>
          {/* 챌린지 이름, 디데이 */}
          <ChallengeTitle>
            <div className="title">{challengeData.challengeTitle}</div>
            <div className="d_day">
              <DdayFormatter endDate={challengeData.challengeEndDate} />
            </div>
          </ChallengeTitle>

          <ChallengeDescription>
            <div className="margin_left3">챌린지 진행률:</div>
            <div>
              {/* {new Date() <= new Date(challengeData.challengeStartDate) ? (
                <ProgressBar percentage={0} />
              ) : ( */}
              <ProgressBar percentage={progress} />
              {/* )} */}
              {/* <ProgressBar percentage={progress} /> */}
            </div>
          </ChallengeDescription>

          <ChallengeDescription>
            <div className="margin_left2">참여 인원:</div>
            <div>{`${challengeData.challengeCurrentParty}명`}</div>
          </ChallengeDescription>

          <ChallengeDescription>
            <div className="margin_left">챌린지 기간:</div>
            <div>{`${challengeData.challengeStartDate} ~ ${challengeData.challengeEndDate}`}</div>
          </ChallengeDescription>

          <ChallengeDescription>
            <div className="margin_left">챌린지 금액:</div>
            <div>{challengeData.challengeFeePerPerson}원</div>
          </ChallengeDescription>

          <ChallengeDescription>
            <div className="margin_left">결제한 금액:</div>
            <div>{challengeData.challengeFeePerPerson}원</div>
          </ChallengeDescription>

          <ChallengeDescription>
            <div className="margin_left">도전중인 유저:</div>
            {challengeData.participatingMember &&
              challengeData.participatingMember.map((member) => {
                return (
                  <div key={challengeData.participatingMember.memberId}>
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
          <div className="pd-5">{challengeData.challengeDescription}</div>
        </CertificationWrapper>

        {/* 인증 방법 */}
        <CertificationDescription>
          <div className="title">인증 방법 / 인증 예시</div>
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
        <div className="flex">
          <div className="marginRight"> 인증 사진</div>
          <div>
            <div
              style={{ fontSize: '20px' }}
            >{`인증 횟수:  ${certificationCount} / ${challengeData.challengeAuthCycle}`}</div>
            {challengeData.challengeAuthAvailableTime ===
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
          {challengeData.challengeCertImages &&
            challengeData.challengeCertImages
              .slice(0, 8)
              .map((image, index) => {
                return (
                  <CertificationImage key={index}>
                    {index === 7 ? (
                      <ViewMore key={index}>
                        <div onClick={showImageModal}>더보기</div>
                        {imageModalOpen && (
                          <ImageModal
                            setImageModalOpen={setImageModalOpen}
                            image={challengeData.challengeCertImages}
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
          <ImageGallery items={images} />
          {/* {challenge.challengeReviews &&
            challenge.challengeReviews.slice(0, 8).map((image, index) => {
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
            })} */}
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
          {challengeData.challengeTalks &&
            challengeData.challengeTalks.map((talk) => {
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
