import React, { Component } from 'react'

class EmbeddedGist extends Component {

      gist = this.props.gist
      file = this.props.file
      
      state = {
        loading: true,
        stylesheetAdded : false,
        src: "",
        gist : this.props.gist,
        file : this.props.file,
        mouse : { clientX : 0, clientY : 0 },
        code : '',
        showbutton : false,
        buttoncontent : 'copy',
          buttonps : {
            x : 0,
            y : 0
          }
        }
    
  // The Gist JSON data includes a stylesheet to add to the page
  // to make it look correct. `addStylesheet` ensures we only add
  // the stylesheet one time.
  addStylesheet = href => {
    if (!this.state.stylesheetAdded) {
      this.setState({ stylesheetAdded : true })
      let link = document.createElement('link');
      link.type = "text/css";
      link.rel = "stylesheet";
      link.href = href;
  
      document.head.appendChild(link);
    }
  }

  copyTextToClipBoard = () => {
    navigator.clipboard.writeText(this.state.code)
    this.setState({ copyClipBoardStatus : true })
  }

  handleEvent = e => {
    const { pageX, pageY, clientX, clientY } = e
    const gist = document.getElementById('gist') === null ? null : document.getElementById('gist').getBoundingClientRect()

    if (e.type === "mouseup" && window.getSelection().toString().length !== 0) {
      const s = window.getSelection()
      //  const oRect = s.getRangeAt(0).getBoundingClientRect()
       this.setState({ code : s.toString(), showbutton : true, buttonps : { x:0, y:clientY - gist.top } })
     } 
     else {
       
       this.setState({ showbutton : false,  buttonps : { x:0, y:clientY - gist.top }, buttoncontent : 'copy' })
     }
  }

  handleFocus = (event) => console.log(event.target.select())

  updatePosition = e => {
    const { pageX, pageY, clientX, clientY } = e
    if(document.getElementById('gist') === null) {}
    else {
      const gist = document.getElementById('gist').getBoundingClientRect()
      this.setState({ mouse : { clientX : clientX - gist.left, clientY : clientY - gist.top } })
    }
    
  };

  componentDidMount = async() => {
    const props = this.props
    this.setState({ gist : props.gist, file : props.file })

    document.addEventListener("mousemove", this.updatePosition, false);
    document.addEventListener("mouseenter", this.updatePosition, false);

    // Create a JSONP callback that will set our state
    // with the data that comes back from the Gist site
    let gistCallback = EmbeddedGist.nextGistCallback()
    window[gistCallback] = gist => {
        this.setState({ loading: false, src: gist.div })
        this.addStylesheet(gist.stylesheet)
    }
    

    let url = "https://gist.github.com/" + this.state.gist + ".json?callback=" + gistCallback
    if (this.state.file === undefined ? "" : this.state.file.length !== 0) {
      url += "&file=" + this.state.file
    }

    // Add the JSONP script tag to the document.
    let script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = url
    document.head.appendChild(script)
  }


  componentWillUnmount = async() => {
      document.removeEventListener("mousemove", this.updatePosition)
      document.removeEventListener("mouseenter", this.updatePosition)
  }

  onGistButtonClick = () => {
    this.copyTextToClipBoard()
    this.setState({ buttoncontent : 'copied!' })
    setTimeout(function(){
      this.setState({showbutton : false});
    }.bind(this),1500);
  }
    
  render() {
    if (this.state.loading) {
      return <div></div>
    } else {
      return <div>
        <div id="gist" onMouseDown={this.handleEvent} onSelect={this.handleEvent} onMouseUp={this.handleEvent} onFocus={this.handleFocus} dangerouslySetInnerHTML={{__html: this.state.src}} />
        <button className="copy-embed-gist" 
          onClick={this.onGistButtonClick} 
          style={{ position : 'absolute', left:this.state.buttonps.x, top:this.state.buttonps.y, transform : this.state.showbutton ? 'scale(1)' : 'scale(0)'}}>
            {this.state.buttoncontent}
        </button>
        </div>
    }
  }
}

EmbeddedGist.propTypes = {
    // gist: React.PropTypes.string.isRequired, // e.g. "username/id"
    // file: React.PropTypes.string // to embed a single specific file from the gist
};

// Each time we request a Gist, we'll need to generate a new
// global function name to serve as the JSONP callback.
var gistCallbackId = 0;
EmbeddedGist.nextGistCallback = () => {
    return "embed_gist_callback_" + gistCallbackId++;
};

export default EmbeddedGist
