import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

export default function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    try {
      localStorage.removeItem('user');
    } catch (e) {
      // ignore
    }
    navigate('/');
  };

  const navStyle = {
    backgroundColor: "#4A90E2",
    color: "white",
    padding: "15px 0",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  const containerStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const logoStyle = {
    fontSize: "1.8rem",
    fontWeight: "700",
    color: "white",
    textDecoration: "none",
  };

  const navLinksStyle = {
    display: "flex",
    gap: "25px",
    alignItems: "center",
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontSize: "1rem",
    fontWeight: "500",
    transition: "opacity 0.2s ease",
  };

  const buttonStyle = {
    backgroundColor: "transparent",
    border: "2px solid white",
    color: "white",
    padding: "8px 20px",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "500",
    transition: "all 0.2s ease",
  };

  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        <Link to="/" style={logoStyle}>MoneyWise Ireland</Link>
        <div style={navLinksStyle}>
          {user ? (
            <>
              <Link 
                to="/dashboard" 
                style={linkStyle}
                onMouseEnter={(e) => e.target.style.opacity = "0.8"}
                onMouseLeave={(e) => e.target.style.opacity = "1"}
              >
                Dashboard
              </Link>
              <Link 
                to="/lessons" 
                style={linkStyle}
                onMouseEnter={(e) => e.target.style.opacity = "0.8"}
                onMouseLeave={(e) => e.target.style.opacity = "1"}
              >
                Lessons
              </Link>
              <Link 
                to="/budget" 
                style={linkStyle}
                onMouseEnter={(e) => e.target.style.opacity = "0.8"}
                onMouseLeave={(e) => e.target.style.opacity = "1"}
              >
                Budget
              </Link>
              <button 
                onClick={handleLogout} 
                style={buttonStyle}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "white";
                  e.target.style.color = "#4A90E2";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "white";
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                style={linkStyle}
                onMouseEnter={(e) => e.target.style.opacity = "0.8"}
                onMouseLeave={(e) => e.target.style.opacity = "1"}
              >
                Login
              </Link>
              <Link to="/register">
                <button 
                  style={buttonStyle}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "white";
                    e.target.style.color = "#4A90E2";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.color = "white";
                  }}
                >
                  Register
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}