//@ts-nocheck
import { getProviders, signIn, useSession} from "next-auth/react";
import {useRouter} from "next/router";
export default function LoginPage({ providers }) {
    
    const {data, status} = useSession();
    const router = useRouter();

    if(status == 'loading'){
        return '';
    }
    if(data){
        router.push('/');
    }

    return (
        <div className="flex items-center justify-center h-screen">
            {Object.values(providers).map(provider => (
                <div>
                    <button onClick={async () =>{await signIn(provider.id)}} className="bg-twitterWhite pl-2 pr-5 py-2 text-black rounded-full flex items-center">

                        <img src="GoogleIcon.png" alt="Bold letter G, curves from the top round like a circle to the left, stops just before connecting and flicks slightly to the left, colourful bold colours going from red, yellow, green, blue"
                            className="h-8" />
                        Sign in with {provider.name}
                    </button>
                </div>
            ))}
        </div>
    );
}

export async function getServerSideProps() {
    const providers = await getProviders();
    return {
        props: { providers },
    }
}