import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import LessonDetail from './LessonDetail';
import { lessons } from '../data/lessons';

const renderWithRouter = (component, route = '/lessons/1') => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/lessons/:id" element={component} />
      </Routes>
    </MemoryRouter>
  );
};

describe('LessonDetail', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('displays lesson title and content', () => {
    renderWithRouter(<LessonDetail />, '/lessons/1');
    
    const lesson = lessons.find(l => l.id === 1);
    if (lesson) {
      expect(screen.getByText(lesson.title)).toBeInTheDocument();
      expect(screen.getByText(lesson.content)).toBeInTheDocument();
    }
  });

  it('displays video iframe for lesson', () => {
    renderWithRouter(<LessonDetail />, '/lessons/1');
    
    const iframe = screen.getByTitle('lesson-video');
    expect(iframe).toBeInTheDocument();
    expect(iframe.tagName).toBe('IFRAME');
  });

  it('shows Mark Complete button initially', () => {
    renderWithRouter(<LessonDetail />, '/lessons/1');
    
    expect(screen.getByText(/Mark Complete/i)).toBeInTheDocument();
  });

  it('changes button to Completed when marked complete', () => {
    renderWithRouter(<LessonDetail />, '/lessons/1');
    
    const completeButton = screen.getByText(/Mark Complete/i);
    fireEvent.click(completeButton);
    
    expect(screen.getByText(/✓ Completed/i)).toBeInTheDocument();
  });

  it('saves completed lesson to localStorage', async () => {
    localStorage.clear();
    renderWithRouter(<LessonDetail />, '/lessons/1');
    
    const completeButton = screen.getByText(/Mark Complete/i);
    fireEvent.click(completeButton);
    
    await waitFor(() => {
      const completedLessons = JSON.parse(localStorage.getItem('completedLessons') || '[]');
      expect(completedLessons).toContain(1);
    });
  });

  it('displays Take Quiz link for lessons with questions', () => {
    renderWithRouter(<LessonDetail />, '/lessons/1');
    
    const lesson = lessons.find(l => l.id === 1);
    if (lesson && lesson.questions && lesson.questions.length > 0) {
      expect(screen.getByText(/Take Quiz/i)).toBeInTheDocument();
    }
  });

  it('does not display quiz questions on lesson detail page', () => {
    renderWithRouter(<LessonDetail />, '/lessons/1');
    
    const lesson = lessons.find(l => l.id === 1);
    if (lesson && lesson.questions) {
      // Questions should NOT be displayed, only the link
      const firstQuestion = lesson.questions[0];
      expect(screen.queryByText(firstQuestion.question)).not.toBeInTheDocument();
    }
  });

  it('shows back button', () => {
    renderWithRouter(<LessonDetail />, '/lessons/1');
    
    expect(screen.getByText(/← Back to Lessons/i)).toBeInTheDocument();
  });

  it('handles invalid lesson ID gracefully', () => {
    renderWithRouter(<LessonDetail />, '/lessons/999');
    
    expect(screen.getByText(/Lesson not found/i)).toBeInTheDocument();
  });
});
