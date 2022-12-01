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
import fs from 'fs';
import Loading from '../Loading/Loading';
import ProgressBar from './ProgressBar';
import DdayFormatter from './DdayFormatter';
import Modal from './Modal';
import ImageModal from './ImageModal';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

export default function ChallengeDetailProgress({ challengeData }) {
  const parmas = useParams();
  const [loading, setLoading] = useState(true);
  const [challenge, setChallenge] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [talk, setTalk] = useState([]);
  const [isValid, setIsValid] = useState(false);
  // const [progress, setProgress] = useState(0);
  const memberId = localStorage.getItem('LoginId');
  const memberName = localStorage.getItem('LoginName');
  const [imageData, setImageData] = useState({ image: '', i: 0 });
  const [imageDataAll, setImageDataAll] = useState(false);
  const [certificationImageData, setCertificationImageData] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);
  const [image, setImage] = useState();
  const [reviewContent, setReviewContent] = useState('');
  const [reviewTitle, setReviewTtile] = useState('');

  const authorizationToken = localStorage.getItem('authorizationToken');
  const loginId = localStorage.getItem('LoginId');
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
      window.location.reload();
    } catch (error) {
      console.log('error', error);
    }
  };

  // 댓글삭제
  const deleteTalk = async (index) => {
    setLoading(true);
    try {
      await axios.delete(
        `/challenge-talks/${challengeData.challengeTalks[index].challengeTalkId}`,
        {
          headers: {
            'ngrok-skip-browser-warning': 'none',
            Authorization: authorizationToken,
          },
        }
      );
      alert('삭제성공');
    } catch (error) {
      console.log('error', error);
    }
  };

  //인증하기 모달창 띄우기
  const showCertificationModal = () => {
    setModalOpen(true);
  };

  const uploadReview = async () => {
    setLoading(true);
    const FormData = require('form-data');
    let data = new FormData();
    const fs = require('fs');

    const textData = {
      challengeId: challengeId,
      challengeReviewTitle: reviewTitle,
      challengeReviewContent: reviewContent,
      challengeReviewStar: 0,
      challengeReviewImagePath: image,
    };
    const stringData = new Blob([textData], { type: 'application/json' });

    data.append('post', stringData);
    // data.append('post', '');
    data.append('review', image);
    try {
      await axios.post(
        `/challenge-reviews`,
        {
          data,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'ngrok-skip-browser-warning': 'none',
            Authorization: authorizationToken,
          },
        }
      );
      alert('성공');
      window.location.reload();
    } catch (error) {
      console.log('error', error);
    }
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
  let progress = Math.ceil((pastDay / totalDay) * 100);
  // setProgress(progress);
  if (pastDay <= 0) {
    //도전시작하기전
    progress = 0;
    //   setProgress(0);
    // } else {
  }
  // console.log('진행률>>>', progress);
  // }

  const certificationCount = challengeData.challengeCertImages?.filter(
    (member) => member.memberId === 100001
  ).length;

  const images = [
    'https://picsum.photos/2000/3000',
    'https://picsum.photos/3000/2000',
    'https://picsum.photos/4000/3000',
    'https://picsum.photos/3000/1500',
    'https://picsum.photos/2000/3000',
    'https://picsum.photos/3000/200',
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

  const viewCertificationImageAll = () => {
    setCertificationImageData(true);
  };

  const viewImageAll = () => {
    setImageDataAll(true);
  };

  const uploadReviewModal = () => {
    setReviewModal(true);
  };

  const imageAction = (action) => {
    let i = imageData.i;
    if (action === 'next-image') {
      // images 이거 인증사진이랑 후기사진값으로 바꾸기
      setImageData({ image: images[i + 1], i: i + 1 });
    }
    if (action === 'previous-image') {
      setImageData({ image: images[i - 1], i: i - 1 });
    }
    if (!action) {
      setImageData({ image: '', i: 0 });
    }
    if (action === 'image-all') {
      setImageDataAll(false);
    }
    if (action === 'certidication-image-all') {
      setCertificationImageData(false);
    }
    if (action === 'review') {
      setReviewModal(false);
    }
  };

  return (
    <>
      {/* 후기작성  */}
      {reviewModal && (
        <div
          style={{
            width: '100%',
            height: '100vh',
            // background: 'black',
            position: 'fixed',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflowY: 'auto',
            zIndex: 10000,
          }}
        >
          <div
            style={{
              backgroundColor: '#EFF1FE',
              width: '30%',
              height: '30%',
              borderRadius: '20px',
              padding: '2%',
            }}
          >
            <div style={{ display: 'flex' }}>
              <div
                style={{
                  fontSize: '25px',
                  margin: '0 auto',
                  marginBottom: '2%',
                }}
              >
                후기 작성
              </div>
              <button onClick={() => imageAction('review')} style={{}}>
                X
              </button>
            </div>

            <div style={{ display: 'flex', marginBottom: '2%' }}>
              <div>제목:</div>
              <input
                onChange={(event) => {
                  setReviewTtile(event.target.value);
                }}
              ></input>
            </div>
            <div style={{ display: 'flex', marginBottom: '2%' }}>
              <div>내용:</div>
              <textarea
                onChange={(event) => {
                  setReviewContent(event.target.value);
                }}
              ></textarea>
            </div>
            <div>이미지</div>
            <input
              type={'file'}
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            />
          </div>
          <button onClick={uploadReview}>후기 올리기</button>
        </div>
      )}

      {/* 인증사진전체보기 */}
      {certificationImageData && (
        <div
          style={{
            width: '100%',
            height: '100vh',
            background: 'black',
            position: 'fixed',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflowY: 'auto',
            zIndex: 10000,
          }}
        >
          <button
            onClick={() => imageAction('certidication-image-all')}
            style={{ position: 'absolute', top: '10px', right: '10px' }}
          >
            X
          </button>
          <Masonry columnsCount={3} gutter="10px">
            {challengeData.challengeCertImages.map((image, i) => (
              <img
                key={i}
                src={image.imagePath}
                style={{ width: '100%', display: 'block', cursor: 'pointer' }}
                alt="후기사진들"
              />
            ))}
          </Masonry>
        </div>
      )}

      {/* 후기사진 전체보기 */}
      {imageDataAll && (
        <div
          style={{
            width: '100%',
            height: '100vh',
            background: 'black',
            position: 'fixed',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflowY: 'auto',
            zIndex: 10000,
          }}
        >
          <button
            onClick={() => imageAction('image-all')}
            style={{ position: 'absolute', top: '10px', right: '10px' }}
          >
            X
          </button>
          <Masonry columnsCount={3} gutter="10px">
            {challengeData.challengeReviews.map((image, i) => (
              <img
                key={i}
                src={image.challengeReviewImagePath}
                style={{ width: '100%', display: 'block', cursor: 'pointer' }}
                alt="후기사진들"
              />
            ))}
          </Masonry>
        </div>
      )}

      {/* 이미지 하나씩 */}
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
                <ProgressBar percentage={progress} />
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
            </div>
            {modalOpen && (
              <Modal setModalOpen={setModalOpen} challengeId={challengeId} />
            )}
          </div>
          {/* 인증사진 */}
          {challengeData.challengeCertImages.length === 0 ||
          challengeData.challengeCertImages.length === null ? (
            <div
              role="img"
              aria-label="writing hand"
              style={{
                border: '2px solid #eff1fe',
                width: '100%',
                height: '450px',
                marginTop: '1%',
                fontSize: '20px',
                display: 'flex',
                justifyContent: 'center',
                borderRadius: '20px',
                alignItems: 'center',
              }}
            >
              인증사진을 올려주세요.😊
            </div>
          ) : (
            <CertifiationImageWrapper>
              {challengeData.challengeCertImages
                .slice(0, 8)
                .map((image, index) => {
                  return (
                    <CertificationImage key={index}>
                      {index === 7 ? (
                        <ViewMore key={index}>
                          <div onClick={viewCertificationImageAll}>더보기</div>
                        </ViewMore>
                      ) : (
                        <img
                          key={index}
                          src={image.imagePath}
                          alt="인증사진들"
                          style={{ width: '200px', cursor: 'pointer' }}
                          onClick={() => viewImage(image, index)}
                        />
                      )}
                    </CertificationImage>
                  );
                })}
            </CertifiationImageWrapper>
          )}
        </Review>

        <Review>
          <div style={{ display: 'flex' }}>
            <div style={{ marginRight: 'auto' }}>후기 사진</div>

            <button style={{ fontSize: '15px' }} onClick={uploadReviewModal}>
              후기 올리기
            </button>
          </div>
          {challengeData.challengeReviews === null ? (
            <div
              role="img"
              aria-label="writing hand"
              style={{
                border: '2px solid #eff1fe',
                width: '100%',
                height: '450px',
                marginTop: '1%',
                fontSize: '20px',
                display: 'flex',
                justifyContent: 'center',
                borderRadius: '20px',
                alignItems: 'center',
              }}
            >
              인증사진을 올려주세요.😊
            </div>
          ) : (
            <ReviewImageWrapper>
              {challengeData.challengeReviews
                .slice(0, 8)
                .map((image, index) => {
                  return (
                    <ReviewImage key={index}>
                      {index === 7 ? (
                        <ViewMore key={index}>
                          <div onClick={viewImageAll}>더보기</div>
                        </ViewMore>
                      ) : (
                        <img
                          key={index}
                          src={image.challengeReviewImagePath}
                          alt="후기사진들"
                          style={{ width: '200px', cursor: 'pointer' }}
                          onClick={() => viewImage(image, index)}
                        />
                      )}
                    </ReviewImage>
                  );
                })}
            </ReviewImageWrapper>
          )}
        </Review>

        <div style={{ marginTop: '3%' }}>
          {/* <div style={{}}>댓글 {challengeData.challengeTalks?.length}</div> */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ marginRight: '5%' }}>{memberName}</div>
            <input
              style={{
                width: '76%',
                borderTop: 'none',
                borderLeft: 'none',
                borderRight: 'none',
                borderBottom: '2px solid #8673FF',
              }}
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
            <button
              style={{
                marginLeft: '5%',
                width: '5%',
                backgroundColor: '#8673FF',
                border: 'none',
                borderRadius: '5px',
                color: '#F2F4FE',
              }}
              onClick={postTalk}
              disabled={isValid ? false : true}
            >
              입력
            </button>
          </div>
          <div
            style={{
              border: '2px solid #EFF1FE',
              padding: '1% 1% 0 1%',
              borderRadius: '10px',
              marginTop: '2%',
            }}
          >
            {challengeData.challengeTalks?.map((talk, index) => {
              return (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '1%',
                    borderBottom: '2px solid #EFF1FE',
                  }}
                  key={index}
                >
                  {/* <div>{talk.memberBadge}</div> */}
                  <div style={{ marginRight: '5%' }}>{talk.memberName}</div>
                  <div style={{ width: '58%' }}>{talk.challengeTalkBody}</div>
                  <div>{talk.updated_at}</div>
                  {Number(loginId) === Number(talk.memberId) ? (
                    <>
                      {/* <button
                        style={{
                          marginLeft: '2%',
                          width: '5%',
                          backgroundColor: '#8673FF',
                          border: 'none',
                          borderRadius: '5px',
                          color: '#F2F4FE',
                        }}
                        onClick={() => editTalk(index)}
                      >
                        수정
                      </button> */}
                      <button
                        style={{
                          marginLeft: '1%',
                          width: '5%',
                          backgroundColor: '#8673FF',
                          border: 'none',
                          borderRadius: '5px',
                          color: '#F2F4FE',
                        }}
                        onClick={() => deleteTalk(index)}
                      >
                        삭제
                      </button>
                    </>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </>
  );
}
