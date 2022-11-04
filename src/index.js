import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams
} from 'react-router-dom';

import Form from './Form';
import ExamModel from './ExamModel';
import StudentExam from './StudentExam';

function ExamModelComponent() {
  const { idLength, questionsCount, choicesCount } = useParams();
  return <ExamModel idLength={parseInt(idLength)} questionsCount={parseInt(questionsCount)} choicesCount={parseInt(choicesCount)} />;
}

function StudentExamComponent() {
  const { idLength, questionsCount, choicesCount } = useParams();
  return <StudentExam idLength={parseInt(idLength)} questionsCount={parseInt(questionsCount)} choicesCount={parseInt(choicesCount)} />;
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/gerar-modelo/:idLength/:questionsCount/:choicesCount" element={<ExamModelComponent />} />
        <Route path="/realizar-prova/:idLength/:questionsCount/:choicesCount" element={<StudentExamComponent />} />
      </Routes>
    </Router>
  </>
);
