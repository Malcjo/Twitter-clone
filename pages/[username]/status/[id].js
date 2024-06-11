import PostContent from "@/components/PostContent";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import useUserInfo from "@/hooks/useUserInfo";
import PostForm from "@/components/PostForm";
import Post from "@/models/Post";

export default function PostPage() {

    const router = useRouter();
    const { id } = router.query;
    const [post, setPost] = useState();
    const [repliesLikedByMe, setRepliesLikedByMe] = useState([]);
    const [replies, setReplies] = useState([]);
    const {userInfo} = useUserInfo();

    function fetchData(){
        axios.get('/api/posts?id=' + id)
        .then(response =>{
            console.log('response: '+response.data.post);
            setPost(response.data.post);
        });
        axios.get('/api/posts?parent='+id)
        .then(response => {
            setReplies(response.data.posts);
            setRepliesLikedByMe(response.data.idsLikedByMe);
        });
    }

    useEffect(() => {
        if (!id) {
            return;
        }
        console.log('id: ' + id);
        fetchData();
        }, [id]);

    return (
        <Layout>
            {!!post?._id && (
                <div className="px-5 py-2">
                    <Link href={'/'}>
                        <div className="flex mb-5 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                            </svg>
                            Tweet
                        </div>
                    </Link>
                    <PostContent {...post} big/>

                </div>
            )}
            {!!userInfo && (
                <div className="border-t border-twitterBorder py-5">
                    <PostForm onPost={fetchData} 
                    parent = {id}
                    compact placeholder={"Tweet your reply"}/>
                </div>
            )}
            <div className="">
                {replies.length > 0 && replies.map(reply => (
                    <div className="p-5 border-t border-twitterBorder">
                        <PostContent {...reply} likedByMe={repliesLikedByMe.includes(reply._id)} />
                    </div>
                ))}
            </div>
        </Layout>
    );
}



        // fetch('/api/posts?id=' + id, 
        // {
        //     method: 'GET',
        // }).then(response =>{
        //     console.log('response: ' + response);
        //     setPost(response)
        //     response.json().then(json => {
        //         console.log('jjson: ' + json);
        //         //setPost(json.data);
        //     })
        //     //try with axios at some point with response.data.post to see if it works instead of using
        //     //a fetch
        // });