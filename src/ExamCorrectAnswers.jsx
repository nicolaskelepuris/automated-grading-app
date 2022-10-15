import React from 'react';

import ExamAnswers from './ExamAnswers';

class ExamCorrectAnswers extends React.Component {
  constructor(props) {
    super(props);

    this.onNext = this.onNext.bind(this);
    this.onPrevious = this.onPrevious.bind(this);
  }

  onNext(event) {
    this.props.onNext(event);
  }

  onPrevious(event) {
    this.props.onPrevious(event);
  }

  render() {
    return (
      <>
        <h1 className='mb-5'>Preencha com as respostas corretas</h1>
        <ExamAnswers
          questionsCount={this.props.questionsCount}
          choicesCount={this.props.choicesCount}
          correctAnswers={this.props.correctAnswers}
          onAnswerSelected={this.props.onAnswerSelected}
        />
        <div className='d-flex justify-content-between mt-4 mb-4'>
          <button className='btn btn-secondary' onClick={this.props.onPrevious}>Voltar</button>
          <button className='btn btn-primary' onClick={this.props.onNext}>Avançar</button>
        </div>
      </>
    );
  }
}

export default ExamCorrectAnswers;
