import React from 'react';
import { Link } from 'react-router-dom';

class ExamDetails extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeQuestionsCount = this.onChangeQuestionsCount.bind(this);
    this.onChangeChoicesCount = this.onChangeChoicesCount.bind(this);
    this.onChangeIdLength = this.onChangeIdLength.bind(this);
    this.onNext = this.onNext.bind(this);
    this.generateModelUrl = this.generateModelUrl.bind(this);
  }

  onChangeQuestionsCount(event) {
    this.props.onChangeQuestionsCount(parseInt(event.target.value));
  }

  onChangeChoicesCount(event) {
    this.props.onChangeChoicesCount(parseInt(event.target.value));
  }

  onChangeIdLength(event) {
    this.props.onChangeIdLength(parseInt(event.target.value));
  }

  onNext(event) {
    this.props.onNext(event);
  }

  generateModelUrl() {
    return `/generate-model/${this.props.idLength}/${this.props.questionsCount}/${this.props.choicesCount}`;
  }

  render() {
    return (
      <div>
        <label htmlFor="questionsCount" >Quantidade de questões:</label>
        <input type="number" className='form-control' value={this.props.questionsCount} onChange={this.onChangeQuestionsCount} id="questionsCount" name="questionsCount" />

        <label htmlFor="choicesCount" className='pt-4' >Quantidade de opções por questão:</label>
        <input type="number" className='form-control' value={this.props.choicesCount} onChange={this.onChangeChoicesCount} id="choicesCount" name="choicesCount" />
        <small id="passwordHelpBlock" class="form-text text-muted">
          Quantas letras existem em cada questão. Exemplo: 5 gera questões com opções de A até E
        </small>

        <label htmlFor="idLength" className='pt-4' >Quantidade de digitos na matrícula/identificador:</label>
        <input type="number" className='form-control' value={this.props.idLength} onChange={this.onChangeIdLength} id="idLength" name="idLength" />

        <div className='d-flex justify-content-between pt-4'>
          <Link to={this.generateModelUrl()} target="_blank" rel="noopener noreferrer">Gerar modelo da prova</Link>
          <button className='btn btn-primary mt-2' onClick={this.onNext}>Preencher gabarito</button>
        </div>
      </div>
    );
  }
}

export default ExamDetails;
