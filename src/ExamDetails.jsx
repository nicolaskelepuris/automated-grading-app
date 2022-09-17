import React from 'react';

class ExamDetails extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeQuestionsCount = this.onChangeQuestionsCount.bind(this);
    this.onChangeChoicesCount = this.onChangeChoicesCount.bind(this);
    this.onNext = this.onNext.bind(this);
  }

  onChangeQuestionsCount(event) {
    this.props.onChangeQuestionsCount(parseInt(event.target.value));
  }

  onChangeChoicesCount(event) {
    this.props.onChangeChoicesCount(parseInt(event.target.value));
  }

  onNext(event) {
    this.props.onNext(event);
  }

  render() {
    return (
      <div>
        <label htmlFor="questionsCount" >Quantidade de questões:</label>
        <input type="number" className='form-control' value={this.props.questionsCount} onChange={this.onChangeQuestionsCount} id="questionsCount" name="questionsCount" />

        <label htmlFor="choicesCount" >Quantidade de opções por questão:</label>
        <input type="number" className='form-control' value={this.props.choicesCount} onChange={this.onChangeChoicesCount} id="choicesCount" name="choicesCount" />

        <button className='btn btn-primary mt-2' onClick={this.onNext}>Preencher gabarito</button>
      </div>
    );
  }
}

export default ExamDetails;
