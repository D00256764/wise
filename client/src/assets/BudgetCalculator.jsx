import { useState } from 'react';

export default function BudgetCalculator() {
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState({
    rent: '',
    food: '',
    transport: '',
    utilities: '',
    entertainment: '',
    savings: ''
  });

  const total = Object.values(expenses).reduce((a, b) => {
    const numA = typeof a === 'string' ? parseFloat(a) || 0 : a;
    const numB = typeof b === 'string' ? parseFloat(b) || 0 : b;
    return numA + numB;
  }, 0);
  const incomeNum = typeof income === 'string' ? parseFloat(income) || 0 : income;
  const remaining = incomeNum - total;

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
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
      gap: '30px',
    },
    card: {
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '15px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontWeight: '600',
      color: '#333',
      textTransform: 'capitalize',
    },
    input: {
      width: '100%',
      padding: '12px',
      borderRadius: '8px',
      border: '2px solid #e0e0e0',
      fontSize: '1rem',
      marginBottom: '20px',
      boxSizing: 'border-box',
      transition: 'border-color 0.2s ease',
    },
    sectionTitle: {
      fontSize: '1.3rem',
      fontWeight: '600',
      marginBottom: '20px',
      color: '#4A90E2',
    },
    resultBox: {
      backgroundColor: '#f8f9fa',
      padding: '25px',
      borderRadius: '10px',
      marginBottom: '30px',
    },
    resultText: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '10px',
      color: '#333',
    },
    surplusDeficit: {
      fontSize: '2rem',
      fontWeight: 'bold',
    },
  };

  return (
    <div style={styles.pageContainer}>
        <div style={styles.container}>
          <h1 style={styles.header}>Budget Calculator</h1>
          
          <div style={styles.grid}>
            {/* Inputs */}
            <div style={styles.card}>
              <label style={styles.label}>Monthly Income (€)</label>
              <input
                type="number"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                style={styles.input}
                onFocus={(e) => e.target.style.borderColor = "#4A90E2"}
                onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
                placeholder="0"
              />
              
              <h3 style={styles.sectionTitle}>Monthly Expenses</h3>
              {Object.keys(expenses).map(key => (
                <div key={key}>
                  <label style={styles.label}>{key} (€)</label>
                    <input
                      type="number"
                      value={expenses[key]}
                      onChange={(e) => setExpenses({...expenses, [key]: e.target.value})}
                      style={styles.input}
                      onFocus={(e) => e.target.style.borderColor = "#4A90E2"}
                      onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
                      placeholder="0"
                    />
                </div>
              ))}
            </div>

            {/* Results */}
            <div>
              <div style={styles.card}>
                <div style={styles.resultBox}>
                  <div style={styles.resultText}>Income: €{incomeNum.toFixed(2)}</div>
                  <div style={styles.resultText}>Expenses: €{total.toFixed(2)}</div>
                  <div style={{...styles.surplusDeficit, color: remaining >= 0 ? '#28a745' : '#dc3545'}}>
                    {remaining >= 0 ? 'Surplus' : 'Deficit'}: €{Math.abs(remaining).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}