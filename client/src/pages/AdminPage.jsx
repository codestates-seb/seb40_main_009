import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  padding: 200px 0 100px 0;
  width: 80%;
  margin: 0 auto;
  background-color: yellow;

  > button {
    width: 50%;
    height: 500px;
    border-radius: 20px;
    border: 1px solid black;
  }
`;

export default function AdminPage() {
  const category = ['challenges', 'members'];
  return (
    <Container>
      <Link to={`${category[0]}`}>
        <button>challenges</button>
      </Link>

      <button>members</button>
    </Container>
  );
}
