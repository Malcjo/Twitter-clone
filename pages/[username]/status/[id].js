import PostContent from "@/components/PostContent";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function PostPage() {

    const router = useRouter();
    const { id } = router.query;
    const [post, setPost] = useState();

    useEffect(() => {
        if (!id) {
            return;
        }
        fetch('/api/posts?id=' + id, 
        {
            method: 'GET',
        }).then(response =>{
            response.json().then(json => {
                setPost(json);
            })
            //try with axios at some point with response.data.post to see if it works instead of using
            //a fetch
        })
        }, [id]);

    console.log({ id });
    return (
        <div>
            {!!post?._id && (
                <PostContent {...post}/>
            )}
        </div>
    );
}