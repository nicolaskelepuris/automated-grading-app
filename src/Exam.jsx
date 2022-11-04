import React from 'react';
import ExamHeader from './ExamHeader';
import ExamId from './ExamId';
import ExamAnswers from './ExamAnswers';
import './Exam.css';

class Exam extends React.Component {
  render() {
    return (
      <div className='page-wrapper'>
        <div id='exam-model' className='page'>
          <div className='w-75 h-100 m-auto'>
            <div id='exam-model-header'>
              <ExamHeader readonly={this.props.readonlyHeader} />
            </div>
            <div id='exam-model-identifier'>
              <ExamId idLength={this.props.idLength} />
            </div>
            <div id='exam-model-answers'>
              <ExamAnswers
                questionsCount={this.props.questionsCount}
                choicesCount={this.props.choicesCount}
                correctAnswers={this.props.correctAnswers}
                onAnswerSelected={this.props.onAnswerSelected}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Exam;
