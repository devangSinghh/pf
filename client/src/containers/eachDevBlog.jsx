import React, { Component } from 'react'
import axios, { base } from '../axios-pf'
import Cookies from 'js-cookie'
import Button from '@material-ui/core/Button'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import FormControl from '@material-ui/core/FormControl'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import KeyboardArrowRightOutlinedIcon from '@material-ui/icons/KeyboardArrowRightOutlined'
import BlogEditor from '../blog/blogEditor'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import Tooltip from '@material-ui/core/Tooltip'
import EmbedGist from '../common/EmbedGist'
import reactStringReplace  from 'react-string-replace'

import Footer from '../blog/footer'

import Loader from '../common/Loader'
class EachDevBlog extends Component {
    
    state = {
        showEditor : false,
        blog : [],
        data : {
            title : "",
            subtitle : "",
            blogBanner : null
        },
        loading : true
    }

    componentDidMount = async() => {
        const { match: { params } } = this.props;
        const { data : blog } = await axios.get('/devblog/' + params.slug)
        this.setState({ blog })
        const data = {...this.state.data}
        data.title = blog.title
        data.subtitle = blog.subtitle
        this.setState({ data, loading : false })
    }
    
    handleChange = ({ currentTarget : input }) => {
        const data = {...this.state.data}
        data[input.name] = input.value
        if(input.name === 'blogBanner')data[input.name] = input.files[0]
        this.setState({ data })
    }

    UploadDevBlogBanner = async() => {
        const payload = new FormData()
        const blog = this.state.blog
        payload.append('devblogfile', this.state.data.blogBanner)
        const config = { headers: { 'content-type': 'multipart/form-data' } }

        const { data : resp } = await axios.post(`/devblog/banner/${blog.slug}`, payload, config)

    }

    formatEditorContent = () => {

        // Match github gist strings
        let replacedText = reactStringReplace(this.state.blog.body, /(#https?:\/\/\S+)/g, (match, i) => (
            <div id="gist-wrapper">
                <EmbedGist gist={match.split('/')[match.split('/').indexOf('gist.github.com') + 2].split('@')[0].slice(0, -3)} file={match.split('@')[1].split('<')[0]} />
                <Tooltip title="copy code">
                    <IconButton className="copy-gist-button">
                        <FileCopyIcon/>
                    </IconButton>
                </Tooltip>
            </div>
        ))

        //iterate over the content and format remaining content 
        for(let i = 0;i<replacedText.length;i++) {
            if(typeof replacedText[i] === 'string') {
                if (replacedText[i].includes('target="_self"'))
                    replacedText[i] = <p></p>
                // else if (replacedText[i].includes('https://github.com/'))
                //     replacedText[i] = <a href={replacedText[i]} dangerouslySetInnerHTML={{ __html : replacedText[i] }}></a>
                else replacedText[i] = <p dangerouslySetInnerHTML={{ __html : replacedText[i] }}></p>
            }
        }

        let formattedText = reactStringReplace(replacedText, /^([A-Za-z0-9]+@|http(|s)\:\/\/)([A-Za-z0-9.]+(:\d+)?)(?::|\/)([\d\/\w.-]+?)(\.git)?/g, (match, i) => (
            // <a href="">{match}</a>
            console.log(match)
        ))
        
        return <div>{formattedText}</div>
    }

    updateBlogTitle = async() => {
        const payload = {
            title : this.state.data.title
        }
        const { data : res } = await axios.post('/devblog/update-title/' + this.state.blog._id, payload)
    }
    updateBlogSubTitle = async() => {
        const payload = {
            subtitle : this.state.data.subtitle
        }
        const { data : res } = await axios.post('/devblog/update-subtitle/' + this.state.blog._id, payload)
    }

