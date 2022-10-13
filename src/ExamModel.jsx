import React from 'react';
import ExamAnswers from './ExamAnswers';
import ExamId from './ExamId';
import html2canvas from "html2canvas";

class ExamModel extends React.Component {
  componentDidMount() {
    console.log(this.props)
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
      <div id='exam-model'>
        <ExamId idLength={this.props.idLength} />
        <ExamAnswers
          onPrevious={() => { }}
          onNext={() => { }}
          questionsCount={this.props.questionsCount}
          choicesCount={this.props.choicesCount}
          correctAnswers={[]}
          onAnswerSelected={() => { }}
        />
      </div>
    );
  }
}

export default ExamModel;
