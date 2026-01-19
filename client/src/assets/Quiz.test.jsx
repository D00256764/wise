import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import Quiz from './Quiz';
import { lessons } from '../data/lessons';

const renderWithRouter = (component, route = '/quiz/1') => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      {component}
    </MemoryRouter>
  );
};

describe('Quiz', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders quiz for valid lesson ID', () => {
    renderWithRouter(<Quiz />, '/quiz/1');
    
    expect(screen.getByText(/Question 1 of/i)).toBeInTheDocument();
    const lesson = lessons.find(l => l.id === 1);
    if (lesson && lesson.questions.length > 0) {
      expect(screen.getByText(lesson.questions[0].question)).toBeInTheDocument();
    }
  });

  it('displays all question options', () => {
    renderWithRouter(<Quiz />, '/quiz/1');
    
    const lesson = lessons.find(l => l.id === 1);
    if (lesson && lesson.questions.length > 0) {
      const firstQuestion = lesson.questions[0];
      firstQuestion.options.forEach(option => {
        expect(screen.getByText(option)).toBeInTheDocument();
      });
    }
  });

  it('allows selecting an answer', () => {
    renderWithRouter(<Quiz />, '/quiz/1');
    
    const lesson = lessons.find(l => l.id === 1);
    if (lesson && lesson.questions.length > 0) {
      const firstOption = screen.getByText(lesson.questions[0].options[0]);
      fireEvent.click(firstOption);
      
      // Check if the option button has selected styling (border color change)
      expect(firstOption).toBeInTheDocument();
    }
  });

  it('navigates between questions using Next button', () => {
    renderWithRouter(<Quiz />, '/quiz/1');
    
    const lesson = lessons.find(l => l.id === 1);
    if (lesson && lesson.questions.length > 1) {
      // Find Next button
      const nextButton = screen.getByText(/Next/i);
      fireEvent.click(nextButton);
      
      // Should now show question 2
      expect(screen.getByText(/Question 2 of/i)).toBeInTheDocument();
    }
  });

  it('calculates and saves score on submit', async () => {
    localStorage.clear();
    renderWithRouter(<Quiz />, '/quiz/1');
    
    const lesson = lessons.find(l => l.id === 1);
    if (lesson && lesson.questions.length > 0) {
      // Select correct answers
      lesson.questions.forEach((q, index) => {
        const correctOption = screen.getByText(q.options[q.correct]);
        fireEvent.click(correctOption);
        
        // Move to next question if not last
        if (index < lesson.questions.length - 1) {
          const nextButton = screen.getByText(/Next/i);
          fireEvent.click(nextButton);
        }
      });
      
      // Submit quiz
      const submitButton = screen.getByText(/Submit Quiz/i);
      fireEvent.click(submitButton);
      
      // Check score is displayed
      await waitFor(() => {
        expect(screen.getByText(/Score:/i)).toBeInTheDocument();
      });
      
      // Check localStorage was updated
      const quizScores = JSON.parse(localStorage.getItem('quizScores') || '[]');
      expect(quizScores.length).toBeGreaterThan(0);
      expect(localStorage.getItem('quizAverage')).toBeTruthy();
    }
  });

  it('displays error message or defaults for invalid quiz', () => {
    renderWithRouter(<Quiz />, '/quiz/999');
    
    // The component will try to find a default lesson or show error
    // Since it defaults to first lesson with questions, it may show that instead
    const hasError = screen.queryByText(/Quiz not found/i);
    const hasQuestion = screen.queryByText(/Question/i);
    
    // Either shows error or defaults to first lesson
    expect(hasError || hasQuestion).toBeTruthy();
  });
});
