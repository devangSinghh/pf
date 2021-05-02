import React, { Component } from 'react';

class EmbeddedGist extends Component {

      gist = this.props.gist
      file = this.props.file
      
      state = {
        loading: true,
        stylesheetAdded : false,
        src: "",
        gist : this.props.gist,
        file : this.props.file
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
  
  componentDidMount = async() => {
    const props = this.props
    this.setState({ gist : props.gist, file : props.file })

    // Create a JSONP callback that will set our state
    // with the data that comes back from the Gist site
    let gistCallback = EmbeddedGist.nextGistCallback()
    window[gistCallback] = gist => {
        this.setState({ loading: false, src: gist.div })
        this.addStylesheet(gist.stylesheet)
    }
    console.log(this.state.gist, this.state.file)
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
    
  render() {
    if (this.state.loading) {
      return <div></div>
    } else {
        
      return <div dangerouslySetInnerHTML={{__html: this.state.src}} />
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
