import React from 'react';

class ExamAnswers extends React.Component {
  constructor(props) {
    super(props);

    this.handleQuestionAnswerClick = this.handleQuestionAnswerClick.bind(this);
    this.intToChar = this.intToChar.bind(this);
    this.onNext = this.onNext.bind(this);
    this.onPrevious = this.onPrevious.bind(this);
  }

  handleQuestionAnswerClick(event) {
    const question = parseInt(event.target.attributes.getNamedItem("question").value);
    const answer = parseInt(event.target.value);
    this.props.onAnswerSelected(question, answer);
  }

  intToChar(value) {
    return String.fromCharCode(65 + value);
  }

  onNext(event) {
    this.props.onNext(event);
  }

  onPrevious(event) {
    this.props.onPrevious(event);
  }

  render() {
    return (
      <div>
        <table className='table'>
          <thead>
            <tr>
              <th>Question</th>
              <th>Choices</th>
            </tr>
          </thead>
          <tbody>
            {
              [...Array(this.props.questionsCount).keys()].map((question) => {
                return (
                  <tr key={question}>
                    <td>{question}:</td>
                    <td className='input-group'>
                      {
                        [...Array(this.props.choicesCount).keys()].map((choice) => {
                          return (
                            <div className='ml-2' key={choice}>
                              <label htmlFor={choice} >{this.intToChar(choice)} <br />
                                <input
                                  type="radio"
                                  id={`${question}-${choice}`}
                                  value={choice}
                                  name={`${question}-${choice}`}
                                  question={question}
                                  checked={this.props.correctAnswers[question] === choice}
                                  onChange={this.handleQuestionAnswerClick} />
                              </label>
                            </div>
                          );
                        })
                      }
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>

        <button className='btn btn-danger mt-2' onClick={this.onPrevious}>Voltar</button>
        <button className='btn btn-primary mt-2' onClick={this.onNext}>Avançar</button>
      </div>
    );
  }
}

export default ExamAnswers;
