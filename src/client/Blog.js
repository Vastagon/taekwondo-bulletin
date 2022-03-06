import Navbar from "./components/Navbar"
import "./Blog.css"
import ReactDOM, { render } from "react-dom"
import BlogEntries from "./components/BlogEntries"
import { useState, useEffect, Component } from "react";
import axios from 'axios';


export default function Blog() {
    // let [newTextArrayEntry, setNewTextArrayEntry] = useState([])
    let [blogPost, setBlogPost] = useState({postContent:""})
    // let currentEntry
    let [showBlogPost, setShowBlogPost] = useState()
    
    useEffect(() =>{
      axios.get("http://localhost:5000/blogposts")
        .then(res => setShowBlogPost(res.data))
      // console.log(showBlogPost)
        .catch(err => console.log(err))
    }, [])

    const writeBlogPostsToPage = showBlogPost?.map(post =>{
      return <p key={post._id} className="blog-entries">{post.postContent}</p>
    })


    function onChangeBlogPost(e){
      e.preventDefault()
      setBlogPost({postContent: e.target.value})
    }

    function onFormSubmit(e){
      e.preventDefault()
      console.log(blogPost.postContent)

      axios.post("http://localhost:5000/blogposts/add", blogPost)
      .then(res => console.log(res.data))
      window.location.reload()

    }

    if(!showBlogPost){///Renders page after getting data
      return null
    }

      return(
          <div className="blog">
              <Navbar />
              <div className="all-blog-posts">
                {writeBlogPostsToPage}
              </div>

              <form onSubmit={onFormSubmit} id="blog-form" className="all-blog-data">
                  <input required onChange={onChangeBlogPost} id="blog-entry" type="text" className="blog-entry" />
                  <button type="submit" id="blog-entry-submit-button">Submit</button>
              </form>
          </div>
      )
    }


