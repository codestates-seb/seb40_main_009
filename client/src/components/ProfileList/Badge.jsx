function Badge() {
  const [badge, setBadge] = useState();
  
  return (
    <div>
      {clickedTab === 0 ? <ProfileBoxChallenge /> : null}
      {clickedTab === 1 ? <ProfileBoxChallengeList /> : null}
      {clickedTab === 2 ? <ProfileBoxOrderList /> : null}
    </div>
  );
}

export default Badge;
