import "../styles/Blog.css"
export default function BlogEntry({postContent, auth}){

    return(
        <div className="blog-entry">
            {postContent.postUserEmail ? <p className="blog-username">{postContent.postUsername ? postContent.postUsername : postContent.postUserEmail}</p> : <p className="blog-username">Anonymous</p>}
            <p className="blog-content">{postContent.postContent}</p>
        </div>
    )    
    
}