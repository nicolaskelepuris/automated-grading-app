import React from 'react';
import './ExamHeader.css';

class ExamHeader extends React.Component {
  transformToDate() {
    document.getElementById("exam-date").type = 'date';
  }

  render() {
    return (
      <div className='exam-header d-flex justify-content-between'>
        <div>
          <label for='name'>Nome:</label>
          <input id='name' type='text' className='exam-header-name'></input>
        </div>

        <div>
          <label for='exam-date'>Data:</label>
          <input id='exam-date' type='text' className='exam-header-date' placeholder='' onFocus={this.transformToDate}></input>
        </div>
      </div>
    );
  }
}

export default ExamHeader;
