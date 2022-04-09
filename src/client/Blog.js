import Navbar from "./components/Navbar"
import "./styles/Blog.css"
import { useState, useEffect } from "react";
import axios from 'axios';


export default function Blog({auth, dataURL}) {
    const [blogPost, setBlogPost] = useState({postContent:""})
    const [documentTitle, setDocumentTitle] = useState("Blog")
    const [blogPostState, setBlogPostState] = useState()

    ///Gets the data from localhost and sets it to showBlogPost
      axios.get(`${dataURL}/blogposts`)
        .then(res => setBlogPostState(res.data))
        .catch(err => console.log(err))



    ///writes all blog posts to page
    // let writeBlogPostsToPage = showBlogPost?.map(post =>{
    //   return <p key={post._id} className="blog-entries">{post.postContent}</p>
    // })

    ///Changes the blogPost object to the text input
    function onChangeBlogPost(e){
      e.preventDefault()
      setBlogPost({postContent: e.target.value})
    }

    ///Happens whenever the user submits a post
    function onFormSubmit(e){
      e.preventDefault()

      ///posts the blogPost object to localhost, which will post that data to mongodb
      axios.post(`${dataURL}/blogposts/add`, blogPost)

      setBlogPost()
      document.getElementById("blog-entry").value = ""

      ///Gets data from blogposts again for rerender
      axios.get(`${dataURL}/blogposts`)
        .then(res => setBlogPostState(res.data))
    }

    if(!blogPostState){///Renders page after getting data
      return null
    }

      return(
          <div className="blog">
              <Navbar dataURL={dataURL} auth={auth} documentTitle={documentTitle} />
              <div className="all-blog-posts">
                {blogPostState.map(post => <p key={post._id} className="blog-entries">{post.postContent}</p>)}
              </div>

              <form onSubmit={onFormSubmit} id="blog-form" className="all-blog-data">
                  <input minLength={5} required onChange={onChangeBlogPost} id="blog-entry" type="text" className="blog-entry" />
                  <button type="submit" id="blog-entry-submit-button">Submit</button>
              </form>
          </div>
      )
    }