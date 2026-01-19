import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setUser } from '../features/auth/authSlice';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login form submitted', { email });
        setLoading(true);
        
        axios.post('http://localhost:3001/login', { email, password })
            .then((response) => {
                console.log('Login response:', response.data);
                if (response?.data?.message === "Success") {
                    const user = response.data.user || null;
                    // Save user to Redux state and localStorage
                    try { 
                        dispatch(setUser(user)); 
                    } catch (e) { 
                        console.error('Error dispatching setUser:', e);
                    }
                    try { 
                        localStorage.setItem('user', JSON.stringify(user)); 
                    } catch (e) {
                        console.error('Error saving to localStorage:', e);
                    }
                    // Navigate to dashboard
                    navigate('/dashboard');
                } else {
                    alert(response?.data?.message || 'Login failed');
                }
            })
            .catch((error) => {
                // Axios throws for non-2xx responses
                const msg = error?.response?.data?.message || error.message || 'Login request failed';
                console.error('Login error', error);
                alert(msg);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const containerStyle = {
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        backgroundColor: "#4A90E2",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        boxSizing: "border-box",
        position: "fixed",
        top: 0,
        left: 0,
    };

    const cardStyle = {
        background: "#ffffff",
        padding: "40px",
        borderRadius: "20px",
        boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
        width: "400px",
        maxWidth: "90%",
    };

    const headerStyle = {
        textAlign: "center",
        marginBottom: "30px",
    };

    const titleStyle = {
        fontSize: "2rem",
        fontWeight: "700",
        color: "#333",
        margin: "0 0 10px 0",
    };

    const inputWrapperStyle = {
        marginBottom: "20px",
    };

    const inputStyle = {
        width: "100%",
        padding: "14px 16px",
        borderRadius: "10px",
        border: "1px solid #ddd",
        fontSize: "0.95rem",
        outline: "none",
        color: "#333",
        backgroundColor: "#f9f9f9",
        boxSizing: "border-box",
        transition: "border-color 0.3s ease",
    };

    const buttonStyle = {
        width: "100%",
        backgroundColor: "#4A90E2",
        color: "white",
        padding: "14px",
        borderRadius: "10px",
        border: "none",
        fontSize: "1rem",
        fontWeight: "600",
        cursor: "pointer",
        marginTop: "10px",
        transition: "transform 0.2s ease, background-color 0.3s ease",
    };

    const footerStyle = {
        marginTop: "25px",
        textAlign: "center",
        fontSize: "0.9rem",
        color: "#666",
    };

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                <div style={headerStyle}>
                    <h1 style={titleStyle}>Login</h1>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={inputWrapperStyle}>
                        <input
                            type="email"
                            placeholder="Email Address"
                            style={inputStyle}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={(e) => e.target.style.borderColor = "#4A90E2"}
                            onBlur={(e) => e.target.style.borderColor = "#ddd"}
                            required
                        />
                    </div>

                    <div style={inputWrapperStyle}>
                        <input
                            type="password"
                            placeholder="Password"
                            style={inputStyle}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={(e) => e.target.style.borderColor = "#4A90E2"}
                            onBlur={(e) => e.target.style.borderColor = "#ddd"}
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        style={{...buttonStyle, opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer'}}
                        onMouseEnter={(e) => {
                            if (!loading) {
                                e.target.style.transform = "translateY(-2px)";
                                e.target.style.backgroundColor = "#3A7BC8";
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!loading) {
                                e.target.style.transform = "translateY(0)";
                                e.target.style.backgroundColor = "#4A90E2";
                            }
                        }}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <div style={footerStyle}>
                    Don't have an account?{" "}
                    <Link to="/register" style={{ color: "#4A90E2", fontWeight: "600", textDecoration: "none" }}>
                        Register now
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;