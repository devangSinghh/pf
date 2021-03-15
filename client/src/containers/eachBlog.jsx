import React, { Component } from 'react';
import axios, { base } from '../axios-pf';

import BLogFunctions from '../blogEditor/blogFunctions';
import { SwatchesPicker  } from 'react-color';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

class EachBlog extends BLogFunctions {
    menuPaleteRef = React.createRef()
    state = {
        blog : [],
        loadingBlog : true,
        showCatchLineInput : false,
        catchLine : "",
        blogSections : [],
        catchLineColor : "#fff",
        catchLineFontFamily : "",
        catchLineFontWeight : "",
        contentColor : "",
        maxParaNumber : 0,
        blogBackground : "",
        blogCustomColor:"",
        data : {
            blogBanner : null,
            bannerImageUrl : "",
        },
        catchLineMenuState : false,
        changeblogBackgroundState : false,
        changecontentState : false,
        fonts : [
            {
                fontFamily : "Roboto"
            },
            {
                fontFamily : "Merriweather"
            },
            {
                fontFamily : "Indie Flower"
            },
            {
                fontFamily : "Inconsolata"
            },
            {
                fontFamily : "Open Sans"
            },
            {
                fontFamily : "Raleway"
            },
            {
                fontFamily : "Playfair Display"
            },
            {
                fontFamily : "Lora"
            },
        ],
        fontWeight : [
            {
                weight : "500"
            },
            {
                weight : "600"
            },
            {
                weight : "700"
            },
            {
                weight : "800"
            },
            {
                weight : "900"
            }
        ]
    }

    componentDidMount = async() => {
        const { match: { params } } = this.props;
        const { data:blog } = await axios.get(base + `blog/${params.slug}/`)
        this.setState({ blog, loadingBlog : false });
        document.addEventListener('click', this.handleClickOutside, true);
        this.setState({ 
            blogSections : this.state.blog.blogSections,
            maxParaNumber:this.state.blog.maxParaNumber, 
            catchLineColor:this.state.blog.catchLineColor,
            catchLineFontFamily : this.state.blog.catchLineFontFamily,
            catchLineFontWeight : this.state.blog.catchLineFontWeight,
            blogBackground : this.state.blog.blogBackground,
            contentColor : this.state.blog.contentColor
        })
    }
    componentWillUnmount = () => {
        return () => {
            document.removeEventListener('click', this.handleClickOutside, true);
        };
    }

