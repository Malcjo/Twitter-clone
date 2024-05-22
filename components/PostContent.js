import ReactTimeAgo from "react-time-ago";
import Avatar from "./Avatar";

export default function PostContent({text, author, createdAt}) {
    console.log('this is the author: ' +author);
    return (
        <div className="flex">
            <div>
                <Avatar src={author.image} />
            </div>
            <div className="pl-2">
                <div>
                    <span className="font-bold">{author.name}</span>
                    <span className="pl-1 text-twitterLightGray">@{author.username}</span>
                    {createdAt &&(
                        <span className="pl-1 text-twitterLightGray"><ReactTimeAgo 
                        date={createdAt}
                        timeStyle={'twitter'}/></span>
                    )}
                    
                </div>
                <div>
                    {text}
                </div>
                
            </div>

        </div>
    );
}