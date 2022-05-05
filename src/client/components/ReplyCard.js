import axios from "axios"
import { useState } from "react"
import "../styles/ReplyCard.css"

export default function ReplyCard({postContent, dataURL}){
    const [replyText, setReplyText] = useState()

    function onReplyChange(e){
        setReplyText(e.target.value)
    }

    function submitReply(e){
        e.preventDefault()
        postContent.postReplies.push(replyText)
        axios.post(`${dataURL}/blogposts/change`, {postReplies: postContent.postReplies, postContent:postContent.postContent, postUsername:postContent.postUsername})

        setReplyText("")
        document.getElementById("reply-text").value = ""
    }
    
    return(
        <div className="reply-card">
            <div className="inner-reply-card">
                <form onSubmit={submitReply}>
                    <p className="reply-username">{postContent.postUsername || "Anonymous"}</p>
                    <p>{postContent.postContent}</p>
                    <input id="reply-text" type="text" className="reply-input" name="reply" onChange={onReplyChange} placeholder="Reply here"></input>
                </form>
            </div>
        </div>
    )
}