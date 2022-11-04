import React from 'react';

import ExamAnswers from './ExamAnswers';
import './ExamCorrectAnswers.css';

class ExamCorrectAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      showWeights: false
    };

    this.onNext = this.onNext.bind(this);
    this.onPrevious = this.onPrevious.bind(this);
    this.onChangeWeight = this.onChangeWeight.bind(this);
    this.onShowWeights = this.onShowWeights.bind(this);
  }

  onNext(event) {
    event.preventDefault();
    if (this.props.correctAnswers.filter(a => typeof a === 'number').length === this.props.questionsCount) {
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

  onChangeWeight(index, event) {
    const value = parseFloat(event.target.value) || 0;
    this.props.onChangeWeight(index, value);
  }

  onShowWeights(event) {
    event.preventDefault();
    this.setState({ showWeights: true });
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
        {
          !this.state.showWeights &&
          <button className='btn btn-primary' onClick={this.onShowWeights}>Adicionar pesos às questões</button>
        }
        {
          this.state.showWeights &&
          <div>
            <h2>Pesos</h2>
            <div className='d-flex flex-wrap'>
              {
                [...this.props.weights.keys()].map((weight) => {
                  return (
                    <div key={weight} className='p-3'>
                      <label htmlFor={`weight-${weight}`} >Questão {weight + 1}:</label>
                      <input
                        type='number'
                        min='0'
                        step='0.5'
                        className='form-control question-weight'
                        value={this.props.weights[weight]}
                        onChange={e => this.onChangeWeight(weight, e)}
                        id={`weight-${weight}`}
                        name={`weight-${weight}`}
                      />
                    </div>
                  );
                })
              }
            </div>
          </div>
        }
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
