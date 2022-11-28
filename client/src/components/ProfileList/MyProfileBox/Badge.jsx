import { GiMedallist } from 'react-icons/gi';

function Badge({ memberBadge }) {
  // 왜 안되는거야! if문으로는 됐지만 return을 해버리는 바람에 다른 것들이 사라짐. => return문안에서 해결 필요.

  // if (memberBadge === '새내기') {
  //   return <GiMedallist style={{ color: 'red' }} />;
  // } else if (memberBadge === '좀치는도전자') {
  //   return <GiMedallist style={{ color: 'orange' }} />;
  // } else if (memberBadge === '열정도전자') {
  //   return +(<GiMedallist style={{ color: 'yellow' }} />);
  // } else if (memberBadge === '모범도전자') {
  //   return <GiMedallist style={{ color: 'green' }} />;
  // } else if (memberBadge === '우수도전자') {
  //   return <GiMedallist style={{ color: 'blue' }} />;
  // } else if (memberBadge === '챌린지장인') {
  //   return <GiMedallist style={{ color: 'navy' }} />;
  // } else if (memberBadge === '시간의지배자') {
  //   return <GiMedallist style={{ color: 'pink' }} />;
  // } else if (memberBadge === '챌린지신') {
  //   return <GiMedallist style={{ color: 'purple' }} />;
  // }
  console.log('akak', memberBadge);
  return (
    <div>
      <div>
        {{ memberBadge } === '새내기' ? (
          <GiMedallist style={{ color: 'red' }} />
        ) : null}
        {{ memberBadge } === '좀치는도전자' ? (
          <GiMedallist style={{ color: 'orange' }} />
        ) : null}
        {{ memberBadge } === '열정도전자' ? (
          <GiMedallist style={{ color: 'yellow' }} />
        ) : null}
        {{ memberBadge } === '모범도전자' ? (
          <GiMedallist style={{ color: 'green' }} />
        ) : null}
        {{ memberBadge } === '우수도전자' ? (
          <GiMedallist style={{ color: 'blue' }} />
        ) : null}
        {{ memberBadge } === '챌린지장인' ? (
          <GiMedallist style={{ color: 'navy' }} />
        ) : null}
        {{ memberBadge } === '시간의지배자' ? (
          <GiMedallist style={{ color: 'violet' }} />
        ) : null}
        {{ memberBadge } === '챌린지신' ? (
          <GiMedallist style={{ color: 'purple' }} />
        ) : null}
      </div>
    </div>
  );
}

export default Badge;
