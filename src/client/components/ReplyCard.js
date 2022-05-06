import axios from "axios"
import { useState, useEffect } from "react"
import "../styles/ReplyCard.css"

export default function ReplyCard({userState, postContent, dataURL}){
    const [replyText, setReplyText] = useState()
    ///Name is anonymous if not logged in
    let displayName = "Anonymous"
    if(userState?.displayName !== undefined){
        displayName = userState.displayName
    }

    function onReplyChange(e){
        setReplyText(e.target.value)
    }
    ///on Submit
    function submitReply(e){
        e.preventDefault()
        ///Pushes new reply, then posts data to change where the backend handles the data
        postContent.postReplies.push({postRepliesContent: replyText, postRepliesUser: displayName})
        // axios.post(`${dataURL}/blogposts/change`, {postReplies: postContent.postReplies, postContent:postContent.postContent, postUsername:postContent.postUsername})
        axios.post(`${dataURL}/blogposts/change`, {postReplies: postContent.postReplies, postContent:postContent.postContent, originalPoster: postContent.postUsername || "Anonymous"})

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