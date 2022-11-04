import React from 'react';
import './ExamHeader.css';

class ExamHeader extends React.Component {
  constructor(props) {
    super(props);

    this.transformToDate = this.transformToDate.bind(this);
  }

  transformToDate() {
    if (!this.props.readonly) {
      document.getElementById("exam-date").type = 'date';
    }
  }

  render() {
    return (
      <div className='exam-header d-flex justify-content-between'>
        <div>
          <label htmlFor='name'>Nome:</label>
          <input id='name' type='text' readOnly={this.props.readonly} className='exam-header-name'></input>
        </div>

        <div>
          <label htmlFor='exam-date'>Data:</label>
          <input id='exam-date' type='text' readOnly={this.props.readonly} className='exam-header-date' placeholder='' onFocus={this.transformToDate}></input>
        </div>
      </div>
    );
  }
}

export default ExamHeader;
