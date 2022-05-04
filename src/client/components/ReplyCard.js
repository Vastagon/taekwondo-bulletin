import "../styles/ReplyCard.css"

export default function ReplyCard({postContent}){
    return(
        <div className="reply-card">
            <div className="inner-reply-card">
                <p className="reply-username">{postContent.postUsername || "Anonymous"}</p>
                <p>{postContent.postContent}</p>
                <textarea className="reply-input" placeholder="Reply here"></textarea>
            </div>
        </div>
    )
}