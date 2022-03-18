import "../styles/Blog.css"
import BlogEntry from "./BlogEntry"

export default function BlogEntries({newTextArrayEntry}){


    return(
        <>
            {newTextArrayEntry.map(() => (
                <BlogEntry newTextArrayEntry={newTextArrayEntry}/>
            ))}
        </>
    )
    
}

