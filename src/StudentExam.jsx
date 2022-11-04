import React from 'react';
import Exam from './Exam';
import downloadElement from "./download_element_as_jpg";

class StudentExam extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      answers: Array(10),
      ids: Array(this.props.idLength),
    };

    this.onAnswerSelected = this.onAnswerSelected.bind(this);
    this.onIdSelected = this.onIdSelected.bind(this);
  }

  onAnswerSelected = (question, answer) => {
    const answers = this.state.answers;
    answers[question] = answer;
    this.setState({ answers: answers });
  };

  onIdSelected = (digit, answer) => {
    const ids = this.state.ids;
    ids[digit] = answer;
    this.setState({ ids: ids });
  };

  generateImage() {
    downloadElement("exam-model");
  }

  render() {
    return (
      <>
        <div className='m-5 d-flex justify-content-center'><button className='btn btn-primary' onClick={this.generateImage}>Finalizar</button></div>
        <Exam 
          idLength={this.props.idLength}
          questionsCount={this.props.questionsCount}
          choicesCount={this.props.choicesCount}
          correctAnswers={this.state.answers}
          onAnswerSelected={this.onAnswerSelected}
          onIdSelected={this.onIdSelected}
          ids={this.state.ids}
          readonlyHeader={false}
        />
      </>
    );
  }
}

export default StudentExam;
