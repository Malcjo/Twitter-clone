import PostContent from "@/components/PostContent";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import useUserInfo from "@/hooks/useUserInfo";
import PostForm from "@/components/PostForm";
import Post from "@/models/Post";
import TopNavLink from "@/components/TopNavLink";

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
                    <TopNavLink title="Tweet" url="/" />

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
                    <div className="p-5 border-t border-twitterBorder" key={post._id}>
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