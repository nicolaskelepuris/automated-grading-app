import React from 'react';
import Exam from './Exam';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    
    }

    async handleSubmit(event) {
        event.preventDefault();
        const response = await fetch(this.createRequest(event.target))
        console.log(await response.json());
    }

    createRequest(form) {
        const body = new FormData(form);
        return new Request('http://localhost:8000/upload-file', { method: 'POST', body, header: { 'Accept': 'application/json' } })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div style={{display: 'flex',  justifyContent:'space-around', alignItems:'center', height: '80vh'}}>
                        <Exam />
                        <div>
                            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                                <label htmlFor="files" > Select files:</label>
                            </div>

                            <input type="file" className='form-control' id="files" name="files" multiple accept="image/jpg, image/jpeg, image/png" />
                        </div>
                    </div>        

                    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}> 
                        <input type="submit" className='btn btn-lg btn-primary mt-2' value="Enviar"/>
                    </div>
                </form>
            </div>
        );
    }
}

export default Form;
