import React from 'react';
import Exam from './Exam';
import downloadElement from "./download_element_as_jpg";

class ExamModel extends React.Component {
  generateImage() {
    downloadElement("exam-model");
  }

  render() {
    return (
      <>
        <div className='m-5 d-flex justify-content-center'><button className='btn btn-primary' onClick={this.generateImage}>Baixar modelo</button></div>
        <Exam 
          idLength={this.props.idLength}
          questionsCount={this.props.questionsCount}
          choicesCount={this.props.choicesCount}
          correctAnswers={[]}
          onAnswerSelected={() => { }}
          readonlyHeader={true}
        />
      </>
    );
  }
}

export default ExamModel;