    render() {
        const blog = this.state.blog === undefined ? null : this.state.blog
        return (
            <div style={{ backgroundColor:this.state.blogBackground }} className="blog-container">
                {this.state.showCatchLineInput && <div className="black-rect" />}

                {this.state.showCatchLineInput && 
                <input ref={r => this.input = r} 
                type="text" 
                name="catchLine" 
                id="catchLine" 
                className="catch-line-input"
                onChange={(e) => this.setState({ catchLine : e.target.value })}
                />}

                {this.state.showCatchLineInput && 
                <button
                onClick={this.addCatchLine}
                className="catch-line-button">Save</button>}
                {true && <div className="d-flex flex-column editor-menu">
                    <button className="mb-2" onClick={e => this.appendInput(e)}>add para</button>
                    <button className="mb-2" onClick={this.changeblogBackground}>Change blog background color</button>
                    <button className="mb-2" onClick={this.changecontent}>Change content color</button>
                    <button>
                        <label className="blogBanner-label" htmlFor="blogBanner">
                            <span className="p-1 rounded">Change banner image</span></label>
                    </button>
                    <button className="mt-2" onClick={this.catchLine}>Add catch line</button>
                    <button className="mt-2">Add blog content image</button>
                    {this.state.changeblogBackgroundState && <div>
                        <SwatchesPicker
                        height={250}
                        onChange={this.handleChangeBlogBackgroundColor}
                    />
                        <input onChange={this.handleBlogColorChange} type="text"/>
                        <button onClick={this.sendBlogCustomColorChange}>Save</button>
                    </div>
                    }
                    {this.state.changecontentState && <SwatchesPicker
                        height={250}
                        onChange={this.handleChangecontentColor}
                    />}
                    <input style={{ display:"none" }}
                     name="blogBanner" id="blogBanner" 
                     onChange={this.ChangeBannerImage} 
                     type="file"/>
                </div>}
                <img 
                style={{ pointerEvents:"none" }} 
                src={base + this.state.blog.blogBannerRoute} 
                className="blog-banner-img" 
                alt={this.state.blog.name}/>

                <div className="black-rect-shadow" />

                <h5 style={{ color:this.state.catchLineColor, fontFamily:this.state.catchLineFontFamily, fontWeight:this.state.catchLineFontWeight }} className="blog-heading text-center">{blog.blogCatchLine} 
                    {/* <i onClick={this.openCatchLineMenu} className="catchLine-menu-bar fa fa-ellipsis-v" aria-hidden="true"></i> */}
                </h5>

                {this.state.catchLineMenuState && <div ref={this.menuPaleteRef} className="d-flex catchLine-menu-items">
                    <div className="">
                        <h5 className="menu-headings">Color palette</h5>
                    <SwatchesPicker
                        height={250}
                        onChange={this.handleChangeColor}
                    />
                    </div>
                        <ul className="menu-list list-group">
                            <h5 className="menu-headings">Font families</h5>
                            {this.state.fonts.map(m => 
                                <li onClick={() => this.changeFontFamilyOfCatchLine(m.fontFamily)} className="list-group-item">{m.fontFamily}</li>    
                            )}
                        </ul>
                        <ul className="list-group menu-list">
                            <h5 className="menu-headings">Font weights</h5>
                            {this.state.fontWeight.map(m => 
                                <li onClick={() => this.changeFontWeightOfCatchLine(m.weight)} className="list-group-item">{m.weight}</li>
                            )}
                        </ul>
                </div>}

                { <h3 className="mb-0 text-center arrow-down">
                    <svg className="fa-arrow-down" width="8" height="18" viewBox="0 0 8 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.64645 17.3536C3.84171 17.5488 4.15829 17.5488 4.35355 
                        17.3536L7.53553 14.1716C7.7308 13.9763 7.7308 13.6597 7.53553 13.4645C7.34027
                         13.2692 7.02369 13.2692 6.82843 13.4645L4 16.2929L1.17157 13.4645C0.976311 
                         13.2692 0.659728 13.2692 0.464466 13.4645C0.269204 13.6597 0.269204 13.9763 
                         0.464466 14.1716L3.64645 17.3536ZM3.5 0L3.5 17H4.5L4.5 0L3.5 0Z" fill="white"/>
                    </svg>  
                </h3>}
                
                {/* <img src={colorfulBand} className="img img-fluid w-100 colorful-band" alt=""/> */}

                {/* <img src={mask} className="mask" alt=""/> */}
                {this.state.blog.blogSections === undefined ? null : this.state.blog.blogSections.map((m, key) => 
                    <div key={key} className="container d-flex justify-content-center align-items-center">
                        <TextareaAutosize 
                        ref={(c) => (this.textarea = c)} 
                        style={{ color:this.state.contentColor }}
                        className="blog-section-1" 
                        onChange={e => this.handleBlogChange(e, key)} name={m.name} id={m.name} key={key}>
                            {m.content}
                        </TextareaAutosize>
                        <button className="blog-content-edit-button" onClick={e => this.deleteThisSection(e, key, m.sectionName)}><i className="fa fa-trash"></i></button>
                        <button className="blog-content-edit-button" onClick={e => this.saveBlog(e, key, m.sectionName)}> <i className="fa fa-check"></i> </button>
                    </div>
                )}
                <div className="container author-area">
                    <h6 className="mb-0 author-id"><a href="https://instagram.com/dev___ang">dev___ang</a></h6>
                    <h6 className="publishing-date">{this.state.blog.publishedOn}</h6>
                </div>
            </div>
        );
    }
}

export default EachBlog;