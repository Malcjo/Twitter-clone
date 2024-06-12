import Image from "next/image";
import { Inter } from "next/font/google";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import UsernameForm from "@/components/UsernameForm";
import useUserInfo from "@/hooks/useUserInfo";
import PostForm from "@/components/PostForm";
import axios from "axios";
import PostContent from "@/components/PostContent";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  
  const {data:session} = useSession();
  const {userInfo,setUserInfo, status:userInfoStatus} = useUserInfo();
  const [posts, setPosts] = useState([]);
  const [idsLikedByMe, setIdsLikedByMe] = useState([]);
  const router = useRouter();

  function fetchHomePosts() {
    axios.get('/api/posts').then(response =>{
      if(response.status == 500){
        throw new Error("error from server");
      }
      setPosts(response.data.posts);
      setIdsLikedByMe(response.data.idsLikedByMe);
    });

  }


  async function logout(){
    setUserInfo(null);
    await signOut();
  }

  useEffect(() => {
    try{fetchHomePosts();}catch(e){}
    
  }, []);


  if (userInfoStatus === 'loading') {
    return 'loading user info';
  }

  if (userInfo && !userInfo?.username) {
    return <UsernameForm />;
  }

  if(!userInfo){
    router.push('/login');
    return 'no user info';
  }

return (
  <Layout>
    <h1 className="text-lg font-bold p-4">Home</h1>
    <PostForm onPost={() => { fetchHomePosts(); }} />
    <div className="">
      {posts.length > 0 && posts.map(post => (
        <div className="border-1 border-twitterBorder p-5" key={post._id}>
          <PostContent {...post} likedByMe={idsLikedByMe.includes(post._id)}/>
        </div>
      ))}
    </div>
    {userInfo && (
      <div className="p-5 text-center border-t border-twitterBorder">
        <button onClick={logout} className="bg-twitterWhite text-black px-5 py-2 rounded-full">
          Logout
        </button>
      </div>
    )}

  </Layout>
)
}

// function fetchHomePosts() {
//   axios.get('/api/posts', {method: 'GET'}).then(response =>{
//     setPosts(response.data.posts);
//     setIdsLikedByMe(response.data.idsLikedByMe);
//   });
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