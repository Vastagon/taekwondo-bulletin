import Navbar from "./components/Navbar"
import "./Blog.css"
import { useState, useEffect } from "react";
import axios from 'axios';


export default function Blog() {
    const [blogPost, setBlogPost] = useState({postContent:""})
    const [showBlogPost, setShowBlogPost] = useState()
    const [documentTitle, setDocumentTitle] = useState("Blog")
    
    useEffect(() =>{
      axios.get("http://localhost:5000/blogposts")
        .then(res => setShowBlogPost(res.data))
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

      axios.post("http://localhost:5000/blogposts/add", blogPost)
      .then(res => console.log(res.data))
      window.location.reload()

    }

    if(!showBlogPost){///Renders page after getting data
      return null
    }

      return(
          <div className="blog">
              <Navbar documentTitle={documentTitle} />
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


