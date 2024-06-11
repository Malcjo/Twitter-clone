import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function useUserInfo(){

    const { data: session, status: sessionStatus } = useSession();
    const [userInfo, setUserInfo] = useState();
    const [status, setStatus] = useState('loading');


    function getUserInfo() {
        if (sessionStatus === 'loading') {
            return;
        }
        if(!session?.user?.id){
            setStatus('unauthenticated');
            return;
        }
        fetch('/api/users?id=' + session.user.id, 
        {
            method:'GET'
        }).then(response => {
                response.json().then(json => {
                    setUserInfo(json);
                    setStatus('authenticated');
                })
            })
    }

    useEffect(() => {
        getUserInfo();
    }, [sessionStatus]);

    return { userInfo, setUserInfo, status };

}