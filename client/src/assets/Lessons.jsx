import { Link } from 'react-router-dom';
import { lessons } from '../data/lessons';

export default function Lessons() {

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
    header: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      marginBottom: '40px',
      color: '#333',
    },
    categorySection: {
      marginBottom: '50px',
    },
    categoryTitle: {
      fontSize: '1.8rem',
      fontWeight: '600',
      marginBottom: '20px',
      color: '#4A90E2',
    },
    lessonsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '25px',
    },
    lessonCard: {
      backgroundColor: 'white',
      borderRadius: '15px',
      overflow: 'hidden',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      textDecoration: 'none',
      color: 'inherit',
      display: 'block',
    },
    thumbnail: {
      width: '100%',
      height: '180px',
      objectFit: 'cover',
      backgroundColor: '#e0e0e0',
    },
    cardContent: {
      padding: '20px',
    },
    lessonTitle: {
      fontSize: '1.2rem',
      fontWeight: '600',
      marginBottom: '10px',
      color: '#333',
    },
    lessonMeta: {
      fontSize: '0.9rem',
      color: '#6c757d',
      marginBottom: '5px',
    },
    completedBadge: {
      color: '#28a745',
      fontWeight: '600',
      fontSize: '0.9rem',
    },
  };

  const categories = ['Budgeting', 'Saving', 'Credit'];

  return (
    <div style={styles.pageContainer}>
        <div style={styles.container}>
          <h1 style={styles.header}>Financial Lessons</h1>
          
          {categories.map((category) => (
            <div key={category} style={styles.categorySection}>
              <h2 style={styles.categoryTitle}>{category}</h2>
              <div style={styles.lessonsGrid}>
                {lessons
                  .filter((lesson) => lesson.category === category)
                  .map((lesson) => (
                    <Link 
                      to={`/lessons/${lesson.id}`} 
                      key={lesson.id}
                      style={styles.lessonCard}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-5px)";
                        e.currentTarget.style.boxShadow = "0 8px 12px rgba(0, 0, 0, 0.15)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
                      }}
                    >
                      <div style={{...styles.thumbnail, backgroundColor: '#4A90E2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '3rem'}}>
                        📚
                      </div>
                      <div style={styles.cardContent}>
                        <h3 style={styles.lessonTitle}>{lesson.title}</h3>
                        <p style={styles.lessonMeta}>{lesson.duration} mins</p>
                        {lesson.completed && <span style={styles.completedBadge}>✓ Completed</span>}
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
  );
}