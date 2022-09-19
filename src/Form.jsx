import React from 'react';
import ExamAnswers from './ExamAnswers';
import ExamDetails from './ExamDetails';
import ExamFiles from './ExamFiles';
import './Form.css';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionsCount: 10,
      choicesCount: 5,
      correctAnswers: Array(10),
      state: 'details',
      error: false,
      success: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onAnswerSelected = this.onAnswerSelected.bind(this);
    this.onChangeQuestionsCount = this.onChangeQuestionsCount.bind(this);
    this.onChangeChoicesCount = this.onChangeChoicesCount.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    var response;
    try {
      response = await fetch(this.createRequest(event.target));
      if (response.status !== 200) return this.setError();
    } catch (error) {
      return this.setError();
    }

    this.setSuccess();

    const json = await response.json();

    const csv = this.to_csv(json.data);
    window.open(encodeURI(csv));
  }

  createRequest(form) {
    const body = new FormData(form);
    body.append('choicesCount', this.state.choicesCount);
    body.append('correctAnswers', JSON.stringify(this.state.correctAnswers));
    return new Request('http://localhost:8000/upload-file', { method: 'POST', body, header: { 'Accept': 'application/json' } });
  }

  to_csv(data) {
    const metadata = "data:text/csv;charset=utf-8,";
    const headers = "compared_answers, correct_answers_count\n";
    const rows = data.map(row => {
      const compared_answers = row.compared_answers.map((a, i) => `${i + 1}: ${a ? 'correto' : 'incorreto'}`).join(" | ");
      return compared_answers + "," + row.correct_count;
    }).join("\n");

    return metadata + headers + rows;
  }

  setError() {
    this.setState({ error: true });
    setTimeout(() => {
      this.setState({ error: false });
    }, 3000);
  }

  setSuccess() {
    this.setState({ success: true });
    setTimeout(() => {
      this.setState({ success: false });
    }, 3000);
  }

  nextState = () => {
    const transitions = {
      details: 'answers',
      answers: 'files'
    };

    this.setState({ state: transitions[this.state.state] || this.state.state });
  };

  previousState = () => {
    const transitions = {
      answers: 'details',
      files: 'answers'
    };

    this.setState({ state: transitions[this.state.state] || this.state.state });
  };

  onAnswerSelected = (question, answer) => {
    const correctAnswers = this.state.correctAnswers;
    correctAnswers[question] = answer;
    this.setState({ correctAnswers: correctAnswers });
    console.log(this.state.correctAnswers);
  };

  onChangeQuestionsCount = (value) => {
    this.setState({
      questionsCount: value,
      correctAnswers: Array(value)
    });
  };

  onChangeChoicesCount = (value) => {
    this.setState({ choicesCount: value });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className='container mt-5'>
            {this.state.state === 'details' && <ExamDetails
              onNext={this.nextState}
              questionsCount={this.state.questionsCount}
              choicesCount={this.state.choicesCount}
              onChangeQuestionsCount={this.onChangeQuestionsCount}
              onChangeChoicesCount={this.onChangeChoicesCount}
            />}

            {this.state.state === 'answers' && <ExamAnswers onPrevious={this.previousState}
              onNext={this.nextState}
              questionsCount={this.state.questionsCount}
              choicesCount={this.state.choicesCount}
              correctAnswers={this.state.correctAnswers}
              onAnswerSelected={this.onAnswerSelected}
            />}

            {this.state.state === 'files' && <ExamFiles onPrevious={this.previousState} />}
            {this.state.error && <div className="alert alert-danger mt-4" role="alert">Erro!</div>}
            {this.state.success && <div className="alert alert-success mt-4" role="alert">Sucesso!</div>}
          </div>
        </form>
      </div>
    );
  }
}

export default Form;
