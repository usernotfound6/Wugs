import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Wugs On-Boarding</h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/user">
              Home
            </Link>

            <Link className="navLink" to="/getmoreinfo">
              Interested Page
            </Link>
            <Link className="navLink" to="/priming">
              Priming Page
            </Link>
            <Link className="navLink" to="/servicechoice">
              Service Choice Page
            </Link>
            <Link className="navLink" to="/clientlocationinfo">
              Client Location Info Page
            </Link>
            <Link className="navLink" to="/demographics">
              Demographics Page
            </Link>
            <Link className="navLink" to="/foodpreferences">
              Food Preferences Page
            </Link>
            <Link className="navLink" to="/additionalinfo">
              Addl Info Page
            </Link>
            <Link className="navLink" to="/review">
              Review Page
            </Link>
            <Link className="navLink" to="/clientstatus">
              Client Status Page
            </Link>
            <Link className="navLink" to="/admin">
              Admin View Page
            </Link>

            <LogOutButton className="navLink" />
          </>
        )}

        <Link className="navLink" to="/about">
          About
        </Link>
      </div>
    </div>
  );
}

export default Nav;
