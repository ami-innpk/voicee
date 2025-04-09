
import { isAuthenticated } from '@/lib/actions/auth.action'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const RootLayout = async ({ children }: { children: React.ReactNode }) => {

    const isUserAuthenticated = await isAuthenticated();

    if(!isUserAuthenticated) redirect("/auth/sign-in");

    return (
        <div  className='root-layout'  >
            <nav>
                <Link href="/" className='flex gap-2 items-center'>
                <Image
                src={"/logo.svg"}
                alt="logo"
                width={38}
                height={32}
                />
                <h2 className='text-primary-100' >Voicee</h2>
                </Link>

            </nav>
            {children}
        </div>
    )
}

export default RootLayout