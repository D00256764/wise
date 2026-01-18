# Financial Literacy Web Application
Name: Hafsa Moin
Module: Web Browser Application Development

# Wise - An Interactive Financial Literacy Platform for Irish Young Adults

# Problem Statement
Financial literacy among young adults in Ireland remains a critical barrier to financial wellbeing and long term economic difficulty. Recent studies reveal that more than 42% of young adults struggle to grasp basic financial concepts (RTE,2025). This demonstrates a severe educational gap that impacts their ability to make informed financial decisions. Furthermore, PTSB's Reflecting Ireland research reveals a significant gap in financial among adults in Ireland, with many lacking the basic understanding of savings, credit, and budgeting principles (PTSB, 2025). Although the Irish Funds Association has addressed this gap by launchig initiatives to enhance financial literacy among Transition Year students to prepare young people for financial indepndence (Irish Funds, 2024), these programs are limited to scope, reaching only a fraction of a population, not to mention many students go on to skip transitiion year entirely. Therefore, this application has been developed to address the accessibility gap as well as make an interactive and educational tool that enhances the learning experience for young adults.

## Objectives

1. This application aims to provide comprehensive video based literacy modules that cover basic concepts like budgeting, saving, credit management and investing.
2. This application implements quiz based assessments after each lesson to reinforce learning, provide feedback, and allow users to track their progress through the dashboard
3. This application develops a simple but effective budget calculator that enables users to input their expenses and understand their spending patterns
4. This application designs a personalised dashboard that allows users to keep track of their lessons and how they score in quizzes to motivate them to engage more effectively 

## Framework Justification
- React Frontend: This enables the development of complex UI elemtsn like interactive quizzes and budget calculators allowing a smooth performance and being able to provide real time updates.

- Node.js: Provides a fast and scalable backend

- MongoDB: Its' flexibile schema makes it easier to store and maintain user data and it's built to scale up as the application gets bigger and implement more features

## Application Design

This application follows the MERN Stack Architecture (MongoDB, Express, React, Node)

- Frontend: React components organised by features (Home, Budget Calculator, Lessons, Register)
- Backend: RESTful API built with Express, handling User Registration and Authentication
- Database: MongoDB Atlas which is used to store user credentials
- State Management: Redux handles the user session, ensuring that once a user logs in, their identity is persisted across the Dashboard and Quiz sections.

## Key Features Implemented

<img width="1068" height="649" alt="Screenshot 2026-01-18 at 21 37 24" src="https://github.com/user-attachments/assets/67539978-f518-4661-ad4b-9bc0efa4c2d6" />

### Feature 1: User Authentication System

Registration with email validation and password strength requirements:
<img width="402" height="382" alt="Screenshot 2026-01-18 at 21 38 15" src="https://github.com/user-attachments/assets/ad987f39-5bbf-4979-a581-3db6f2b41cf6" />

Logout functionality clearing tokens and session data:
<img width="422" height="338" alt="Screenshot 2026-01-18 at 21 38 33" src="https://github.com/user-attachments/assets/7e26e0b8-6264-4a83-8d0f-934fc9378e23" />


### Feature 2: Financial Lessons Module
<img width="502" height="647" alt="Screenshot 2026-01-18 at 21 41 09" src="https://github.com/user-attachments/assets/b5895c64-3a07-4a41-9118-aaf9d30a6756" />
3 lessons organized into categories (Budgeting, Saving, Credit)
Embedded YouTube video players for multimedia content
Progress tracking marking lessons as complete

### Feature 3: Interactive Quiz System

Multiple-choice questions (2-3 per lesson): 
<img width="503" height="499" alt="Screenshot 2026-01-18 at 21 41 41" src="https://github.com/user-attachments/assets/79262163-796c-4937-abd5-2bdf6339aa62" />

Real-time answer selection with instant feedback
Immediate scoring upon submission:
<img width="232" height="205" alt="Screenshot 2026-01-18 at 21 41 58" src="https://github.com/user-attachments/assets/9653ded2-f312-423f-b16e-8a25537fc8db" />
Answer validation against correct answers stored in database
Quiz history tracking for progress monitoring

### Feature 4: Budget Calculator
<img width="377" height="660" alt="Screenshot 2026-01-18 at 21 43 33" src="https://github.com/user-attachments/assets/966213e3-37de-4a90-8380-8cf3dd168aa3" />

Input fields for monthly income 
Expense categories: Rent, Food, Transport, Utilities, Entertainment, Savings
Real-time calculation of total expenses and remaining balance

