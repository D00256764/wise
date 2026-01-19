import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const [stats, setStats] = useState(null);

  const styles = {
    pageContainer: {
      backgroundColor: '#f5f7fa',
      minHeight: '100vh',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 20px'
    },
    header: {
      color: '#333',
      fontWeight: 'bold',
      marginBottom: '30px',
      fontSize: '2rem',
    },
    cardsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
      marginBottom: '30px',
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: '15px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '25px',
      transition: 'transform 0.2s ease',
    },
    cardTitle: {
      color: '#6c757d',
      fontSize: '14px',
      marginBottom: '10px',
      fontWeight: '500',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },
    cardValue: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#4A90E2',
    },
    progressBar: {
      height: '8px',
      borderRadius: '10px',
      backgroundColor: '#e9ecef',
      marginTop: '15px',
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      backgroundColor: '#4A90E2',
      borderRadius: '10px',
      transition: 'width 0.3s ease',
    },
    chartCard: {
      backgroundColor: '#fff',
      borderRadius: '15px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '30px',
      marginBottom: '30px',
    },
    sectionTitle: {
      fontSize: '20px',
      fontWeight: '600',
      marginBottom: '20px',
      color: '#333',
    },
    activityGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px',
    },
  };

  useEffect(() => {
    // Load stats from localStorage
    const loadStats = () => {
      try {
        const completedLessons = JSON.parse(localStorage.getItem('completedLessons') || '[]');
        const quizAverage = parseInt(localStorage.getItem('quizAverage') || '0');
        const streak = parseInt(localStorage.getItem('streak') || '0');
        
        setStats({
          lessonsCompleted: completedLessons.length,
          quizAverage: quizAverage,
          streak: streak,
        });
      } catch (e) {
        console.error('Error loading stats:', e);
        setStats({
          lessonsCompleted: 0,
          quizAverage: 0,
          streak: 0,
        });
      }
    };
    
    loadStats();
    
    // Update stats when localStorage changes (listen for custom events or just reload periodically)
    const handleStorageChange = () => {
      loadStats();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Reload stats when window gains focus (user might have completed lessons/quiz elsewhere)
    window.addEventListener('focus', loadStats);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', loadStats);
    };
  }, []);

  if (!stats) {
    return (
      <div style={styles.pageContainer}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <div style={{ fontSize: '1.5rem', color: '#4A90E2' }}>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.pageContainer}>
        <div style={styles.container}>
          <h1 style={styles.header}>Welcome back, {user?.name || 'User'}!</h1>
          
          {/* Stats Cards */}
          <div style={styles.cardsGrid}>
            <div 
              style={styles.card}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              <p style={styles.cardTitle}>Lessons Completed</p>
              <p style={styles.cardValue}>{stats.lessonsCompleted}/3</p>
              <div style={styles.progressBar}>
                <div
                  style={{
                    ...styles.progressFill,
                    width: `${(stats.lessonsCompleted / 3) * 100}%`
                  }}
                />
              </div>
            </div>
            
            <div 
              style={styles.card}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              <p style={styles.cardTitle}>Quiz Average</p>
              <p style={styles.cardValue}>{stats.quizAverage}%</p>
            </div>
            
            <div 
              style={styles.card}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              <p style={styles.cardTitle}>Current Streak</p>
              <p style={styles.cardValue}>{stats.streak} days</p>
            </div>
          </div>

          {/* Continue Learning */}
          <div style={styles.card}>
            <h2 style={styles.sectionTitle}>Continue Learning</h2>
            <p style={{ color: '#6c757d' }}>Your next lesson recommendation will appear here</p>
          </div>
        </div>
      </div>
  );
}