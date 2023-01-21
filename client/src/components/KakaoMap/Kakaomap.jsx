import { useEffect, useState } from 'react';

import markerRunning from '../../image/marker/marker_running.png';

const { kakao } = window;

export default function KakaoMap() {
  const [isLatLng, setLatLng] = useState(
    '37.65673759424988, 126.76579874369969'
  );

  const mapscript = () => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(37.65673759424988, 126.76579874369969),
      level: 5,
    };
    const map = new kakao.maps.Map(container, options);

    /**마커 설정 */
    const imageSrc = markerRunning,
      imageSize = new kakao.maps.Size(64, 69),
      imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    const markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      ),
      markerPosition = new kakao.maps.LatLng(
        37.65673759424988,
        126.76579874369969
      ); // 마커가 표시될 위치입니다

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImage, // 마커이미지 설정
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);
  };

  useEffect(() => {
    mapscript();
  }, []);

  return (
    <>
      <div
        id="map"
        style={{
          width: '500px',
          height: '500px',
        }}
      ></div>
    </>
  );
}