    showEditor = () => {
        this.setState({ showEditor:!this.state.showEditor })
        window.scrollTo(0, 0)
    }
    render() {
        const ifAdmin = Cookies.get('admin') && Cookies.get('session_id')
        const blog = this.state.blog === undefined ? null : this.state.blog
        const el = this.state.loading === true ? 
            <Loader height="60vh" content="Loading..."/>
            :
            <div className="container-fluid p-0">
                {ifAdmin && 
                <ButtonGroup orientation="vertical" className="show-hide-b-d">
                    <Button className="" onClick={this.showEditor} variant="contained" color="secondary">
                        {this.state.showEditor ? "done" : "Edit"}
                    </Button>
                    <Button variant="contained" color="secondary" className="logout-each-blog-page">Logout</Button>
                </ButtonGroup>
                }
                <div className="container">
                
                {this.state.showEditor && 
                <div className="row m-0">
                    <h3>Blog details</h3>
                    <div className="col-md-12 p-0 mb-3">
                            <Button variant="contained" color="primary" component="label">
                                {this.state.blog.blogBanner.length === 0 ? 'Choose ' : 'change '} blog banner
                                <input type="file" name="blogBanner" onChange={this.handleChange} hidden/>
                            </Button>
                            <div className="mt-3 p-0 col-md-12">
                            <FormControl className="w-100" variant="outlined">
                                <InputLabel htmlFor="blog-title">Blog title</InputLabel>
                                <OutlinedInput
                                    onChange={this.handleChange}
                                    value={this.state.data.title}
                                    id="blog-title"
                                    name ="title"
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="blog title"
                                        edge="end"
                                        onClick={this.updateBlogTitle}
                                        >
                                            <KeyboardArrowRightOutlinedIcon />
                                        {/* {values.showPassword ? <Visibility /> : <VisibilityOff />} */}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                    labelWidth={70}
                                />
                                </FormControl>
                            </div>
                            <div className="mt-3 p-0 col-md-12">
                            <FormControl className="w-100" variant="outlined">
                                <InputLabel htmlFor="blog-sub-title">Blog Sub title</InputLabel>
                                <OutlinedInput
                                    onChange={this.handleChange}
                                    value={this.state.data.subtitle}
                                    id="blog-sub-title"
                                    name ="subtitle"
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="blog sub title"
                                        edge="end"
                                        onClick={this.updateBlogSubTitle}
                                        >
                                            <KeyboardArrowRightOutlinedIcon />
                                        {/* {values.showPassword ? <Visibility /> : <VisibilityOff />} */}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                    labelWidth={70}
                                />
                                </FormControl>
                            </div>
                            <p>{this.state.data.blogBanner === null ? "" :this.state.data.blogBanner.name}</p>
                            {this.state.data.blogBanner !== null && 
                            <Button onClick={this.UploadDevBlogBanner} 
                            variant="outlined" color="secondary" 
                            className="m-2">Upload this Image
                            </Button>}
                        </div>
                    <BlogEditor route="/devblog/content/" slug={blog.slug} blogId={blog._id}/>
                </div>}
                </div>

                <div className="devblog-e-page">
                    <div className="banner-img">
                        <img src={base + blog.blogBanner} alt=""/>
                    </div>
                    <div className="title-wrapper">
                        <h3>{blog.title}</h3>
                        <h6>{blog.subtitle}</h6>
                        <svg width="35" height="2" viewBox="0 0 10 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="35" height="2" fill="#F9A441"/>
                            <rect width="8" height="2" fill="#1BECEC"/>
                        </svg>
                    </div>
                    <div className="author">
                        <h6 className="date">{blog.publishedOn}</h6>
                        <h6 className="author-name">by {blog.author}</h6>
                    </div>

                    <div className="body-wrapper">
                        <ul className="blog-share">
                            <li>SHARE</li>
                            <a style={{ textDecoration:"none", color:"#444" }} href={"https://www.facebook.com/sharer/sharer.php?u=thedevang.com/d/blogs/" + this.state.blog.slug} target="_blank"><li><i className="fa fa-facebook"/></li></a>
                            <a style={{ textDecoration:"none", color:"#444" }} className="twitter-share-button" href={"https://twitter.com/share?url=thedevang.com/d/blogs/" + this.state.blog.slug} target="_blank"><li><i className="fa fa-twitter"/></li></a>
                            <a style={{ textDecoration:"none", color:"#444" }} href={"https://www.linkedin.com/sharing/share-offsite/?url=thedevang.com/d/blogs/" + this.state.blog.slug} target="_blank"><li><i className="fa fa-linkedin"/></li></a>
                        </ul>
                        <p id="blog-body" className="body">
                            {this.formatEditorContent()}
                        </p>
                    </div>
                </div>
                <Footer/>
                </div>
        return (el)
    }
}

export default EachDevBlog