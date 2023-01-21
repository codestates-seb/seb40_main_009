import { ChartBarComponent } from '../../style/MyProfilePageStyle/MyProfilePageStyle';
import { GiMedallist } from 'react-icons/gi';

function ChartBar({ percentage, memberBadge }) {
  const badgeLevelColor = {
    새내기: '#9FC9F3',
    좀치는도전자: '#AAC4FF',
    열정도전자: '#9C9EF3',
    모범도전자: '#9772FB',
    우수도전자: '#A66CFF',
    챌린지장인: '#8673ff',
    시간의지배자: '#764AF1',
    챌린지신: '#5534A5',
  };
  return (
    <ChartBarComponent percentage={percentage}>
      <div className="level-bar">
        {memberBadge}
        <GiMedallist style={{ color: badgeLevelColor[memberBadge] }} />
        <div className="progress-bar">
          <div className="progress">{percentage}%</div>
        </div>
      </div>
    </ChartBarComponent>
  );
}

export default ChartBar;
