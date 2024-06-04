import PostContent from "@/components/PostContent";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";

export default function PostPage() {

    const router = useRouter();
    const { id } = router.query;
    const [post, setPost] = useState();

    useEffect(() => {
        if (!id) {
            return;
        }
        console.log('id: ' + id);
        axios.get('/api/posts?id=' + id)
        .then(response =>{
            console.log('response: '+response.data.post);
            setPost(response.data.post);
        })
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
        }, [id]);

    //console.log({ id });
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
                    <PostContent {...post} big={true} />
                </div>
            )}
        </Layout>
    );
}