import axios from 'axios';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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
  CertificationImage,
  ViewMore,
  ReviewImage,
  CertificationDescription,
  Image,
  ChallengeViewCount,
  ReviewWrapper,
  CertificationModal,
  CertificationModalWrapper,
  Center,
  CertImage,
  Button,
  ImageCenter,
  CertModal,
  ModalTtile,
  ModalTextarea,
  CertificationModalImage,
  ShowCertImage,
  ShowReviewImage,
  ReviewImg,
  ReviewImgWrapper,
  ReviewTitle,
  User,
  ParticipateUser,
  ParticipateUserName,
  NextChallenge,
  ButtonType,
  CertTime,
  CertificationTtime,
  NonReviewList,
  List,
  CertButtonType,
  Comment,
  CommentButton,
  CommentList,
  CommentWrapper,
  DeleteButton,
} from '../../style/ChallengeDetailProgress/ChallengeDetailProgressStyle';

import dayjs from 'dayjs';
import ProgressBar from './ProgressBar';
import DdayFormatter from './DdayFormatter';
import Masonry from 'react-responsive-masonry';
import Swal from 'sweetalert2';
import exampleImage from '../../image/example.png';
import { checkImageSize } from '../../function/checkImageSize';
// import Loading from '../Loading/Loading';

export default function ChallengeDetailProgress({ challengeData }) {
  const parmas = useParams();
  const [loading, setLoading] = useState(true);
  const [certificationModal, setCertificationModal] = useState(false);
  const [talk, setTalk] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const [imageData, setImageData] = useState({ image: '', i: 0 });
  const [certificationImages, setCertificationImages] = useState({
    image: '',
    i: 0,
  });
  const [imageDataAll, setImageDataAll] = useState(false);
  const [certificationImageData, setCertificationImageData] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);
  const [image, setImage] = useState();
  const [reviewContent, setReviewContent] = useState('');
  const [reviewTitle, setReviewTtile] = useState('');
  const [imageTransform, setImageTransfrom] = useState(exampleImage);

  const navigate = useNavigate();
  //로컬스토리지 값
  const memberName = localStorage.getItem('LoginName');
  const authorizationToken = localStorage.getItem('authorizationToken');
  const loginId = localStorage.getItem('LoginId');

  //url 파라미터값 받아오기
  const challengeId = Number(parmas.id);

  const Toast = Swal.mixin({
    toast: true,
    position: 'center-center',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  // 댓글보내기
  const postTalk = async () => {
    setLoading(true);
    try {
      await axios
        .post(
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
        )
        .then(() => {
          Toast.fire({
            icon: 'success',
            title: `${memberName}님의 댓글이 추가 되었습니다.`,
          });
          window.location.reload();
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

  // 댓글삭제
  const deleteTalk = async (index) => {
    setLoading(true);
    try {
      await axios
        .delete(
          `/challenge-talks/${challengeData.challengeTalks[index].challengeTalkId}`,
          {
            headers: {
              'ngrok-skip-browser-warning': 'none',
              Authorization: authorizationToken,
            },
          }
        )
        .then(() => {
          Toast.fire({
            icon: 'success',
            title: `${memberName}님의 댓글이 삭제 되었습니다.`,
          });
          window.location.reload();
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

  //후기 생성
  const uploadReview = async () => {
    setLoading(true);

    const textData = {
      challengeId: challengeId,
      challengeReviewTitle: reviewTitle,
      challengeReviewContent: reviewContent,
      challengeReviewStar: 0,
    };
    const dataValue = JSON.stringify(textData);
    const stringData = new Blob([dataValue], { type: 'application/json' });

    try {
      await axios
        .post(
          `/challenge-reviews`,
          {
            post: stringData,
            review: image,
          },
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'ngrok-skip-browser-warning': 'none',
              Authorization: authorizationToken,
            },
          }
        )
        .then(() => {
          Toast.fire({
            icon: 'success',
            title: `${memberName}님의 후기가 추가 되었습니다.`,
          });
          window.location.reload();
        });
    } catch (error) {
      // 후기한번쓰면 못쓰게 alert띄우기
      const errorMessage = error.response.data.error.message;

      if ('ChallengeReview not found' === errorMessage) {
        Swal.fire({
          icon: 'error',
          title: '후기작성은 한번만 가능합니다.',
          text: `이미 후기를 작성하셨습니다.`,
        }).then((result) => {
          if (result.isConfirmed) {
            setReviewModal(false);
          }
        });
      }

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
    }
  };

  //인증샷 올리기
  const uploadCertification = async () => {
    setLoading(true);

    try {
      await axios
        .patch(
          `/challenges/cert/${challengeId}`,
          {
            cert: image,
          },
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'ngrok-skip-browser-warning': 'none',
              Authorization: authorizationToken,
            },
          }
        )
        .then(() => {
          Toast.fire({
            icon: 'success',
            title: `${memberName}님의 인증이 완료되었습니다.`,
          });
          window.location.reload();
        });
    } catch (error) {
      const errorMessage = error.response.data.error.message;
      // console.log('error', errorMessage);
      if (
        'Must upload certification photo at the appropriate time' ===
        errorMessage
      ) {
        Swal.fire({
          icon: 'error',
          title: '인증시간이 아닙니다.',
          text: `인증시간에 인증사진을 올려주세요.`,
        }).then((result) => {
          if (result.isConfirmed) {
            setCertificationModal(false);
          }
        });
      }
      // 토큰값 없을때
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
    }
  };

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
  let progress = Math.ceil((pastDay / totalDay) * 100);

  //도전시작하기전
  if (pastDay < 0) {
    progress = 0;
  }

  //당일 챌린지일 때
  if (startDate === endDate) {
    progress = 100;
  }

  //챌린지 종료 후
  if (endDate < today) {
    progress = 100;
  }

  const leftDay = Math.abs(pastDay);

  //인증사진올리기 모달창
  const showCertificationModal = () => {
    setCertificationModal(true);
  };

  //인증사진 하나씩
  const viewCertificationImage = (image, i) => {
    setCertificationImages({ image, i });
  };

  //인증사진 전체보기
  const viewCertificationImageAll = () => {
    setCertificationImageData(true);
  };

  const certificationImageAction = (action) => {
    // 인증사진

    if (action === 'certification') {
      setCertificationModal(false);
    }

    if (!action) {
      setCertificationImages({ image: '', i: 0 });
    }
  };

  //후기사진 하나씩
  const viewImage = (image, i) => {
    setImageData({ image, i });
  };

  //후기사진 전체보기
  const viewImageAll = () => {
    setImageDataAll(true);
  };

  //후기올리기 모달창
  const uploadReviewModal = () => {
    setReviewModal(true);
  };

  const imageAction = (action) => {
    // 후기사진
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

  //이미지 미리보기
  const imageUpload = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageTransfrom(reader.result);
        resolve();
      };
    });
  };

  //도전 취소
  const challengeDrop = async () => {
    const response = await Swal.fire({
      icon: 'question',
      title: '재확인',
      text: `${challengeData.challengeTitle}도전을 취소하시겠습니까?`,
      showCancelButton: true,
      confirmButtonText: '네',
      cancelButtonText: '아니요!',
    });
    if (response.isConfirmed) {
      try {
        await axios
          .post(
            `/challenges/unparticipate/${challengeId}`,
            {
              data: '',
            },
            {
              headers: {
                'ngrok-skip-browser-warning': 'none',
                Authorization: authorizationToken,
              },
            }
          )
          .then((response) => {
            Toast.fire({
              icon: 'success',
              title: `${challengeData.challengeTitle}도전이 취소 되었습니다.`,
            });
            localStorage.setItem(
              'memberMoney',
              response.data.data.currentMemberMoney
            );
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          });
      } catch (error) {
        console.log('error', error);

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
      }
    }
  };

  // 챌린지삭제
  const deleteChallenge = async () => {
    setLoading(true);
    try {
      await axios
        .delete(`/challenges/${challengeId}`, {
          headers: {
            'ngrok-skip-browser-warning': 'none',
            Authorization: authorizationToken,
          },
        })
        .then(() => {
          Toast.fire({
            icon: 'success',
            title: `${challengeData.challengeTitle}가 삭제 되었습니다.`,
          });
          return navigate(`/challengelist`);
        });
    } catch (error) {
      console.log('error', error);
      const errorMessage = error.response.data.error.message;
      // console.log('error', errorMessage);
      if ('Challenge already started' === errorMessage) {
        Swal.fire({
          icon: 'error',
          title: '시작한 챌린지는 삭제할 수 없습니다.',
          text: `이미 사작한 챌린지입니다.`,
        });
      }

      if ('The member does not have permission' === errorMessage) {
        Swal.fire({
          icon: 'error',
          title: '챌린지 개설자만 삭제가능합니다.',
          text: `삭제 권한이 없습니다.`,
        });
      }

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
    }
  };

  return (
    <>
      {/* 인증사진 모달*/}
      {certificationModal && (
        <CertificationModal>
          <CertificationModalWrapper>
            <Center>
              <CertImage>인증사진</CertImage>
              <Button onClick={() => certificationImageAction('certification')}>
                X
              </Button>
            </Center>

            {imageTransform !== '' ? (
              <img
                src={imageTransform}
                alt="업로드한 이미지 미리보기"
                style={{ width: '200px', height: '200px', marginBottom: '2%' }}
              />
            ) : null}
            <input
              type={'file'}
              onChange={(e) => {
                if (checkImageSize(e.target.files)) {
                  imageUpload(e.target.files[0]);
                  setImage(e.target.files[0]);
                }
              }}
              style={{ marginBottom: '4%', color: '#8673FF' }}
            />
            <ImageCenter>
              <Button onClick={uploadCertification}>인증사진 올리기</Button>
            </ImageCenter>
          </CertificationModalWrapper>
        </CertificationModal>
      )}

      {/* 후기작성 모달 */}
      {reviewModal && (
        <CertificationModal>
          <CertModal>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <CertImage>후기 작성</CertImage>
              <Button onClick={() => imageAction('review')}>X</Button>
            </div>

            <div style={{ display: 'flex', marginBottom: '2%' }}>
              <div>제목</div>
              <ModalTtile
                onChange={(event) => {
                  setReviewTtile(event.target.value);
                }}
              ></ModalTtile>
            </div>
            <div style={{ display: 'flex', marginBottom: '2%' }}>
              <div>내용</div>
              <ModalTextarea
                style={{
                  margin: '0 2%',
                  width: '80%',
                  border: 'none',
                  fontSize: '17px',
                  borderRadius: '5px',
                  resize: 'none',
                  height: '100px',
                }}
                onChange={(event) => {
                  setReviewContent(event.target.value);
                }}
              ></ModalTextarea>
            </div>
            <div>이미지</div>
            <input
              style={{ marginTop: '1%', marginBottom: '3%', color: '#8673FF' }}
              type={'file'}
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            />
            <ImageCenter>
              <Button onClick={uploadReview}>후기 올리기</Button>
            </ImageCenter>
          </CertModal>
        </CertificationModal>
      )}

      {/* 인증사진전체보기 */}
      {certificationImageData && (
        <CertificationModalImage>
          <button
            onClick={() => imageAction('certidication-image-all')}
            style={{ position: 'absolute', top: '10px', right: '10px' }}
          >
            X
          </button>
          <div style={{ width: '80%', marginTop: '60%', marginBottom: '1.5%' }}>
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
        </CertificationModalImage>
      )}

      {/* 후기사진 전체보기 */}
      {imageDataAll && (
        <CertificationModalImage>
          <button
            onClick={() => imageAction('image-all')}
            style={{ position: 'absolute', top: '10px', right: '10px' }}
          >
            X
          </button>
          <div style={{ width: '80%', marginTop: '60%', marginBottom: '1.5%' }}>
            <Masonry
              columnsCount={3}
              gutter="10px"
              style={{ marginTop: '109.5%', marginBottom: '1.5%' }}
            >
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
        </CertificationModalImage>
      )}

      {/* 인증이미지 하나씩 */}
      {certificationImages.image && (
        <ShowCertImage>
          <button
            onClick={() => certificationImageAction()}
            style={{ position: 'absolute', top: '10px', right: '10px' }}
          >
            X
          </button>
          <img
            src={certificationImages.image}
            style={{ width: 'auto', maxWidth: '90%', maxHeight: '90%' }}
            alt="이미지크게보기"
          />
        </ShowCertImage>
      )}

      {/* 후기이미지 하나씩 */}
      {imageData.image && (
        <ShowReviewImage>
          <ReviewImg>
            <button
              onClick={() => imageAction()}
              style={{ position: 'absolute', top: '10px', right: '10px' }}
            >
              X
            </button>
            <img
              src={imageData.image}
              style={{ width: 'auto', maxWidth: '90%', maxHeight: '90%' }}
              alt="이미지크게보기"
            />
          </ReviewImg>
          <ImageCenter>
            <ReviewImgWrapper>
              <ReviewTitle>
                <div style={{ marginRight: '2%' }}>제목:</div>
                <div>
                  {
                    challengeData.challengeReviews[imageData.i]
                      .challengeReviewTitle
                  }
                </div>
              </ReviewTitle>
              <div style={{ display: 'flex' }}>
                <div style={{ marginRight: '2.5%' }}>내용:</div>
                <div>
                  {
                    challengeData.challengeReviews[imageData.i]
                      .challengeReviewContent
                  }
                </div>
              </div>
            </ReviewImgWrapper>
          </ImageCenter>
        </ShowReviewImage>
      )}

      <Container>
        <div style={{ display: 'flex' }}>
          <ChallengeViewCount>{`조회수 ${challengeData.challengeViewCount}`}</ChallengeViewCount>

          <Button onClick={deleteChallenge}>삭제</Button>
        </div>
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
              {pastDay < 0 ? (
                <div className="d_day">챌린지 시작까지 {leftDay}일</div>
              ) : (
                <div className="d_day">
                  <DdayFormatter endDate={challengeData.challengeEndDate} />
                </div>
              )}
            </ChallengeTitle>

            <ChallengeDescription>
              <div className="margin_right3">챌린지 진행률:</div>
              <div>
                <ProgressBar percentage={progress} />
              </div>
            </ChallengeDescription>

            <ChallengeDescription>
              <div className="margin_right4">참여 인원:</div>
              <div>{`${challengeData.challengeCurrentParty} 명`}</div>
            </ChallengeDescription>

            <ChallengeDescription>
              <div className="margin_right">챌린지 기간:</div>
              <div>{`${challengeData.challengeStartDate} ~ ${challengeData.challengeEndDate}`}</div>
            </ChallengeDescription>

            <ChallengeDescription>
              <div className="margin_right">챌린지 금액:</div>
              <div>
                {challengeData.challengeFeePerPerson
                  .toString()
                  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
                &nbsp; 포인트
              </div>
            </ChallengeDescription>

            <ChallengeDescription>
              <div className="margin_right">결제한 금액:</div>
              <div>
                {challengeData.challengeFeePerPerson
                  .toString()
                  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
                &nbsp; 포인트
              </div>
            </ChallengeDescription>

            <User>
              <div style={{ width: '127px' }} className="margin_right3">
                도전중인 유저:
              </div>
              <ParticipateUser>
                {challengeData.participatingMember &&
                  challengeData.participatingMember.map((member, index) => {
                    return (
                      <ParticipateUserName
                        key={challengeData.participatingMember.memberId}
                      >
                        <div>{member.participatingMemberName}</div>
                      </ParticipateUserName>
                    );
                  })}
              </ParticipateUser>
            </User>

            <NextChallenge>
              {pastDay < 0 ? (
                <ButtonType onClick={challengeDrop}>다음에 도전</ButtonType>
              ) : null}
            </NextChallenge>
          </ChallengeWrapper>
        </ChallengeProgress>

        <Certification>
          <CertificationWrapper>
            <div className="title">챌린지 설명</div>
            <div className="pd-5" style={{ 'white-space': 'pre-line' }}>
              {challengeData.challengeDescription}
            </div>
          </CertificationWrapper>

          {/* 인증 방법 */}
          <CertificationDescription>
            <div className="title">인증 방법 / 인증 예시</div>
            <div className="pd-5" style={{ 'white-space': 'pre-line' }}>
              {challengeData.challengeAuthDescription}
            </div>
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
            <div
              style={{ color: '#787878', fontSize: '15px', marginRight: '8px' }}
            >
              인증은 10분까지 가능합니다.
            </div>
            {/* <div> */}
            <div
              style={{ fontSize: '20px' }}
            >{`인증 횟수:  ${challengeData.challengeCurrentMemberTodayAuth} / ${challengeData.challengeAuthCycle}`}</div>

            {pastDay < 0 ? null : (
              <ButtonType className="cursur" onClick={showCertificationModal}>
                인증 사진 올리기
              </ButtonType>
            )}
          </div>

          <CertTime>
            {challengeData.challengeAuthAvailableTime.map((time, index) => {
              return (
                <>
                  <CertificationTtime>
                    {index + 1}번째 인증시간:
                  </CertificationTtime>
                  <div>{time}</div>
                </>
              );
            })}
          </CertTime>

          {/* 인증사진 */}
          {challengeData.challengeCertImages.length === 0 ||
          challengeData.challengeCertImages.length === null ? (
            <NonReviewList role="img" aria-label="writing hand">
              인증사진을 올려주세요.😊
            </NonReviewList>
          ) : (
            <List>
              {challengeData.challengeCertImages
                .slice(0, 8)
                .map((image, index) => {
                  return (
                    <ReviewImage key={index}>
                      {index === 7 ? (
                        <ViewMore
                          key={index}
                          onClick={viewCertificationImageAll}
                        >
                          <div style={{ color: '#ffff' }}>더보기</div>
                        </ViewMore>
                      ) : (
                        <img
                          key={index}
                          src={image.imagePath}
                          alt="인증사진들"
                          style={{
                            width: '220px',
                            height: '220px',
                            cursor: 'pointer',
                          }}
                          onClick={() =>
                            viewCertificationImage(image.imagePath, index)
                          }
                        />
                      )}
                    </ReviewImage>
                  );
                })}
            </List>
          )}
        </Review>

        <ReviewWrapper style={{ marignTop: '1000px' }}>
          <div style={{ display: 'flex' }}>
            <div style={{ marginRight: 'auto' }}>후기 사진</div>

            <CertButtonType onClick={uploadReviewModal}>
              후기 올리기
            </CertButtonType>
          </div>
          {challengeData.challengeReviews === null ? (
            <NonReviewList role="img" aria-label="writing hand">
              후기를 올려주세요.😊
            </NonReviewList>
          ) : (
            <List>
              {challengeData.challengeReviews
                .slice(0, 8)
                .map((image, index) => {
                  return (
                    <ReviewImage key={index}>
                      {index === 7 ? (
                        <ViewMore key={index} onClick={viewImageAll}>
                          <div style={{ color: '#ffff' }}>더보기</div>
                        </ViewMore>
                      ) : (
                        <img
                          key={index}
                          src={image.challengeReviewImagePath}
                          alt="후기사진들"
                          style={{
                            width: '220px',
                            height: '220px',
                            cursor: 'pointer',
                          }}
                          onClick={() =>
                            viewImage(image.challengeReviewImagePath, index)
                          }
                        />
                      )}
                    </ReviewImage>
                  );
                })}
            </List>
          )}
        </ReviewWrapper>

        <div style={{ marginTop: '8%' }}>
          {challengeData.challengeTalks === null ? (
            <div style={{ fontSize: '25px', marginBottom: '3px' }}>댓글 0</div>
          ) : (
            <div style={{ fontSize: '25px', marginBottom: '3px' }}>
              댓글 {challengeData.challengeTalks?.length}
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ marginRight: '5%' }}>{memberName}</div>
            <Comment
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
            ></Comment>
            <CommentButton onClick={postTalk} disabled={isValid ? false : true}>
              입력
            </CommentButton>
          </div>
          {challengeData.challengeTalks === null ? null : (
            <CommentList>
              {challengeData.challengeTalks?.map((talk, index) => {
                return (
                  <CommentWrapper key={index}>
                    <div style={{ marginRight: '5%' }}>{talk.memberName}</div>
                    <div style={{ marginRight: 'auto' }}>
                      {talk.challengeTalkBody}
                    </div>
                    <div>
                      {dayjs(new Date(talk.updated_at)).format(
                        'YYYY-MM-DD HH:mm'
                      )}
                    </div>
                    {Number(loginId) === Number(talk.memberId) ? (
                      <>
                        <DeleteButton onClick={() => deleteTalk(index)}>
                          삭제
                        </DeleteButton>
                      </>
                    ) : null}
                  </CommentWrapper>
                );
              })}
            </CommentList>
          )}
        </div>
      </Container>
    </>
  );
}