### Feature 5: User Dashboard
<img width="526" height="627" alt="Screenshot 2026-01-18 at 21 39 10" src="https://github.com/user-attachments/assets/c6415005-cd16-4ba2-af5b-eb44bcb10ed3" />

Personalized greeting with user's name
Progress statistics: lessons completed (X/3), quiz average (%)
Quick navigation to continue learning or start new lessons



## Code Quality & Standards

Modular Architecture: Separation of dedicated component, service, and utility files
Reusable Components: Button, Input, Card components used across application
Error Handling: Try-catch blocks in all async operations, user-friendly error messages
Code Documentation: JSDoc comments on complex functions
Consistent Naming: camelCase for variables/functions, PascalCase for components

## Functional Testing
I implemented automated test suites for the core modules:

### Budget Calculator (BudgetCalculator.test.jsx): 
- Verified that income and expense inputs correctly calculate totals.
- Validated the dynamic logic for displaying "Surplus" vs "Deficit" labels based on user input.
- Result: Pass. Logic ensures mathematical accuracy for financial planning.

### Learning System (LessonDetail.test.jsx):

- Tested that lessons load correct content based on URL parameters.
- Verified the "Mark Complete" functionality and persistence in localStorage.
- Ensured navigation links to quizzes only appear for valid lessons.
- Result: Pass. Educational flow is logical and persistent.

### Quizzes (Quiz.test.jsx):

- Validated question rendering and answer selection logic.
- Tested the score calculation engine and the final results display.
- Verified that quiz results are stored to track user average scores.
- Result: Pass. Gamification mechanics work as intended.

### Usability Evaluation

- Accessibility: Used semantic HTML (buttons, inputs) to ensure screen reader compatibility.

- Feedback Loops: Added visual cues (checkmarks for completed lessons, color-coded surplus/deficit) to guide the user.

## Configuration Manual

### Hardware Requirements:

- Processor: Intel Core i5 or equivalent (minimum)
- RAM: 8GB 
- Storage: 2GB free disk space

### Software Requirements:

- Operating System: macOS Tahoe
- Node.js: Version 20.x or later
- npm: Version 20.x or later 
- MongoDB Atlas Account 
 
### Backend Setup
1. Navigate to the server folder and install dependencies: npm install
2. Create a .env file and add the database connection string to it
3. Start the server: node index.js

### Frontend Setup
1. Navigate to the client folder: cd client
2. Install dependencies: npm install
3. Start the application: npm run dev (or npm start)


### Database Setup
1. Create an account on MongoDB Atlas, create the cluster
2. Create the database user and save the password
3. Copy the connection string and replace the password with the actual password
4. Paste the string into server/.env file as MONGODB_URDI value

### Access Application
1. Open browser (port could be different): http://localhost:5173
2. Register a new account to get started

## Overall Scope
Wise successfully delivers a comprehensive financial literacy platform addressing a documented gap amongst young Irish adults. With almost 70% of young Irish adults struggling to grasp basic concepts, and significant gaps identified in asult financial literacy nationwide (PTSB, 2025), this application provides an accessible and engaging solution. 

### Innovation

Unified Platform: Combines education, assessment, and tools in one experience (competitors often separate these functions).
Engaging Elements: Progress tracking, and quiz scoring encourage continued engagement.

### Future Enhancements

Phase 2 Features (Identified but not implemented due to time constraints):

- Social features: Discussion forums, peer learning communities
- Advanced calculators: Mortgage calculator, retirement planning, investment simulators
- Goal setting: User-defined savings goals with progress tracking
- Notifications: Email/push reminders for continued learning
- Admin panel: Content management system for updating lessons
- Quix explanations for incorrect answers would enhance learning
- More comprehensive test coverage 

### References

Browne, Oliver. “Here’s How Financial Literacy Affects the Money in Your Pocket.” RTE.ie, 23 Nov. 2025, www.rte.ie/brainstorm/2025/1123/1493145-financial-literacy-money-purchases-savings-debt-finance-subscriptions/, urn:epic:1493145. 
“Irish Funds Announces next Phase of Transition Year Programme to Enhance Financial Literacy among Students | Irish Funds Industry Association | International Investments.” Irish Funds Industry Association Clg, 2024, www.irishfunds.ie/news-knowledge/news/irish-funds-announces-next-phase-of-transition-year-programme-to-enhance-financial-literacy-among-students/.
“PTSB Reflecting Ireland Research Reveals Gap in Financial Literacy amongst Adults in Ireland.” Ptsb.ie, 2025, www.ptsb.ie/about-us/notices/2025/june/ptsb-reflecting-ireland-research-reveals-gap-in-financial-literacy-amongst-adults-in-ireland/.
