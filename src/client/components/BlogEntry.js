import "../styles/Blog.css"
///add new text entry to an array and then map out that array every time blog updates
///I need to get the document.value from Blog 
export default function BlogEntry({postContent, auth}){

    return(
        <div className="blog-entry">
            {postContent.postUserEmail ? <p className="blog-username">{postContent.postUsername ? postContent.postUsername : postContent.postUserEmail}</p> : <p className="blog-username">Anonymous</p>}
            <p className="blog-content">{postContent.postContent}</p>
        </div>
    )    
    
}