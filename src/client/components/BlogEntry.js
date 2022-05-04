import { useEffect, useState } from "react"
import "../styles/Blog.css"
import ReplyCard from "./ReplyCard"

export default function BlogEntry({postContent, replyShown, setReplyShown}){
    const [showReplyCard, setShowReplyCard] = useState(false)

    function newReply(){
        if(replyShown){
            if(showReplyCard){
                setShowReplyCard(false)
            }
        }else{
            setShowReplyCard(prev => !prev)
            setReplyShown(true)
        }

    }

    useEffect(() =>{
        if(!showReplyCard){
            setReplyShown(false)
        }
    }, [showReplyCard])

    return(
        <div className="blog-entry">
            {postContent.postUserEmail ? <p className="blog-username">{postContent.postUsername ? postContent.postUsername : postContent.postUserEmail}</p> : <p className="blog-username">Anonymous</p>}
            <p className="blog-content">{postContent.postContent}</p>
            <p className="reply-link" onClick={newReply}>Reply</p>

            {showReplyCard ? <ReplyCard postContent={postContent}/> : null}
        </div>
    )    
    
}