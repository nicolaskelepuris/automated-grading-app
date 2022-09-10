import React from 'react';

class Exam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          questionsCount: 10,
          choicesCount: 5,
          showExam: false,
          correctAnswers: Array(10)
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleQuestionsCountChange = this.handleQuestionsCountChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleQuestionAnswerClick = this.handleQuestionAnswerClick.bind(this)
        this.intToChar = this.intToChar.bind(this)
    }

    handleChange(event) {
      this.setState({ [event.target.name]: event.target.value })
    }

    handleQuestionsCountChange(event) {
      const value = parseInt(event.target.value)
      this.setState({
        questionsCount: value,
        correctAnswers: Array(value)
      })
    }

    handleClick() {
      this.setState({ showExam: !this.state.showExam })
    }

    handleQuestionAnswerClick(event) {
      const question = parseInt(event.target.attributes.getNamedItem("question").value)
      const value = parseInt(event.target.value)
      const correctAnswers = this.state.correctAnswers
      correctAnswers[question] = value
      this.setState({ correctAnswers: correctAnswers })
      console.log(this.state.correctAnswers)
    }

    intToChar(value) {
      return String.fromCharCode(65 + value)
    }

    render() {
        return (
            <div>
              {
                this.state.showExam

                ?

                <div id="exam">
                  <table className='table'>
                    <thead>
                      <tr>
                        <th>Question</th>
                        <th>Choices</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        [...Array(this.state.questionsCount).keys()].map((question) => {
                          return (
                            <tr key={question}>
                              <td>{question}:</td>
                              <td className='input-group'>
                                {
                                  [...Array(this.state.choicesCount).keys()].map((choice) => {
                                    return (
                                      <div className='ml-2' key={choice}>
                                        <label htmlFor={choice} >{this.intToChar(choice)} <br />
                                          <input 
                                            type="radio" 
                                            id={`${question}-${choice}`}
                                            value={ choice }
                                            name={`${question}-${choice}`}
                                            question={ question }
                                            checked={ this.state.correctAnswers[question] === choice }
                                            onChange={ this.handleQuestionAnswerClick } />
                                        </label>
                                      </div>
                                    )
                                  })
                                }
                              </td>
                            </tr>                          
                          )                      
                        })
                      }
                    </tbody>
                  </table>
                  <button className='btn btn-primary mt-2' onClick={this.handleClick}>Voltar</button>
                </div>
                :
                <div id="examParams">
                  <label htmlFor="questionsCount" >Quantidade de questões:</label>
                  <input type="number" className='form-control' value={this.state.questionsCount} onChange={this.handleQuestionsCountChange} id="questionsCount" name="questionsCount" />
                  
                  <label htmlFor="choicesCount" >Quantidade de opções por questão:</label>
                  <input type="number" className='form-control' value={this.state.choicesCount} onChange={this.handleChange} id="choicesCount" name="choicesCount" />

                  <button className='btn btn-primary mt-2' onClick={this.handleClick}>Preencher gabarito</button>
                </div>
              }
            </div>
        );
    }
}

export default Exam;
