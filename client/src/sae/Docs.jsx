import React, { Component } from 'react'
import axios, {base} from '../axios-pf'
import Tooltip from '@material-ui/core/Tooltip';
import { Document, Page, pdfjs } from "react-pdf";
import { Modal } from 'react-bootstrap'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
class Docs extends Component {

    state = {
        Docs: [],
        numPages: null, 
        modal : false,
        docName : "",
        docPath:"",
        pageNumber: 1,
        data : {
            saedocs : null
        }
    }

    componentDidMount = async() => {
        document.addEventListener('click', this.handleClickOutsideModal, true);
        const { data : Docs } = await axios.get('/upload-doc')
        this.setState({ Docs })
    }

    componentWillUnmount = () => {
        document.removeEventListener('click', this.handleClickOutsideModal, true);
    }

    handleChange = async({currentTarget:input}) => {
        const data = {...this.state.data};
        data[input.name] = input.files[0]
        this.setState({ data })
    }

    handleSubmit = async e => {
        e.preventDefault()
        const payload  = new FormData()
        payload.append('saedocs', this.state.data.saedocs)

        const config = { headers: { 'content-type': 'multipart/form-data' } }

        const { data:res } = await axios.post('/upload-doc', payload, config)
        console.log(res)
       
    }

    headings = [
        "name", "uploaded at", ""
    ]

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
      };
    
      goToPrevPage = () =>
        this.setState(state => ({ pageNumber: state.pageNumber - 1 }));
      goToNextPage = () =>
        this.setState(state => ({ pageNumber: state.pageNumber + 1 }));
      openPdf = (e, name, path) => {
        this.setState({ docName:name, docPath:path, modal:true })
      }

    downloadThisFile = async(e, filename) => {
        const {data:res} = await axios.get(`download/${this.state.docPath}`)
        console.log(base + `download/${this.state.docPath}`)
        console.log(res)
    }

      modalRef = React.createRef()
      openModal = () => {
        this.setState({ modal : true, showBanner:true })
    }
    handleClickOutsideModal = e => {

        {/*If clicked outside of modal, it will close*/}
        if (this.modalRef.current && !this.modalRef.current.contains(e.target)) {
           this.setState({modal : false})
        }
    };


    render() {
        
        const { pageNumber, numPages, docPath, docName } = this.state;
        console.log(base+docPath)
        return (
            <div className="container p-0">
                <div className="add-docs">
                    <label className="docs-label" htmlFor="saedocs">Upload file</label>
                    <input className="docs-input" type="file" name="saedocs" id="saedocs" onChange={this.handleChange}/>
                    <button onClick={this.handleSubmit}>Submit</button>
                </div>

                <table className="table-component table mx-auto col-md-10">
                    <thead>
                        <tr>
                            {this.headings.map(m => 
                                <th style={{ position:"sticky", top:"0px", backgroundColor:"white", boxShadow: "0px 0.3px 0px 0px rgb(230, 230, 230)" }}>{m}</th>    
                            )}  
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.Docs.length === 0 ? null : this.state.Docs.map((m, key) => 
                            <Tooltip title={m.name} placement="left-start" open={false}>
                                <tr name={key} key={key} id={key} onClick={e => this.openPdf(e, m.name, m.path)}>
                                    <td>{m.name}</td>
                                    <td>{m.created_at}</td>
                                    <td><i className="fa fa-external-link"></i></td>
                                </tr>   
                            </Tooltip> 
                        )}
                    </tbody>
                </table>
                    
                <div>
                
                <Modal size="lg" style={{opacity:1}} aria-labelledby="contained-modal-title-vcenter" centered show={this.state.modal} onHide={() => this.setState({ modal:false })}>
            
            <Modal.Header><Modal.Title id="contained-modal-title-vcenter">
                <i onClick={() => this.setState({modal:false})} className="fa fa-times" />
            </Modal.Title></Modal.Header>
            
            <Modal.Body ref={this.modalRef}>
                <button onClick={this.goToPrevPage}>Prev</button>
                <button onClick={this.goToNextPage}>Next</button>
                <a href={base + `download/` + docPath }><button onClick={e => this.downloadThisFile(e, docName)}>Download</button></a>
                <Document
                    file={base + docPath}
                    onLoadSuccess={this.onDocumentLoadSuccess.bind(this)}
                >
                    <Page pageNumber={pageNumber} width={1000} />
                </Document>
            </Modal.Body>
            
            </Modal>
                </div>
            </div>
        );
    }
}

export default Docs;