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

function ExamModelComponent() {
  const { idLength, questionsCount, choicesCount } = useParams();
  return <ExamModel idLength={parseInt(idLength)} questionsCount={parseInt(questionsCount)} choicesCount={parseInt(choicesCount)} />;
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/generate-model/:idLength/:questionsCount/:choicesCount" element={<ExamModelComponent />} />
      </Routes>
    </Router>
  </>
);
