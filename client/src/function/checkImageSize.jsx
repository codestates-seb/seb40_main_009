export const checkImageSize = (file) => {
  for (let i = 0; i < file.length; i++) {
    if (Number(file[i].size) > 3150000) {
      alert('이미지 용량은 3mb 이하로 부탁드립니다');
      return false;
    } else {
      return true;
    }
  }
};
