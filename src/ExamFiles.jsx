import React from 'react';

class ExamFiles extends React.Component {
  constructor(props) {
    super(props);

    this.onPrevious = this.onPrevious.bind(this);
  }

  onPrevious(event) {
    this.props.onPrevious(event);
  }

  render() {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <label htmlFor="files" >Adicione as provas realizadas pelos alunos:</label>
        </div>

        <input type="file" className='form-control' id="files" name="files" multiple accept="image/jpg, image/jpeg, image/png" />

        <button className='btn btn-danger mt-2' onClick={this.onPrevious}>Voltar</button>
        <input type="submit" className='btn btn-primary mt-2' value="Enviar" />
      </div>
    );
  }
}

export default ExamFiles;
