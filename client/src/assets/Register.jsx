import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { setUser } from '../features/auth/authSlice';

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Register form submitted', { name, email });
        setLoading(true);
        
        axios
            .post("http://localhost:3001/register", { name, email, password })
            .then((response) => {
                console.log('Register response:', response.data);
                if (response?.data?.message === "Registered") {
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
                    alert("Registration successful!");
                    navigate("/dashboard");
                } else {
                    alert(response?.data?.message || 'Registration failed');
                }
            })
            .catch((error) => {
                const msg = error?.response?.data?.message || error.message || 'Registration request failed';
                console.error('Register error', error);
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
        border: "1px solid #000000",
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
                    <h1 style={titleStyle}>Register</h1>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={inputWrapperStyle}>
                        <input
                            type="text"
                            placeholder="Full Name"
                            style={inputStyle}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onFocus={(e) => e.target.style.borderColor = "#4A90E2"}
                            onBlur={(e) => e.target.style.borderColor = "#ddd"}
                            required
                        />
                    </div>

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
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>

                <div style={footerStyle}>
                    Already have an account?{" "}
                    <Link to="/login" style={{ color: "#4A90E2", fontWeight: "600", textDecoration: "none" }}>
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Register;