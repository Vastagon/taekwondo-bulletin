import "../styles/Blog.css"
///add new text entry to an array and then map out that array every time blog updates
///I need to get the document.value from Blog 
export default function BlogEntry({postContent}){

    return(
        <div className="blog-entry">
            <p className="blog-username">Username</p>
            <p className="blog-content">{postContent.postContent}</p>
        </div>
    )    
    
}