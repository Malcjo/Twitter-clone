import Image from "next/image";
import { Inter } from "next/font/google";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import UsernameForm from "@/components/UsernameForm";
import useUserInfo from "@/hooks/useUserInfo";
import PostForm from "@/components/PostForm";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  
  const {userInfo, status:userInfoStatus} = useUserInfo();



  if(userInfoStatus === 'loading'){
    return 'loading user info';
  }

  if (!userInfo?.username) {
    return <UsernameForm />;
  }

  return (
    <div className="max-w-lg mx-auto border-l border-r border-twitterBorder min-h-screen">
      <h1 className="text-lg font-bold p-4">Home</h1>
      <PostForm/>
    </div>
  )
}
