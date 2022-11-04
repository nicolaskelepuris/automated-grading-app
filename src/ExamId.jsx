import React from 'react';
import './ExamId.css';
import './ExamAnswers.css';

class ExamId extends React.Component {
  constructor(props) {
    super(props);

    this.handleIdClick = this.handleIdClick.bind(this);
    this.intToChar = this.intToChar.bind(this);
  }

  handleIdClick(event) {
    const digit = parseInt(event.target.attributes.getNamedItem("digit").value);
    const answer = parseInt(event.target.value);
    this.props.onIdSelected(digit, answer);
  }

  intToChar(value) {
    return String.fromCharCode(65 + value);
  }

  render() {
    return (
      <table className='table table-striped table-bordered thick-border'>
        <thead>
          <tr>
            <th className='w-25 text-center id-frame-label'>Matrícula</th>
          </tr>
        </thead>
        <tbody>
          {
            [...Array(this.props.idLength).keys()].map((digit) => {
              return (
                <tr key={digit}>
                  <td className='answers input-group align-items-center'>
                    {
                      [...Array(10).keys()].map((choice) => {
                        return (
                          <div key={choice} className='d-flex align-items-center'>
                            <input
                              type="radio"
                              id={`id-${digit}-${choice}`}
                              value={choice}
                              name={`id-${digit}-${choice}`}
                              digit={digit}
                              checked={this.props.ids ? this.props.ids[digit] === choice : false}
                              onChange={this.handleIdClick || (() => {})} />
                            <label htmlFor={`id-${digit}-${choice}`} className={(this.props.ids ? this.props.ids[digit] === choice : false) ? 'checked' : ''} >{choice}</label>
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

export default ExamId;
