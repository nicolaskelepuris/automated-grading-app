import React from 'react';
import ExamCorrectAnswers from './ExamCorrectAnswers';
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
      idLength: 2,
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
    body.append('id_digits_count', JSON.stringify(this.state.idLength));
    return new Request('https://automated-grading-api.azurewebsites.net/upload-file', { method: 'POST', body, header: { 'Accept': 'application/json' } });
  }

  to_csv(data) {
    const metadata = "data:text/csv;charset=utf-8,";
    const headers = "id, compared_answers, correct_answers_count\n";
    const rows = data.map(row => {
      const compared_answers = row.compared_answers.map((a, i) => `${i + 1}: ${a ? 'correto' : 'incorreto'}`).join(" | ");
      const id = `id ${row.id.join('')}`;
      return id + "," + compared_answers + "," + row.correct_count;
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

  onChangeIdLength = (value) => {
    this.setState({ idLength: value });
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
              idLength={this.state.idLength}
              onChangeQuestionsCount={this.onChangeQuestionsCount}
              onChangeChoicesCount={this.onChangeChoicesCount}
              onChangeIdLength={this.onChangeIdLength}
            />}

            {this.state.state === 'answers' && <ExamCorrectAnswers
              onPrevious={this.previousState}
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
