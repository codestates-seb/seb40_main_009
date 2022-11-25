import {
  Container,
  Close,
} from '../../style/ChallengeDetailProgress/ImageModalStyle';

export default function ImageModal({ setImageModalOpen, imageTest }) {
  // 모달 끄기
  const closeModal = () => {
    setImageModalOpen(false);
  };

  return (
    <Container>
      <Close onClick={closeModal}>X</Close>
      <div style={{ margin: '5%' }}>
        {imageTest.map((image) => {
          return (
            <div
              style={{
                border: '2px solid red',
                marginBottom: '3%',
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
              }}
            >
              <div
                style={{
                  width: '100%',
                }}
              >
                <div>{image}</div>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
}
