import { useEffect, useState } from 'react';

import markerRunning from '../../image/marker/marker_running.png';

const { kakao } = window;

export default function CreateKakaoMap({ register }) {
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

    // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude, // 위도
          lon = position.coords.longitude; // 경도

        const locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
          message = '<div style="padding:5px;">클릭으로 위치 설정하기</div>'; // 인포윈도우에 표시될 내용입니다

        // 마커와 인포윈도우를 표시합니다
        displayMarker(locPosition, message);
      });
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

      const locPosition = new kakao.maps.LatLng(
          37.65673759424988,
          126.76579874369969
        ),
        message = 'geolocation을 사용할수 없어요..';

      displayMarker(locPosition, message);
    }

    /**마커 설정 */
    const imageSrc = markerRunning,
      imageSize = new kakao.maps.Size(64, 69),
      imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    const markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );

    // 지도에 마커와 인포윈도우를 표시하는 함수입니다
    function displayMarker(locPosition, message) {
      // 마커를 생성합니다
      const marker = new kakao.maps.Marker({
        map: map,
        position: locPosition,
        image: markerImage,
      });

      const iwContent = message, // 인포윈도우에 표시할 내용
        iwRemoveable = true;

      // 인포윈도우를 생성합니다
      const infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
        removable: iwRemoveable,
      });

      // 지도 중심좌표를 접속위치로 변경합니다
      map.setCenter(locPosition);

      // 지도에 클릭 이벤트를 등록합니다
      // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
      kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
        // 클릭한 위도, 경도 정보를 가져옵니다
        const latlng = mouseEvent.latLng;
        setLatLng(latlng);

        // 마커 위치를 클릭한 위치로 옮깁니다
        marker.setPosition(latlng);
      });

      // 인포윈도우를 마커위에 표시합니다
      infowindow.open(map, marker);
    }
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
      <input {...register('mapValue')} value={isLatLng} hidden />
    </>
  );
}
