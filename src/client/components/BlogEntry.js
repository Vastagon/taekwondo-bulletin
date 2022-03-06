import "../Blog.css"
///add new text entry to an array and then map out that array every time blog updates
///I need to get the document.value from Blog 
export default function BlogEntry(props){
    console.log(props.newTextArrayEntry)
    return(
        <h1 className="blog-entries">{props.newTextArrayEntry}</h1>
    )
    
}