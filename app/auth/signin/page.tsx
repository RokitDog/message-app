import {getProviders } from 'next-auth/react'
import Image from 'next/image';
import SignInComponent from './SignInComponent';

async function SignInPage() {
    const providers = await getProviders();

  return (
    <div className='grid justify-center'>
        <div >
            <Image src='https://static.xx.fbcdn.net/rsrc.php/v3/y2/r/yvbOx5two0W.png' width={700} height={700} alt="meta logo" className="rounded-full mx-2 object-cover" />
        </div>

        <SignInComponent providers={providers}/>
    </div>
  )
}

export default SignInPage