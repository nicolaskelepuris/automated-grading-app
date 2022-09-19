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
        <table className='table table-striped table-bordered'>
          <thead>
            <tr>
              <th className='w-25 text-center'>Question</th>
              <th className='w-75 text-center'>Choices</th>
            </tr>
          </thead>
          <tbody>
            {
              [...Array(this.props.questionsCount).keys()].map((question) => {
                return (
                  <tr key={question}>
                    <td className='text-center align-middle'>{question + 1}</td>
                    <td className='answers input-group justify-content-between p-4'>
                      {
                        [...Array(this.props.choicesCount).keys()].map((choice) => {
                          return (
                            <div key={choice}>
                              <input
                                type="radio"
                                id={`${question}-${choice}`}
                                value={choice}
                                name={`${question}-${choice}`}
                                question={question}
                                checked={this.props.correctAnswers[question] === choice}
                                onChange={this.handleQuestionAnswerClick} />
                              <label htmlFor={`${question}-${choice}`} className={this.props.correctAnswers[question] === choice ? 'checked' : ''} >{this.intToChar(choice)}</label>
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

        <div className='d-flex justify-content-between mt-2 mb-2'>
          <button className='btn btn-secondary' onClick={this.onPrevious}>Voltar</button>
          <button className='btn btn-primary' onClick={this.onNext}>Avançar</button>
        </div>
      </div>
    );
  }
}

export default ExamAnswers;
