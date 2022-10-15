import React from 'react';

class ExamAnswers extends React.Component {
  constructor(props) {
    super(props);

    this.handleQuestionAnswerClick = this.handleQuestionAnswerClick.bind(this);
    this.intToChar = this.intToChar.bind(this);
  }

  handleQuestionAnswerClick(event) {
    const question = parseInt(event.target.attributes.getNamedItem("question").value);
    const answer = parseInt(event.target.value);
    this.props.onAnswerSelected(question, answer);
  }

  intToChar(value) {
    return String.fromCharCode(65 + value);
  }

  render() {
    return (
      <table className='table table-striped table-bordered'>
        <tbody>
          {
            [...Array(this.props.questionsCount).keys()].map((question) => {
              return (
                <tr key={question}>
                  <td className='text-center'>{question + 1}</td>
                  <td className='answers input-group justify-content-around p-4'>
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
    );
  }
}

export default ExamAnswers;
