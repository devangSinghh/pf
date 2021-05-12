import React, { Component } from 'react'
import axios, { base } from '../axios-pf'
import Cookies from 'js-cookie'
import DOMPurify from 'dompurify'
import { Button, OutlinedInput, InputLabel, InputAdornment, IconButton, FormControl, ButtonGroup, Tooltip } from '@material-ui/core'
import KeyboardArrowRightOutlinedIcon from '@material-ui/icons/KeyboardArrowRightOutlined'
import BlogEditor from '../blog/blogEditor'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import FacebookIcon from '@material-ui/icons/Facebook'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import TwitterIcon from '@material-ui/icons/Twitter'
import EmbedGist from '../common/EmbedGist'
import reactStringReplace  from 'react-string-replace'

import Footer from '../blog/footer'
import DevCard from '../common/developerBlogCard'
import Loader from '../common/Loader'
class EachDevBlog extends Component {
    
    state = {
        showEditor : false,
        blog : [],
        read_more : [],
        data : {
            title : "",
            subtitle : "",
            blogBanner : null
        },
        loading : true,
        color : [ '#0F413B', '#222', '#3625B4', '#A84760', '#8432D0', '#A84760'],
        currentColor : ''
    }

    componentDidMount = async() => {
        const { match: { params } } = this.props
        const { data : blog } = await axios.get('devblog/get/' + params.slug)
        const { data : read_more } = await axios.get('suggestions/read-more')
        const data = {...this.state.data}
        data.title = blog.title
        data.subtitle = blog.subtitle
        const currentColor =  this.state.color[Math.floor(Math.random() * this.state.color.length)]
        this.setState({ blog, data, currentColor, read_more, loading : false })
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

    createMarkup = html => {
        return  {
          __html: DOMPurify.sanitize(html)
        }
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
                else {
                    replacedText[i] = <p dangerouslySetInnerHTML={{ __html : replacedText[i] }} />
                }
            }
        }

        let formattedText = reactStringReplace(replacedText, /^([A-Za-z0-9]+@|http(|s)\:\/\/)([A-Za-z0-9.]+(:\d+)?)(?::|\/)([\d\/\w.-]+?)(\.git)?/g, (match, i) => (
            // <a href="">{match}</a>
            console.log(match)
        ))
        
        return <div>{replacedText}</div>
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

    LogOut = async() => {
        Cookies.remove('session_id')
        await axios.post('/logout', { username : Cookies.get('admin') })
        Cookies.remove('admin')
    }

    render() {
        const ifAdmin = Cookies.get('admin') && Cookies.get('session_id')
        const blog = this.state.blog === undefined ? null : this.state.blog
        const read_more = this.state.read_more === undefined ? null : this.state.read_more
        const el = this.state.loading === true ? 
            <Loader height="60vh" content="Loading..."/>
            :
            <div className="container-fluid p-0">
                {ifAdmin && 
                <ButtonGroup orientation="vertical" className="show-hide-b-d">
                    <Button className="" onClick={this.showEditor} variant="contained" color="secondary">
                        {this.state.showEditor ? "done" : "Edit"}
                    </Button>
                    <Button onClick={this.LogOut} variant="contained" color="secondary" className="logout-each-blog-page">Logout</Button>
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
                    <BlogEditor route="/devblog/content/" type="devblog" slug={blog.slug} blogId={blog._id}/>
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
                            <a style={{ textDecoration:"none", color:"#444" }} href={"https://www.facebook.com/sharer/sharer.php?u=thedevang.com/blogs/" + this.state.blog.slug} target="_blank"><li><i className="fa fa-facebook"/></li></a>
                            <a style={{ textDecoration:"none", color:"#444" }} className="twitter-share-button" href={"https://twitter.com/share?url=thedevang.com/blogs/" + this.state.blog.slug} target="_blank"><li><i className="fa fa-twitter"/></li></a>
                            <a style={{ textDecoration:"none", color:"#444" }} href={"https://www.linkedin.com/sharing/share-offsite/?url=thedevang.com/blogs/" + this.state.blog.slug} target="_blank"><li><i className="fa fa-linkedin"/></li></a>
                        </ul>
                        <p id="blog-body" className="body">
                            {this.formatEditorContent()}
                        </p>
                    </div>
                </div>
                <div className="read-more-blogs" style={{ backgroundColor:this.state.currentColor }}>
                    <div className="container">
                        <h2 className="read-more-heading">Read more...</h2>
                        <div className="row m-0">
                            {read_more.filter(m => m !== null).map((m, key) => <DevCard key={key} title={m.cardtitle} content={m.content} date={m.publishedOn} slug={m.slug} card={base + m.cardBanner}/>)}
                        </div>
                    </div>
                </div>
                <Footer/>
                </div>
        return (el)
    }
}

export default EachDevBlog