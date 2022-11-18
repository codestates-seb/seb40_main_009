// import styled from 'styled-components';
import * as S from '../../style/MyProfilePageStyle/MyProfilePageStyle';

function ChartBar(props) {
  return (
    <S.ChartBarComponent>
      <div className="level-bar">
        Lv-1
        <div className="progress-bar">
          <div className="progress">{props.percentage}%</div>
        </div>
      </div>
    </S.ChartBarComponent>
  );
}

export default ChartBar;
