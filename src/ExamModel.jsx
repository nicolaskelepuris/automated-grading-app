import React from 'react';
import ExamAnswers from './ExamAnswers';
import ExamId from './ExamId';
import html2canvas from "html2canvas";
import './ExamModel.css';

class ExamModel extends React.Component {
  generateImage() {
    html2canvas(document.getElementById("exam-model"))
      .then(canvas => {
        const data = canvas.toDataURL('image/jpg');
        const link = document.createElement('a');

        if (typeof link.download === 'string') {
          link.href = data;
          link.download = 'image.jpg';

          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          window.open(data);
        }
      });
  }

  render() {
    return (
      <>
        <div className='m-5 d-flex justify-content-center'><button className='btn btn-primary' onClick={this.generateImage}>Baixar modelo</button></div>
        <div id='exam-model' className='page'>
          <div className='w-75 h-100 m-auto'>
            <div id='exam-model-identifier'>
              <ExamId idLength={this.props.idLength} />
            </div>
            <div id='exam-model-answers'>
              <ExamAnswers
                onPrevious={() => { }}
                onNext={() => { }}
                questionsCount={this.props.questionsCount}
                choicesCount={this.props.choicesCount}
                correctAnswers={[]}
                onAnswerSelected={() => { }}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ExamModel;
