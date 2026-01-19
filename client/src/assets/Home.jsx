import { Link } from 'react-router-dom';

export default function Home() {
  const containerStyle = {
    height: "100vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4A90E2",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    position: "fixed",
    top: 0,
    left: 0,
    color: "white",
  };

  const contentStyle = {
    textAlign: "center",
    maxWidth: "600px",
    padding: "20px",
  };

  const titleStyle = {
    fontSize: "3.5rem",
    fontWeight: "700",
    marginBottom: "20px",
  };

  const subtitleStyle = {
    fontSize: "1.5rem",
    marginBottom: "40px",
    fontWeight: "300",
  };

  const buttonStyle = {
    backgroundColor: "white",
    color: "#4A90E2",
    padding: "15px 40px",
    borderRadius: "50px",
    fontSize: "1.2rem",
    fontWeight: "600",
    textDecoration: "none",
    display: "inline-block",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <h1 style={titleStyle}>Wise</h1>
        <p style={subtitleStyle}>Master Your Finances, Secure Your Future</p>
        <Link 
          to="/register" 
          style={buttonStyle}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-3px)";
            e.target.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.2)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "none";
          }}
        >
          Start Learning
        </Link>
      </div>
    </div>
  );
}