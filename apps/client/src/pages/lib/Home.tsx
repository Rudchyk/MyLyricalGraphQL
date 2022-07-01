import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/songs">Song List</Link>
          </li>
          <li>
            <Link to="/songs/new">Create Song</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
