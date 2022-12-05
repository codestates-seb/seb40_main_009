import axios from 'axios';
import { useState, useEffect } from 'react';
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
} from '../../style/ChallengeDetailProgress/ChallengeDetailProgressStyle';

import ProgressBar from './ProgressBar';
import DdayFormatter from './DdayFormatter';
import Masonry from 'react-responsive-masonry';
import Swal from 'sweetalert2';
import exampleImage from '../../image/example.png';
// import Loading from '../Loading/Loading';

export default function ChallengeDetailProgress({ challengeData }) {
  // console.log('challengeData>>>', challengeData);
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
      // .catch(async (error) => {
      //   if (error.response.data.status === 401) {
      //     try {
      //       const responseToken = await axios.get('/token', {
      //         headers: {
      //           'ngrok-skip-browser-warning': 'none',
      //           refresh: localStorage.getItem('refreshToken'),
      //         },
      //       });
      //       await localStorage.setItem(
      //         'authorizationToken',
      //         responseToken.headers.authorization
      //       );
      //       await localStorage.setItem(
      //         'test',
      //         responseToken.headers.authorization
      //       );
      //     } catch (error) {
      //       console.log('재요청 실패', error);
      //     }
      //   }
      // });
    } catch (error) {
      // 후기한번쓰면 못쓰게 alert띄우기
      const errorMessage = error.response.data.error.message;
      // console.log('error>>>>>>>>>>>', errorMessage);

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
      // .catch(async (error) => {
      //   if (error.response.data.status === 401) {
      //     try {
      //       const responseToken = await axios.get('/token', {
      //         headers: {
      //           'ngrok-skip-browser-warning': 'none',
      //           refresh: localStorage.getItem('refreshToken'),
      //         },
      //       });
      //       await localStorage.setItem(
      //         'authorizationToken',
      //         responseToken.headers.authorization
      //       );
      //       await localStorage.setItem(
      //         'test',
      //         responseToken.headers.authorization
      //       );
      //     } catch (error) {
      //       console.log('재요청 실패', error);
      //     }
      //   }
      // });
    } catch (error) {
      const errorMessage = error.response.data.error.message;
      // const errorMessage = error.response.data;
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
  // console.log('지나온 시간>>', pastDay);
  let progress = Math.ceil((pastDay / totalDay) * 100);

  //도전시작하기전
  if (pastDay < 0) {
    progress = 0;
  }

  if (pastDay === 0) {
    progress = 100;
  }

  if (endDate < today) {
    progress = 100;
  }

  const leftDay = Math.abs(pastDay);
  // console.log('진행률>>>', progress);

  //인증횟수 계산
  const certificationCount = challengeData.challengeCertImages?.filter(
    (member) => member.memberId !== loginId
  ).length;

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
    // let i = certificationImages.i;

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
    // let i = imageData.i;

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
        console.log('22222222');
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
          .then(() => {
            Toast.fire({
              icon: 'success',
              title: `${challengeData.challengeTitle}도전이 취소 되었습니다.`,
            });
            // return navigate(`/detail/${challengeId}`);
            window.location.reload();
          });
        // .catch(async (error) => {
        //   if (error.response.data.status === 401) {
        //     try {
        //       const responseToken = await axios.get('/token', {
        //         headers: {
        //           'ngrok-skip-browser-warning': 'none',
        //           refresh: localStorage.getItem('refreshToken'),
        //         },
        //       });
        //       await localStorage.setItem(
        //         'authorizationToken',
        //         responseToken.headers.authorization
        //       );
        //       await localStorage.setItem(
        //         'test',
        //         responseToken.headers.authorization
        //       );
        //     } catch (error) {
        //       console.log('재요청 실패', error);
        //     }
        //   }
        // });
      } catch (error) {
        console.log('error', error);
      }
    }
  };

  return (
    <>
      {/* 인증사진 모달*/}
      {certificationModal && (
        <div
          style={{
            width: '100%',
            height: '100vh',
            position: 'fixed',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflowY: 'auto',
          }}
        >
          <div
            style={{
              backgroundColor: '#EFF1FE',
              width: '20%',
              height: '60%',
              borderRadius: '20px',
              padding: '2%',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  fontSize: '25px',
                  margin: '0 auto',
                  marginBottom: '2%',
                }}
              >
                인증사진
              </div>
              <button
                onClick={() => certificationImageAction('certification')}
                style={{
                  backgroundColor: '#8673FF',
                  border: '#8673FF',
                  color: '#ffff',
                  borderRadius: '5px',
                  fontSize: '17px',
                }}
              >
                X
              </button>
            </div>

            {imageTransform !== '' ? (
              <img
                src={imageTransform}
                alt="업로드한 이미지 미리보기"
                style={{ width: '400px', height: '400px', marginBottom: '2%' }}
              />
            ) : null}
            <input
              type={'file'}
              onChange={(e) => {
                imageUpload(e.target.files[0]);
                setImage(e.target.files[0]);
              }}
              style={{ marginBottom: '4%', color: '#8673FF' }}
            />
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <button
                onClick={uploadCertification}
                style={{
                  marginLeft: '1%',
                  backgroundColor: '#8673FF',
                  border: 'none',
                  borderRadius: '5px',
                  fontSize: '17px',
                  color: '#F2F4FE',
                }}
              >
                인증사진 올리기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 후기작성 모달 */}
      {reviewModal && (
        <div
          style={{
            width: '100%',
            height: '100vh',
            position: 'fixed',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflowY: 'auto',
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
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  fontSize: '25px',
                  margin: '0 auto',
                  marginBottom: '2%',
                }}
              >
                후기 작성
              </div>
              <button
                onClick={() => imageAction('review')}
                style={{
                  backgroundColor: '#8673FF',
                  border: '#8673FF',
                  color: '#ffff',
                  borderRadius: '5px',
                  fontSize: '17px',
                }}
              >
                X
              </button>
            </div>

            <div style={{ display: 'flex', marginBottom: '2%' }}>
              <div>제목</div>
              <input
                style={{
                  margin: '0 2%',
                  width: '80%',
                  border: 'none',
                  fontSize: '17px',
                  borderRadius: '5px',
                }}
                onChange={(event) => {
                  setReviewTtile(event.target.value);
                }}
              ></input>
            </div>
            <div style={{ display: 'flex', marginBottom: '2%' }}>
              <div>내용</div>
              <textarea
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
              ></textarea>
            </div>
            <div>이미지</div>
            <input
              style={{ marginTop: '1%', marginBottom: '3%', color: '#8673FF' }}
              type={'file'}
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            />
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <button
                onClick={uploadReview}
                style={{
                  marginLeft: '1%',
                  backgroundColor: '#8673FF',
                  border: 'none',
                  borderRadius: '5px',
                  fontSize: '17px',
                  color: '#F2F4FE',
                }}
              >
                후기 올리기
              </button>
            </div>
          </div>
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
        </div>
      )}

      {/* 인증이미지 하나씩 */}
      {certificationImages.image && (
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
        </div>
      )}

      {/* 후기이미지 하나씩 */}
      {imageData.image && (
        <div
          style={{
            width: '100%',
            height: '100vh',
            background: 'black',
            position: 'fixed',
            overflow: 'auto',
            zIndex: 10000,
          }}
        >
          <div
            style={{
              width: '100%',
              height: '80vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
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
          </div>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: '580px',
                backgroundColor: '#EFF1FE',
                padding: '1%',
                borderRadius: '10px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  marginBottom: '2%',
                  fontSize: '18px',
                }}
              >
                <div style={{ marginRight: '2%' }}>제목:</div>
                <div style={{}}>
                  {
                    challengeData.challengeReviews[imageData.i]
                      .challengeReviewTitle
                  }
                </div>
              </div>
              <div style={{ display: 'flex' }}>
                <div style={{ marginRight: '2.5%' }}>내용:</div>
                <div style={{}}>
                  {
                    challengeData.challengeReviews[imageData.i]
                      .challengeReviewContent
                  }
                </div>
              </div>
            </div>
          </div>
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
              <div>{`${challengeData.challengeCurrentParty}명`}</div>
            </ChallengeDescription>

            <ChallengeDescription>
              <div className="margin_right">챌린지 기간:</div>
              <div>{`${challengeData.challengeStartDate} ~ ${challengeData.challengeEndDate}`}</div>
            </ChallengeDescription>

            <ChallengeDescription>
              <div className="margin_right">챌린지 금액:</div>
              <div>{challengeData.challengeFeePerPerson}원</div>
            </ChallengeDescription>

            <ChallengeDescription>
              <div className="margin_right">결제한 금액:</div>
              <div>{challengeData.challengeFeePerPerson}원</div>
            </ChallengeDescription>

            <ChallengeDescription>
              <div className="margin_right3">도전중인 유저:</div>
              {challengeData.participatingMember &&
                challengeData.participatingMember.map((member) => {
                  return (
                    <div
                      key={challengeData.participatingMember.memberId}
                      style={{
                        marginRight: '2%',
                        border: '2px solid #EFF1FE',
                        borderRadius: '20px',
                        padding: '0.3%',
                      }}
                    >
                      {member.participatingMemberName}
                    </div>
                  );
                })}
            </ChallengeDescription>

            <div
              style={{
                width: '100%',
                fontSize: '20px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {pastDay < 0 ? (
                <button
                  style={{
                    marginLeft: '1%',
                    backgroundColor: '#8673FF',
                    border: 'none',
                    borderRadius: '5px',
                    fontSize: '20px',
                    color: '#F2F4FE',
                  }}
                  onClick={challengeDrop}
                >
                  다음에 도전
                </button>
              ) : null}
            </div>
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
            <div
              style={{ color: '#787878', fontSize: '15px', marginRight: '8px' }}
            >
              인증은 10분까지 가능합니다.
            </div>
            {/* <div> */}
            <div
              style={{ fontSize: '20px' }}
            >{`인증 횟수:  ${certificationCount} / ${challengeData.challengeAuthCycle}`}</div>

            <button
              style={{
                marginLeft: '1%',
                backgroundColor: '#8673FF',
                border: 'none',
                borderRadius: '5px',
                fontSize: '17px',
                color: '#F2F4FE',
              }}
              className="cursur"
              onClick={showCertificationModal}
            >
              인증 사진 올리기
            </button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(8, 1fr)',
              fontSize: '20px',
              width: '1024px',
              // border: '1px solid blue',
              marginBottom: '5px',
              marginTop: '5px',
              placeItems: 'center',
            }}
          >
            {challengeData.challengeAuthAvailableTime.map((time, index) => {
              return (
                <>
                  <div
                    style={{
                      backgroundColor: '#EFF1FE',
                      width: '100%',
                      borderRadius: '7px',
                      padding: '3px 0 3px 13px',
                      marginBottom: '7px',
                    }}
                  >
                    {index + 1}번째 인증시간:
                  </div>
                  <div>{time}</div>
                </>
              );
            })}
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
            <div
              style={{
                border: '2px solid #eff1fe',
                width: '1000px',
                height: '450px',
                marginTop: '1%',
                fontSize: '20px',
                borderRadius: '20px',
                padding: '2% 0 2% 2%',
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
              }}
            >
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
            </div>
          )}
        </Review>

        <ReviewWrapper style={{ marignTop: '1000px' }}>
          <div style={{ display: 'flex' }}>
            <div style={{ marginRight: 'auto' }}>후기 사진</div>

            <button
              style={{
                width: '10%',
                backgroundColor: '#8673FF',
                border: 'none',
                borderRadius: '5px',
                fontSize: '17px',
                color: '#F2F4FE',
                cursor: 'pointer',
              }}
              onClick={uploadReviewModal}
            >
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
              후기를 올려주세요.😊
            </div>
          ) : (
            <div
              style={{
                border: '2px solid #eff1fe',
                width: '1000px',
                height: '450px',
                marginTop: '1%',
                fontSize: '20px',
                borderRadius: '20px',
                padding: '2% 0 2% 2%',
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
              }}
            >
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
            </div>
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

          {/* <div style={{}}>댓글 {challengeData.challengeTalks?.length}</div> */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ marginRight: '5%' }}>{memberName}</div>
            <input
              style={{
                width: '1024px',
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
                fontSize: '17px',
                color: '#F2F4FE',
              }}
              onClick={postTalk}
              disabled={isValid ? false : true}
            >
              입력
            </button>
          </div>
          {challengeData.challengeTalks === null ? null : (
            <div
              style={{
                border: '2px solid #EFF1FE',
                padding: '1% 1% 0 1%',
                borderRadius: '10px',
                marginTop: '2%',
                width: '1000px',
              }}
            >
              {challengeData.challengeTalks?.map((talk, index) => {
                return (
                  <div
                    style={{
                      width: '1000px',
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '1%',
                      borderBottom: '2px solid #EFF1FE',
                    }}
                    key={index}
                  >
                    <div style={{ marginRight: '5%' }}>{talk.memberName}</div>
                    <div style={{ marginRight: 'auto' }}>
                      {talk.challengeTalkBody}
                    </div>
                    <div>{talk.updated_at}</div>
                    {Number(loginId) === Number(talk.memberId) ? (
                      <>
                        <button
                          style={{
                            marginLeft: '1%',
                            width: '5%',
                            backgroundColor: '#8673FF',
                            border: 'none',
                            fontSize: '17px',
                            borderRadius: '5px',
                            color: '#F2F4FE',
                            marginRight: '10px',
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
          )}
        </div>
      </Container>
    </>
  );
}
