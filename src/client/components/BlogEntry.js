import { useEffect, useState } from "react"
import "../styles/Blog.css"
import ReplyCard from "./ReplyCard"
import {v4 as uuid} from "uuid"

export default function BlogEntry({postContent, replyShown, setReplyShown, dataURL, userState}){
    const [showReplyCard, setShowReplyCard] = useState(false)
    const [showReplies, setShowReplies] = useState(false)
    const [allReplies, setAllReplies] = useState()


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
    function showRepliesFunction(){
        setShowReplies(prev => !prev)
    }

    useEffect(() =>{
        if(!showReplyCard){
            setReplyShown(false)
        }
    }, [showReplyCard])
    console.log(postContent)
    useEffect(() =>{
        setAllReplies(postContent.postReplies.map(prev =>{
            return (
                <div key={uuid()} className="reply">
                    <p className="reply-username"><b>{prev.postRepliesUser}</b></p>
                    <p className="reply-content">{prev.postRepliesContent}</p>
                </div>
            )
        }))
    }, [showReplies])


    return(
        <div className="blog-entry">
            {postContent.postUserEmail ? <p className="blog-username"><b>{postContent.postUsername ? postContent.postUsername : postContent.postUserEmail}</b></p> : <p className="blog-username"><b>Anonymous</b></p>}
            <p className="blog-content">{postContent.postContent}</p>
            <div className="reply-text-line">
                <p className="reply-link" onClick={newReply}>Reply</p>
                <p className="show-replies" onClick={showRepliesFunction}>Show replies</p>

            </div>

            {
            showReplies ? 
            <div className="replies">
                {allReplies}
            </div>
            :
            null
            }

            {showReplyCard ? <ReplyCard userState={userState} key={uuid()} dataURL={dataURL} postContent={postContent}/> : null}
        </div>
    )    
    
}