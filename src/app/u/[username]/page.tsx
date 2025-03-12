'use client';
import React from 'react'
import Contact from '@/helpers/contact'
import { useParams } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Button } from '@/components/ui/button';


const page = () => {
  const params = useParams<{ username: string }>();
  // username: params.username
  return (
    <>
    <div className="container mx-auto my-8 max-w-4xl rounded bg-white p-6">
      <h1 className="mb-6 text-center text-4xl font-bold">Public Profile Link</h1>

      <Contact username={params.username} />
      <Separator className="my-6" />
    </div>
      <div className="text-center">
        <div className="mb-4">Get Your Message Board</div>
        <Link href="/sign-up">
          <Button>Create Your Account</Button>
        </Link>
      </div>
      </>
  )
}

export default page