import Navbar from "./components/Navbar"
import "./styles/Blog.css"
import { useState, useEffect } from "react";
import axios from 'axios';
import BlogEntry from "./components/BlogEntry";


export default function Blog({auth, dataURL}) {
    const [blogPost, setBlogPost] = useState({postContent:""})
    const [documentTitle] = useState("Blog")
    const [blogPostState, setBlogPostState] = useState()
    const abortCont = new AbortController()


    ///Gets the data from localhost and sets it to showBlogPost
    useEffect(() =>{
      axios.get(`${dataURL}/blogposts`, {signal: abortCont.signal})
        .then(res => setBlogPostState(res.data))
        .catch(err => console.log(err))

        if(auth?.currentUser){
          setBlogPost(prevBlog => ({
            ...prevBlog,
            postUserEmail: auth.currentUser.email,
            postUsername: auth.currentUser.displayName
          }))
        }

        return () => abortCont.abort()
    }, [])

    ///Changes the blogPost object to the text input
    function onChangeBlogPost(e){
      e.preventDefault()
      setBlogPost(prev => ({
        ...prev,
        postContent: e.target.value
      }))
    }

    ///Happens whenever the user submits a post
    async function onFormSubmit(e){
      e.preventDefault()

      ///posts the blogPost object to localhost, which will post that data to mongodb
      await axios.post(`${dataURL}/blogposts/add`, blogPost)

      
      setBlogPost()
      document.getElementById("blog-entry").value = ""

      ///Gets data from blogposts again for rerender
      axios.get(`${dataURL}/blogposts`)
        .then(res => setBlogPostState(res.data))
        .catch(res => console.log(res.message))
    }

    if(!blogPostState){///Renders page after getting data
      return null
    }

      return(
          <div className="blog">
              <Navbar dataURL={dataURL} auth={auth} documentTitle={documentTitle} />

              <div className="all-blog-posts">
                {blogPostState.map(post => <BlogEntry auth={auth} postContent={post} key={post._id}/>)}
              </div>

          
              <form onSubmit={onFormSubmit} id="blog-form" className="all-blog-data">
                  <input minLength={5} required onChange={onChangeBlogPost} placeholder="Post a Message" id="blog-entry" type="text" className="blog-entry-input" />
                  <button type="submit" id="blog-entry-submit-button">Submit</button>
              </form>

          </div>
      )
    }