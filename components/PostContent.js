import ReactTimeAgo from "react-time-ago";
import Avatar from "./Avatar";
import Link from "next/link";
import PostButtons from "./PostButtons";

export default function PostContent({ 
    text, author, createdAt, _id, 
    likesCount,likedByMe, commentsCount,
    big = false }) {
    //console.log('this is the author: ' + author);
    return (
        <div>
            {likedByMe? 1:0}
            <div className="flex w-full">
                <div>
                    {!!author?.image && (
                        <div className="cursor-pointer">
                            <Link href={'/'+author?.username}>
                                <Avatar src={author.image} />
                            </Link>
                        </div>
                    )}

                </div>
                <div className="pl-2 grow">
                    <div>
                        <Link href={'/' + author?.username}>
                            <span className="font-bold pr-1 cursor-pointer">{author.name}</span>
                        </Link>

                        {big && (<br />)}

                        <Link href={'/' + author?.username}>
                            <span className=" text-twitterLightGray cursor-pointer">@{author.username}</span>
                        </Link>
                        {createdAt && !big && (
                            <span className="pl-1 text-twitterLightGray">
                                <ReactTimeAgo
                                date={Date.parse(createdAt)}
                                timeStyle={'twitter'} />
                                </span>
                        )}

                    </div>
                    {!big && (
                        <div>
                            <Link href={'/' + author?.username + '/status/' + _id}>
                            <div className="w-full cursor-pointer">
                            {text}
                            </div>
                                
                            </Link>
                            <PostButtons username={author?.username} id={_id} likesCount={likesCount} likedByMe={likedByMe} commentsCount={commentsCount}/>
                        </div>
                    )}
                </div>
            </div>
            {big && (
                <div className="mt-2">
                    <Link href={'/' + author?.username + '/status/' + _id}>
                        {text}
                    </Link>
                    {createdAt && (
                        <div className="text-twitterLightGray text-sm">
                            {(new Date(createdAt))
                                .toISOString()
                                .replace('T', ' ')
                                .slice(0, 16)
                                .split(' ')
                                .reverse()
                                .join(' ')
                            }
                        </div>
                    )}
                    <PostButtons username={author?.username} id={_id}  likesCount={likesCount} likedByMe={likedByMe} commentsCount={commentsCount}/>
                </div>
            )}
        </div>

    );
}