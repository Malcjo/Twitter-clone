import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import FlipNumbers from 'react-flip-numbers';

export default function PostButtons({
    username,
    id,
    likesCount: LikesCountDefault = 0,
    likedByMe: LikedByMeDefault=false,
    commentsCount,
}){
    const [likesCount, setLikesCount] = useState(LikesCountDefault);
    const [likedByMe, setLikedByMe] = useState(LikedByMeDefault);

    async function toggleLike(){
        console.log({id});
        const response = await axios.post('/api/like', {id});
        console.log(response);
        if (response.data?.like) {
            setLikesCount(prev => prev + 1);
            setLikedByMe(true);
        }
        else{
            setLikesCount(prev => prev - 1);
            setLikedByMe(false);
        }
    }
    //username hawk: id 6668eadd2999579a8209bd38
    1
    '/hawk/status/6668eadd2999579a8209bd38'
    return(
        <div className="flex justify-between mr-12 text-twitterLightGray text-sm mt-1">
            <Link href={'/'+username+'/status/'+id}>
            <div className="flex cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 mr-1">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
</svg>
<span>{commentsCount}</span>

            </div>
            </Link>

            <button className="flex">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 mr-1">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
</svg>
<span>0</span>
            </button>
            <button className={(likedByMe ? 'text-red-500 fill-red-500 ' : '') + "flex items-center"} onClick={toggleLike}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 mr-1 fill-inherit">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
</svg>
<span>
<FlipNumbers height={12} width={12} play perspective={100} numbers={likesCount.toString()} />
    </span>
            </button>
            <button className="flex">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 mr-1">
  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
</svg>

            </button>

        </div>
    );
}


// attempt call
        // const response = await fetch('/api/like', {id}, {Headers: {
        //              'content-type': 'application/json' 
        //          }}).then(test =>{
        // //console.log('get post ');
        // console.log(test);
        // });
        // console.log('get post ');
        // console.log(response);

        

        // const response = await axios.post('/api/like', {id}, {
        //     Headers: {
        //         'content-type': 'application/json' 
        //     }
        // });
