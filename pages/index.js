import Image from "next/image";
import { Inter } from "next/font/google";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import UsernameForm from "@/components/UsernameForm";
import useUserInfo from "@/hooks/useUserInfo";
import PostForm from "@/components/PostForm";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  
  const {userInfo, status:userInfoStatus} = useUserInfo();
  const [posts, setPosts] = useState([]);

  function fetchHomePosts() {
    axios.get('/api/posts').then(response=>{
      setPosts(response.data);
    })
    // fetch('/api/posts', { method: 'GET' })
    //   .then(response => {
    //     console.log('length: ' + response);
    //     setPosts(response);
    //   });
  }

  useEffect(() => {
    fetchHomePosts();
  }, []);


  if (userInfoStatus === 'loading') {
    return 'loading user info';
  }

  if (!userInfo?.username) {
    return <UsernameForm />;
  }

  return (
    <div className="max-w-lg mx-auto border-l border-r border-twitterBorder min-h-screen">
      <h1 className="text-lg font-bold p-4">Home</h1>
      <PostForm/>
      <div className="">
        {posts.length > 0 && posts.map(post =>(
          <div className="border-1 border-twitterBorder p-5">
            {post.text}
          </div>
        ))}
      </div>
    </div>
  )
}
