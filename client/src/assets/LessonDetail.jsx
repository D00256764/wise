import { useParams, useNavigate, Link } from 'react-router-dom';
import { lessons } from '../data/lessons';
import { useState } from 'react';

export default function LessonDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const lesson = lessons.find(l => l.id === parseInt(id));
  const [completed, setCompleted] = useState(false);

  const handleComplete = () => {
    setCompleted(true);
    // Save completed lesson to localStorage
    try {
      const completedLessons = JSON.parse(localStorage.getItem('completedLessons') || '[]');
      if (!completedLessons.includes(lesson.id)) {
        completedLessons.push(lesson.id);
        localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
      }
    } catch (e) {
      console.error('Error saving completed lesson:', e);
    }
  };

  if (!lesson) {
    return (
      <div style={{ padding: 24 }}>
        <h2>Lesson not found</h2>
        <p>The lesson you requested does not exist.</p>
        <button onClick={() => navigate('/lessons')} style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}>
          Back to Lessons
        </button>
      </div>
    );
  }

  const styles = {
    pageContainer: {
      backgroundColor: '#f5f7fa',
      minHeight: '100vh',
      paddingBottom: '50px',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 20px',
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      marginBottom: '30px',
      color: '#333',
    },
    videoWrapper: {
      width: '100%',
      aspectRatio: '16 / 9',
      marginBottom: '30px',
      borderRadius: '15px',
      overflow: 'hidden',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    iframe: {
      width: '100%',
      height: '100%',
      border: 'none',
    },
    content: {
      fontSize: '1.1rem',
      lineHeight: '1.8',
      marginBottom: '30px',
      color: '#555',
    },
    button: {
      backgroundColor: completed ? '#28a745' : '#4A90E2',
      color: 'white',
      padding: '12px 30px',
      borderRadius: '10px',
      border: 'none',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease, transform 0.2s ease',
      marginRight: '15px',
    },
    backButton: {
      backgroundColor: '#6c757d',
      color: 'white',
      padding: '12px 30px',
      borderRadius: '10px',
      border: 'none',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease, transform 0.2s ease',
      marginBottom: '20px',
    },
    quizLink: {
      display: 'inline-block',
      marginTop: '20px',
      padding: '12px 30px',
      backgroundColor: '#4A90E2',
      color: 'white',
      textDecoration: 'none',
      borderRadius: '10px',
      fontWeight: '600',
      transition: 'background-color 0.3s ease',
    },
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        <button 
          onClick={() => navigate('/lessons')}
          style={styles.backButton}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#5a6268";
            e.target.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#6c757d";
            e.target.style.transform = "translateY(0)";
          }}
        >
          ← Back to Lessons
        </button>
        
        <h1 style={styles.title}>{lesson.title}</h1>
        
        <div style={styles.videoWrapper}>
          <iframe 
            title="lesson-video" 
            style={styles.iframe}
            src={lesson.videoUrl}
            allowFullScreen
          />
        </div>
        
        <p style={styles.content}>{lesson.content}</p>
        
        <div>
          <button 
            onClick={handleComplete}
            style={styles.button}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
            }}
          >
            {completed ? '✓ Completed' : 'Mark Complete'}
          </button>
        </div>

        {/* Quiz Link */}
        {lesson.questions && lesson.questions.length > 0 && (
          <div style={{ marginTop: '30px' }}>
            <Link 
              to={`/quiz/${lesson.id}`}
              style={styles.quizLink}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#3A7BC8"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "#4A90E2"}
            >
              Take Quiz →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
