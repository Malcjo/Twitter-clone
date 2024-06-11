import useUserInfo from "@/hooks/useUserInfo";
import axios from "axios";
import { useState } from "react";
import Avatar from "./Avatar";

export default function PostForm({onPost, compact, parent,  placeholder = ' What\'s happening?'}) {
    const { userInfo, status } = useUserInfo();
    const [text, setText] = useState('');

    async function handlePostSubmit(e) {
        e.preventDefault();
        await axios.post('/api/posts', {text,parent});
        setText('');
        if(onPost){
            onPost();
        }
        // await fetch('/api/posts', {
        //     method: 'POST',
        //     headers: { 'content-type': 'application/json' },
        //     body: JSON.stringify({ text }),
        // });
    }

    if (status === 'loading') {
        return '';
    }
    return (
        <form className="mx-5" onSubmit={handlePostSubmit}>
            <div className={(compact ? 'items-center' : '') + " flex" /* space before the flex is important */}>
                <div className="">
                    <Avatar src ={userInfo?.image}/>
                </div>
                <div className="grow pl-2">
                    <textarea className={(compact ? 'h-10 mt-1' : 'h-24') + " w-full p-2 bg-transparent text-twitterWhite"}
                        value={text}
                        onChange={e => setText(e.target.value)}
                        placeholder={placeholder} />
                    {!compact && (
                        <div className="text-right border-t border-twitterBorder pt-2 pb-2">
                            <button className="bg-twitterBlue text-white px-5 py-1 rounded-full">Tweet</button>
                        </div>
                    )}
                </div>
                {compact && (
                    <div className="pl-2">
                        <button className="bg-twitterBlue text-white px-5 py-1 rounded-full">Tweet</button>
                    </div>
                )}
            </div>
        </form>
    );
}