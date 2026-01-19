import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { lessons } from '../data/lessons';

export default function Quiz() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const lesson = lessonId ? lessons.find(l => l.id === parseInt(lessonId)) : null;
  const quiz = lesson; // quiz.questions will be read from lesson.questions
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(null);
  const [answers, setAnswers] = useState([]);

  // If no lessonId or lesson not found, use first lesson with questions as default
  const defaultLesson = lessons.find(l => l.questions && l.questions.length > 0);
  const activeQuiz = quiz || defaultLesson;

  if (!activeQuiz || !activeQuiz.questions || activeQuiz.questions.length === 0) {
    return (
      <div style={{ padding: 24, textAlign: 'center', minHeight: '100vh', backgroundColor: '#f5f7fa' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333', marginBottom: '20px' }}>Quiz not found</h1>
          <p style={{ fontSize: '1.1rem', color: '#666' }}>The quiz you requested does not exist.</p>
          <button 
            onClick={() => navigate('/lessons')}
            style={{
              marginTop: '20px',
              backgroundColor: '#4A90E2',
              color: 'white',
              padding: '12px 30px',
              borderRadius: '10px',
              border: 'none',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Go to Lessons
          </button>
        </div>
    );
  }

  const handleAnswer = (index) => {
    const newAnswers = [...answers];
    newAnswers[currentQ] = index;
    setAnswers(newAnswers);
  };

  const submit = () => {
    let correct = 0;
    activeQuiz.questions.forEach((q, i) => {
      if (answers[i] === q.correct) correct++;
    });
    const percentage = Math.round((correct / activeQuiz.questions.length) * 100);
    setScore(correct);
    
    // Save quiz score to localStorage
    try {
      const existingScores = JSON.parse(localStorage.getItem('quizScores') || '[]');
      existingScores.push({
        lessonId: activeQuiz.id,
        score: percentage,
        date: new Date().toISOString()
      });
      localStorage.setItem('quizScores', JSON.stringify(existingScores));
      
      // Update quiz average
      const average = existingScores.reduce((sum, s) => sum + s.score, 0) / existingScores.length;
      localStorage.setItem('quizAverage', Math.round(average).toString());
    } catch (e) {
      console.error('Error saving quiz score:', e);
    }
  };

  const styles = {
    pageContainer: {
      backgroundColor: '#f5f7fa',
      minHeight: '100vh',
      paddingBottom: '50px',
    },
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '40px 20px',
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      marginBottom: '30px',
      color: '#333',
    },
    scoreContainer: {
      textAlign: 'center',
      padding: '40px 20px',
    },
    scoreTitle: {
      fontSize: '3rem',
      fontWeight: 'bold',
      marginBottom: '20px',
      color: '#333',
    },
    scoreMessage: {
      fontSize: '1.5rem',
      color: '#666',
      marginBottom: '30px',
    },
    questionTitle: {
      fontSize: '1.8rem',
      fontWeight: '600',
      marginBottom: '30px',
      color: '#333',
    },
    optionsContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      marginBottom: '30px',
    },
    optionButton: {
      width: '100%',
      padding: '18px 20px',
      textAlign: 'left',
      border: '2px solid #e0e0e0',
      borderRadius: '10px',
      backgroundColor: 'white',
      color: '#333',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    },
    selectedOption: {
      border: '2px solid #4A90E2',
      backgroundColor: '#e8f4f8',
    },
    actionButton: {
      backgroundColor: '#4A90E2',
      color: 'white',
      padding: '14px 30px',
      borderRadius: '10px',
      border: 'none',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'transform 0.2s ease, background-color 0.3s ease',
    },
    submitButton: {
      backgroundColor: '#28a745',
    },
  };

  if (score !== null) {
    return (
      <div style={styles.pageContainer}>
          <div style={styles.container}>
            <div style={styles.scoreContainer}>
              <h1 style={styles.scoreTitle}>Score: {score}/{activeQuiz.questions.length}</h1>
              <p style={styles.scoreMessage}>
                {score === activeQuiz.questions.length ? '🎉 Perfect!' : 'Good effort!'}
              </p>
              <button 
                onClick={() => navigate('/lessons')}
                style={styles.actionButton}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                }}
              >
                Back to Lessons
              </button>
            </div>
          </div>
        </div>
    );
  }

  const q = activeQuiz.questions[currentQ];

  if (!q) {
    return (
      <div style={styles.pageContainer}>
          <div style={styles.container}>
            <div style={styles.scoreContainer}>
              <h1 style={styles.scoreTitle}>No questions available</h1>
            </div>
          </div>
        </div>
    );
  }

  return (
    <div style={styles.pageContainer}>
        <div style={styles.container}>
          <h2 style={styles.questionTitle}>Question {currentQ + 1} of {activeQuiz.questions.length}</h2>
          <h3 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '25px', color: '#333' }}>{q.question}</h3>
          
          <div style={styles.optionsContainer}>
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                style={{
                  ...styles.optionButton,
                  ...(answers[currentQ] === i ? styles.selectedOption : {})
                }}
                onMouseEnter={(e) => {
                  if (answers[currentQ] !== i) {
                    e.target.style.borderColor = '#4A90E2';
                    e.target.style.backgroundColor = '#f0f8ff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (answers[currentQ] !== i) {
                    e.target.style.borderColor = '#e0e0e0';
                    e.target.style.backgroundColor = 'white';
                  }
                }}
              >
                {opt}
              </button>
            ))}
          </div>
          
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'space-between' }}>
            {currentQ > 0 && (
              <button 
                onClick={() => setCurrentQ(currentQ - 1)} 
                style={styles.actionButton}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                }}
              >
                Previous
              </button>
            )}
            <div style={{ flex: 1 }} />
            {currentQ < activeQuiz.questions.length - 1 ? (
              <button 
                onClick={() => setCurrentQ(currentQ + 1)} 
                style={styles.actionButton}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                }}
              >
                Next
              </button>
            ) : (
              <button 
                onClick={submit} 
                style={{ ...styles.actionButton, ...styles.submitButton }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                }}
              >
                Submit Quiz
              </button>
            )}
          </div>
        </div>
      </div>
  );
}
