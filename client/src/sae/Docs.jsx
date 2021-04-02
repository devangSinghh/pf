import React, { Component } from 'react'
import axios, {base} from '../axios-pf'
import Tooltip from '@material-ui/core/Tooltip';
import { Document, Page, pdfjs } from "react-pdf";
import { Modal } from 'react-bootstrap'
import { motion } from 'framer-motion'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
class Docs extends Component {

    state = {
        Docs: [],
        numPages: null, 
        modal : false,
        docName : "",
        docType:"",
        docContent:[],
        docPath:"",
        pageNumber: 1,
        data : {
            saedocs : null,
            filename:""
        },
        copyClipBoardStatus:false,
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
        data["filename"] = input.files[0].name
        this.setState({ data })
    }

    //uploading doc
    handleSubmit = async e => {
        e.preventDefault()
        const payload  = new FormData()
        payload.append('saedocs', this.state.data.saedocs)

        const config = { headers: { 'content-type': 'multipart/form-data' } }

        const { data:res } = await axios.post('/upload-doc', payload, config)       
    }

    //table headers
    headings = [ "name", "created at" ]

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
      };
    
    //page change functions after file is loaded
    goToPrevPage = () =>
        this.setState(state => ({ pageNumber: state.pageNumber - 1 }));
    goToNextPage = () =>
        this.setState(state => ({ pageNumber: state.pageNumber + 1 }));

    //open current pdf
      openPdf = async(e, name, path) => {
        const type = name.split('.')[1]
        if (type === "txt") {
            const { data:docContent } = await axios.get(`${path}`)
            const newContent = docContent.split(';')
            this.setState({ docType:'txt', docContent:newContent })
        }
        else {
            this.setState({ docType:"pdf" })
        }
            
        this.setState({ docName:name, docPath:path, modal:true })
      }

    //download request
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

    copyTextToClipBoard = () => {
        navigator.clipboard.writeText(base + this.state.docPath)
        this.setState({ copyClipBoardStatus : true })
    }

    render() {
        console.log(this.state.data)
        const { pageNumber, numPages, docPath, docName, docType } = this.state;
        const Docs = this.state.Docs === undefined ? null : this.state.Docs
        const page = this.state.numPages === null ? [] : this.state.numPages
        const pages=[]
        for(let i=0; i<page;i++) {
            pages.push( 
                
                    <Page pageNumber={i} width={1000} />
            )
        }
        return (
            <motion.div initial={{y:-25}} animate={{y:0}} transition={{ type: "spring", stiffness: 160 }} className="container p-0">
                <div className="col-md-8 mx-auto mt-3 p-0">
                    <div className="add-docs p-0">
                        <label className="docs-label" htmlFor="saedocs">Upload file</label>
                        <Tooltip title="upload file"><i onClick={this.handleSubmit} className="fa fa-arrow-right" /></Tooltip>
                        <input className="docs-input" type="file" name="saedocs" id="saedocs" onChange={this.handleChange}/> 
                    </div>
                    <p style={{color:"blue", fontFamily:"roboto", fontSize:"14px"}}>{this.state.data.filename}</p>
                </div>

                <table className="table-component table mx-auto col-md-8">
                    <thead>
                        <tr>
                            {this.headings.map(m => 
                                <th style={{ position:"sticky", top:"0px", backgroundColor:"white", boxShadow: "0px 0.3px 0px 0px rgb(230, 230, 230)" }}>{m}</th>    
                            )}  
                        </tr>
                    </thead>
                    <tbody>
                        {Docs.map((m, key) => 
                            <Tooltip title={m.name} placement="left-start" open={false}>
                                <tr name={key} key={key} id={key} onClick={e => this.openPdf(e, m.name, m.path)}>
                                    <td>{m.name}</td>
                                    <td>{m.created_at}</td>
                                </tr>   
                            </Tooltip> 
                        )}
                    </tbody>
                </table>
                    
                <div>
                
                <Modal size="lg" style={{opacity:1}} aria-labelledby="contained-modal-title-vcenter" centered show={this.state.modal} onHide={() => this.setState({ modal:false })}>
            
            <Modal.Header><Modal.Title id="contained-modal-title-vcenter">
                {this.state.copyClipBoardStatus && 
                <p style={{color:"green", backgroundColor:"rgba(206, 206, 206, 0.1)", fontWeight:"600", fontSize:"14px", fontFamily:"Roboto"}}>file url copied to clipboard !!</p>
                }
                <i onClick={() => this.setState({modal:false})} className="fa fa-times" />
            </Modal.Title></Modal.Header>
            
            <Modal.Body ref={this.modalRef}>
                {docType != "txt" && <div className="preview-pdf-file">
                    <div className="download-button">
                        <a className="" href={base + `download/` + docPath }>
                            <button onClick={e => this.downloadThisFile(e, docName)}>Download</button>
                        </a>
                        <a target="_blank" href={base + docPath }>
                            <button>Open in new tab</button>
                        </a>
                        <Tooltip titl="copy file url" placement="left-top" open={true}>
                            <button onClick={() => this.copyTextToClipBoard()}>
                                <i className="fa fa-copy" />
                            </button>
                        </Tooltip>
                    </div>
                    <Document file={base + docPath} onLoadSuccess={this.onDocumentLoadSuccess.bind(this)}>
                        {pages.map(m => m)}
                    </Document>
                </div>}
                {docType === "txt" && 
                    <div className="preview-txt-files">
                        {/* <code style={{display:"inline-block"}} dangerouslySetInnerHTML={{ __html: `${this.state.docContent}` }}></code> */}
                        {this.state.docContent.map(str => 
                            <p>{str}</p>
                            )}
                    </div>
                }
            </Modal.Body>
            
            </Modal>
                </div>
            </motion.div>
        );
    }
}

export default Docs;