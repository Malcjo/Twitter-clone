import Image from "next/image";
import { Inter } from "next/font/google";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import UsernameForm from "@/components/UsernameForm";
import useUserInfo from "@/hooks/useUserInfo";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  
  const {userInfo, status:userInfoStatus} = useUserInfo();



  if(userInfoStatus === 'loading'){
    return 'loading user info';
  }

  if(!userInfo?.username){
    return <UsernameForm />;
  }

  return (
    <div>Test</div>
  )
}
