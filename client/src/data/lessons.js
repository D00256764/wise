// Canonical lessons data used by LessonDetail, Lessons and Quiz pages.
// Each lesson includes optional quiz questions so the Quiz component
// can load questions directly from the same data source.
export const lessons = [
  {
    id: 1,
    title: 'Introduction to Budgeting',
    category: 'Budgeting',
    duration: 15,
    completed: true,
    thumbnail: '',
    videoUrl: 'https://www.youtube.com/embed/sVKQn2I4HDM?si=YBmu2ztT2tdow_xl',
    content: 'Learn the basics of budgeting: tracking income, expenses, and setting goals.',
    questions: [
      {
        question: 'What is the first step in creating a budget?',
        options: ['Track your expenses', 'Invest in stocks', 'Buy a new car', 'Ignore bills'],
        correct: 0,
      },
      {
        question: 'A 50/30/20 rule typically refers to allocating % to:',
        options: ['Needs/ Wants/ Savings', 'Rent/ Food/ Utilities', 'Stocks/ Bonds/ Cash', 'Short/ Mid/ Long term'],
        correct: 0,
      }
    ]
  },
  {
    id: 2,
    title: 'Saving and Emergency Funds',
    category: 'Saving',
    duration: 20,
    completed: false,
    thumbnail: '',
    videoUrl: 'https://www.youtube.com/embed/4VDWahQrf84?si=_-LG-N2PrULL6iIp',
    content: 'Why an emergency fund matters and how to build one step by step.',
    questions: [
      {
        question: 'How many months of living expenses is a common emergency fund target?',
        options: ['3-6 months', '1 month', '12-18 months', 'Never save'],
        correct: 0,
      },
      {
        question: 'Emergency funds should ideally be kept in:',
        options: ['Liquid savings account', 'Cryptocurrency', 'Long-term CD', 'Stocks only'],
        correct: 0,
      }
    ]
  },
  {
    id: 3,
    title: 'Understanding Credit',
    category: 'Credit',
    duration: 25,
    completed: false,
    thumbnail: '',
    videoUrl: 'https://www.youtube.com/embed/3-PTiJOGb5s',
    content: 'What credit scores are, how they are calculated, and best practices.',
    questions: [
      {
        question: 'Which of the following most affects your credit score?',
        options: ['Payment history', 'Favorite color', 'Phone model', 'Morning routine'],
        correct: 0,
      },
      {
        question: 'A high credit utilization ratio is generally:',
        options: ['Bad for your score', 'Good for your score', 'Irrelevant', 'Required'],
        correct: 0,
      }
    ]
  }
];
