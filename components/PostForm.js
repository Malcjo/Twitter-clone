import useUserInfo from "@/hooks/useUserInfo";
import { useState } from "react";

export default function PostForm(){
    const {userInfo, status} = useUserInfo();
    const[text, setText] = useState('');

function handlePostSubmit(e){
    e.preventDefault();
    console.log(text);

}

    if(status === 'loading'){
        return '';
    }
    return (
        <form className="mx-5" onSubmit={handlePostSubmit}>
            <div className="flex">
                <div>
                    <div className="rounded-full overflow-hidden w-12">
                        <img src={userInfo?.image} alt="avatar" />
                    </div>
                </div>
                <div className="grow pl-2">
                    <textarea className="w-full p-2 bg-transparent text-twitterWhite"
                        value={text}
                        onChange={e => {setText(e.target.value), value=''}}
                        placeholder="What's Happening?" />
                    <div className="text-right border-t border-twitterBorder pt-2">
                        <button className="bg-twitterBlue text-white px-5 py-1 rounded-full">Tweet</button>
                    </div>
                </div>
            </div>
        </form>
    );
}