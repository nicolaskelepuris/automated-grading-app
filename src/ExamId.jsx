import React from 'react';
import './ExamId.css';
import './ExamAnswers.css';

class ExamId extends React.Component {
  render() {
    return (
      <table className='table table-striped table-bordered'>
        <thead>
          <tr>
            <th className='w-25 text-center id-frame-label'>Identificador</th>
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
                              id={`${digit}-${choice}`}
                              value={choice}
                              name={`${digit}-${choice}`}
                              checked={false}
                              onChange={() => {}} />
                            <label htmlFor={`${digit}-${choice}`} >{choice}</label>
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
