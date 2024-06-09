import Image from "next/image";
import { Inter } from "next/font/google";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import UsernameForm from "@/components/UsernameForm";
import useUserInfo from "@/hooks/useUserInfo";
import PostForm from "@/components/PostForm";
import axios from "axios";
import PostContent from "@/components/PostContent";
import Layout from "@/components/Layout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  
  const {userInfo, status:userInfoStatus} = useUserInfo();
  const [posts, setPosts] = useState([]);
  const [idsLikedByMe, setIdsLikedByMe] = useState([]);

  function fetchHomePosts() {
    axios.get('api/posts', {method: 'GET'}).then(response =>{
      setPosts(response.data.posts);
      setIdsLikedByMe(response.data.idsLikedByMe);
    });
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
    <Layout>
      <h1 className="text-lg font-bold p-4">Home</h1>
      <PostForm onPost={() => { fetchHomePosts(); }} />
      <div className="">
        {posts.length > 0 && posts.map(post => (
          <div className="border-1 border-twitterBorder p-5">
            <PostContent {...post}/>
          </div>
        ))}
      </div>
    </Layout>
  )
}


// return (
//   <Layout>
//     <h1 className="text-lg font-bold p-4">Home</h1>
//     <PostForm onPost={() => { fetchHomePosts(); }} />
//     <div className="">
//       {posts.length > 0 && posts.map(post => (
//         <div className="border-1 border-twitterBorder p-5">
//           <PostContent {...post} likedByMe={idsLikedByMe.includes(post._id)}/>
//         </div>
//       ))}
//     </div>
//   </Layout>
// )
// }

// trying to get axios to call properly

    // axios.get('/api/posts').then(response=>{
    //   setPosts(response.data);
      
    // })
    
    
    // fetch('/api/posts', { method: 'GET' })
    //   .then(response => {
    //     console.log('data: '+ response.data);
    //     setPosts(response);
    //   });

          // fetch('/api/users?id=' + session.user.id, 
    //     {
    //         method:'GET'
    //     }).then(response => {
    //             response.json().then(json => {
    //                 setUserInfo(json);
    //                 setStatus('done');
    //             })
    //         })

        // fetch('/api/posts', 
    // { 
    //   method: 'GET' 
    // }).then(response => {
    //     response.json().then(json=>{
    //       console.log('data: '+ json);
    //       setPosts(json);
    //     })
        
    //   });