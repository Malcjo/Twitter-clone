import Avatar from "@/components/Avatar";
import Cover from "@/components/Cover";
import Layout from "@/components/Layout";
import PostContent from "@/components/PostContent";
import TopNavLink from "@/components/TopNavLink";
import axios from "axios";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";

export default function UserPage(){

    const router = useRouter();
    const {username} = router.query;
    const [profileInfo, setProfleInfo] = useState();
    const [posts, setPosts] = useState([]);
    const [postsLikedByMe, setPostsLikedByMe] = useState([]);

    useEffect(()=>{
        if(!username){
            return;
        }
        axios.get('/api/users?username='+username)
        .then(response => {
            setProfleInfo(response.data);
        });
    },[username]);

    useEffect(()=>{

        if(!profileInfo?._id){
            return;
        }
        axios.get('/api/posts?author='+profileInfo._id)
        .then(response =>{
            setPosts(response.data.posts);
            setPostsLikedByMe(response.data.idsLikedByMe);
        })
    },[profileInfo]);

    return (
        <Layout>
            {!!profileInfo && (
                <div>
                    {/* Back Button */}
                    <div className="px-5 pt-2">
                        <TopNavLink title={profileInfo.name} url="/" />
                    </div>

                    {/* Background Cover Image */}
                    <Cover />

                    <div className="flex justify-between">

                        {/* Profile Picture */}
                        <div className="ml-5 relative">
                            <div className="absolute -top-12 border-4 rounded-full border-black">
                            <Avatar big src={profileInfo.image} />
                            </div>
                            
                        </div>

                        {/* Follow Button*/}
                        <div className="p-2">
                            <button className="bg-twitterBlue text-white py-2 px-5 rounded-full">Follow</button>
                        </div>

                    </div>
                    <div className=" ps-5 mt-2">
                        {/*name */}
                        <h1 className="font-bold text-xl leading-5">{profileInfo.name}</h1>
                        {/*username */}
                        <h2 className="text-twitterLightGray text-sm">@{profileInfo.username}</h2>
                        {/* bio */}
                        <div className="text-sm mt-2 mb-2"> asasd sad asd ad a d</div>
                    </div>

                </div>
            )}
            {posts?.length > 0 && posts.map(post =>(
                <div className="p-5 border-t border-twitterBorder" key={post._id}>
                    <PostContent {...post} likedByMe={postsLikedByMe.includes(post._id)} />
                </div>
            ))}
        </Layout>
    )
}