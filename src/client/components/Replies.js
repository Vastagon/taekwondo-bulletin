import { useEffect, useState } from "react"

export default function Replies({postContent}){
    const [allReplies, setAllReplies] = useState()

    useEffect(() =>{
        setAllReplies(postContent.map(prev =>{
            return (
                <div className="reply">
                    <p>{prev.postUsername}</p>
                    <p>{prev.postContent}</p>
                </div>
            )
        }))
    }, [])



    return(
        <div className="replies">
            {allReplies}
        </div>
    )
}