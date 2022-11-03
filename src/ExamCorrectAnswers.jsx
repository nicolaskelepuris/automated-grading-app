import React from 'react';

import ExamAnswers from './ExamAnswers';

class ExamCorrectAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false
    };

    this.onNext = this.onNext.bind(this);
    this.onPrevious = this.onPrevious.bind(this);
  }

  onNext(event) {
    event.preventDefault();
    if (this.props.correctAnswers.filter(a => typeof a === 'number').length === this.props.questionsCount)
    {
      this.props.onNext(event);
    } else {
      this.setError();
    }
  }

  setError() {
    this.setState({ error: true });
    setTimeout(() => {
      this.setState({ error: false });
    }, 7000);
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
          <button className='btn btn-secondary' onClick={this.onPrevious}>Voltar</button>
          <button className='btn btn-primary' onClick={this.onNext}>Avançar</button>
        </div>
        {this.state.error && <div className="alert alert-danger mt-4" role="alert">Selecione a resposta para todas as questões!</div>}
      </>
    );
  }
}

export default ExamCorrectAnswers;
