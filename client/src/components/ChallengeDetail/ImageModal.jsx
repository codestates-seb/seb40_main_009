import {
  Container,
  Close,
  ImageWrapper,
  Images,
} from '../../style/ChallengeDetailProgress/ImageModalStyle';

export default function ImageModal({ setImageModalOpen, image }) {
  // 모달 끄기
  const closeModal = () => {
    setImageModalOpen(false);
  };

  // const imageTest = [
  //   '인증 예시1',
  //   '인증 예시2',
  //   '인증 예시3',
  //   '인증 예시4',
  //   '인증 예시5',
  //   '인증 예시6',
  //   '인증 예시7',
  //   '인증 예시8',
  //   '인증 예시9',
  //   '인증 예시10',
  // ];

  return (
    <Container>
      <Close onClick={closeModal}>X</Close>
      <ImageWrapper>
        {image.map((image, index) => {
          return (
            <Images key={index}>
              <div>{image.imagePath}</div>
            </Images>
          );
        })}
      </ImageWrapper>
    </Container>
  );
}
