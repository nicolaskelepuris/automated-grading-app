import React from 'react';

class ExamId extends React.Component {
  render() {
    return (
      <table className='table table-striped table-bordered'>
        <thead>
          <tr>
            <th className='w-25 text-center'>Identificador</th>
          </tr>
        </thead>
        <tbody>
          {
            [...Array(this.props.idLength).keys()].map((digit) => {
              return (
                <tr key={digit}>
                  <td className='answers input-group justify-content-between p-4'>
                    {
                      [...Array(10).keys()].map((choice) => {
                        return (
                          <div key={choice}>
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
