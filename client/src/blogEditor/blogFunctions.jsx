import React, { Component } from 'react';
import axios, { base } from '../axios-pf';

class BlogFunctions extends Component {

    handleClickOutside = e => {
        {/*If clicked outside of sidebar, it will close*/ }
        if (this.menuPaleteRef.current && !this.menuPaleteRef.current.contains(e.target)) {
            {/*on clicking outside sidebar width will become 0*/ }
            this.setState({ catchLineMenuState : false });
        }
    };
    appendInput = async e => {
        
        const maxParaNumber = this.state.maxParaNumber
        let payload;
        payload = {name : `section-${maxParaNumber + 1}`, val : ""}

        const {data : res} = await axios.post(`update-blog/thissection/${this.state.blog._id}`, payload)
        console.log(res)
        this.setState({ maxParaNumber: maxParaNumber + 1 })
        const { data : totalParaInBlog } = await axios.post(`update-blog/total-blog-sections/${this.state.blog._id}/${this.state.maxParaNumber}`)
        console.log(totalParaInBlog)
    }

    deleteThisSection = async(e, key, section) => {
        const allSections = [...this.state.blogSections]

        allSections.splice(key, 1)

        this.setState({ blogSections : allSections })

        const { data : res } = await axios.post(`/update-blog/delete-a-section/${this.state.blog._id}/${section}`)
    }

    handleBlogChange = (e, key) => {
        const val = e.target.value;
        const blogSections = [...this.state.blogSections]
        // const k = blogSections[key] === undefined ? null : 
        blogSections[key].val = val;
        this.setState({ blogSections }) 
    }

    ChangeBannerImage = async({currentTarget:input}) => {
        
        const data = {...this.state.data};
        data[input.name] = input.files[0]
        
        // data["bannerImageUrl"] = await URL.createObjectURL(input.files[0])
        
        this.setState({ data, dataIsValid:true });

        const payload = new FormData() 
        payload.append('blogfile', data.blogBanner)

        const config = { headers: { 'content-type': 'multipart/form-data' } }

        const {data : res} = await axios.put(`update-blog/${this.state.blog.name}`, payload, config)
        console.log(res)
    };

    
    saveBlog = async(e, key, sectionName) => {
        const payload = {
            content : this.state.blogSections[key].val
        }

        const { data : res } = await axios.put(`update-blog/section/${this.state.blog._id}/${sectionName}`, payload)
        console.log(res)
    }
    
    catchLine = () => {
        this.setState({ showCatchLineInput : !this.state.showCatchLineInput })
    }

    addCatchLine = async() => {
        const {data : res} = await axios.put(`update-blog/${this.state.blog.name}/${this.state.catchLine}`)
        console.log(res)
    }

    openCatchLineMenu = () => {
        this.setState({ catchLineMenuState : !this.state.catchLineMenuState })
    }

    handleChangeColor = async color => {
        this.setState({ catchLineColor : color.hex });

        const payload = await {color : color.hex}

        const {data : res} = await axios.post(`update-blog/catchLine/${this.state.blog._id}`, payload)
        console.log(res)
      };

      changeFontFamilyOfCatchLine = async font => {
        this.setState({ catchLineFontFamily : font })

        const payload = await {fontFamily : font}

        const { data : res } = await axios.post(`update-blog/catchLineFont/${this.state.blog._id}`, payload)
        console.log(res)
      }

      changeFontWeightOfCatchLine = async weight => {
          this.setState({ catchLineFontWeight : weight })

          const payload = await { fontWeight : weight }

          const { data : res } = await axios.post(`update-blog/catchLineFontWeight/${this.state.blog._id}`, payload)
          console.log(res)
      }

      changeblogBackground = async background => {
          this.setState({ changeblogBackgroundState : !this.state.changeblogBackgroundState })
          
      }

      handleChangeBlogBackgroundColor = async color => {
            this.setState({ changeblogBackground : color.hex })
            const payload = { blogBackground : color.hex }
            const { data : res } = await axios.post(`update-blog/blogBackground/${this.state.blog._id}`, payload)
            console.log(res)
      }

      changecontent = async background => {
        this.setState({ changecontentState : !this.state.changecontentState })
        
    }

    handleChangecontentColor = async color => {
          this.setState({ contentColor : color.hex })
          const payload = { contentColor : color.hex }
          const { data : res } = await axios.post(`update-blog/content/${this.state.blog._id}`, payload)
          console.log(res)
    }

    handleBlogColorChange = e => {
        const value = e.target.value;
        this.setState({ blogCustomColor : value })
    }

    sendBlogCustomColorChange = async() => {
        const payload = {blogBackground : '#'+this.state.blogCustomColor}
        const { data : res } = await axios.post(`update-blog/blogBackground/${this.state.blog._id}`, payload)
        console.log(res)
        
    }

    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default BlogFunctions;