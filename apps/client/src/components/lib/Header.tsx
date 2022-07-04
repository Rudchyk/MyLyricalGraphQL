import { useMutation, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { CURRENT_USER } from '@client/queries';
import { LOGOUT } from '@client/mutations';
import { ClientRoutesEnum, CurrentUserAPIResponse } from '@client/constants';

export const Header = () => {
  const { loading, error, data } =
    useQuery<CurrentUserAPIResponse>(CURRENT_USER);
  const [logout] = useMutation(LOGOUT, {
    refetchQueries: [{ query: CURRENT_USER }],
  });
  const renderButtons = () => {
    if (!data) {
      return null;
    }

    const { user } = data;

    if (loading) {
      return <div />;
    }

    if (user) {
      return (
        <li>
          <a href="#" onClick={() => logout()}>
            Logout
          </a>
        </li>
      );
    } else {
      return (
        <>
          <li>
            <Link to={`/${ClientRoutesEnum.SIGNUP}`}>Signup</Link>
          </li>
          <li>
            <Link to={`/${ClientRoutesEnum.LOGIN}`}>Login</Link>
          </li>
        </>
      );
    }
  };

  if (error) {
    return <div>Header Submission error! ${error.message}</div>;
  }

  return (
    <nav>
      <div className="nav-wrapper">
        <Link to="/" style={{ marginLeft: '1rem' }} className="brand-logo left">
          Songs list
        </Link>
        <ul className="right">{renderButtons()}</ul>
      </div>
    </nav>
  );
};

export default Header;
