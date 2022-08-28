import React from 'react';

class FileUploadForm extends React.Component {
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
        return new Request('https://automated-grading-api.herokuapp.com/', { method: 'POST', body, header: { 'Accept': 'application/json' } })
    }

    render() {
        return (
            <div className='FileUploadForm' style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
                <h1>
                    <form onSubmit={this.handleSubmit}>
                        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                         <label htmlFor="files" > Select files:</label>
                        </div> 
                        <input type="file" className='form-control' id="files" name="files" multiple accept="image/jpg, image/jpeg, image/png" />
                         <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}> 
                        <input type="submit" className='btn btn-primary mt-2' value="Enviar"/>
                        </div>
                        <label htmlFor="files"></label>

                    </form>
                </h1>
                </div>
        );
    }
}

export default FileUploadForm;
