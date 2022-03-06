import "../Blog.css"
import BlogEntry from "./BlogEntry"
///add new text entry to an array and then map out that array every time blog updates
///I need to get the document.value from Blog 
export default function BlogEntries({newTextArrayEntry}){
    // console.log("weq" +props.newTextArrayEntry)



    return(
        <>
            {newTextArrayEntry.map(() => (
                <BlogEntry newTextArrayEntry={newTextArrayEntry}/>
            ))}
        </>
    )
    
}

