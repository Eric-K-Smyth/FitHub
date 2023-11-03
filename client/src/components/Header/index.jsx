import { Link } from 'react-router-dom';
import headerBg from '../../../src/assets/images/fithub-home-pic.jpg';
import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="bg-primary text-light mb-3 py-3 flex-row align-center" style={{ backgroundImage: `url(${headerBg})` }}>
      <div className="container flex-row justify-space-between-lg">
        <div className="left-align">
          <Link to="/">
            <h1 className=" text-white m-0">FitHub</h1>
          </Link>
          <p className="m-0 text-light">Start today.</p>
        </div>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/me">
                {/* Run the getProfile() method to get access to the unencrypted token value in order to retrieve the user's username  */}
                {Auth.getProfile().authenticatedPerson.username}'s profile
              </Link>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-outline m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-outline m-2" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
