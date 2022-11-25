import {
  Container,
  Close,
} from '../../style/ChallengeDetailProgress/ModalStyle';

export default function Modal({
  setModalOpen,
  imageTransform,
  setImageTransfrom,
}) {
  // 모달 끄기
  const closeModal = () => {
    setModalOpen(false);
  };

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

  return (
    <Container>
      <Close onClick={closeModal}>X</Close>
      <div style={{ margin: '5%' }}>
        {imageTransform !== '' ? (
          <img
            src={imageTransform}
            alt="업로드한 이미지 미리보기"
            style={{ width: '400px', height: '400px', marginBottom: '2%' }}
          />
        ) : null}

        <h3 style={{ marginBottom: '2%' }}>인증사진을 선택해주세요</h3>
        <input
          type={'file'}
          onChange={(e) => {
            imageUpload(e.target.files[0]);
          }}
        />
      </div>
    </Container>
  );
}
