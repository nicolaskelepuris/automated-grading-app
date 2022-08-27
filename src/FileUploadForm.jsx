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
        return new Request('https://automated-grading-api.herokuapp.com/upload-file', { method: 'POST', body, header: { 'Accept': 'application/json' } })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="files">Select files:</label>
                <input type="file" className='form-control' id="files" name="files" multiple accept="image/jpg, image/jpeg, image/png" />

                <input type="submit" className='btn btn-primary mt-2' value="Enviar" />
            </form>
        );
    }
}

export default FileUploadForm;
