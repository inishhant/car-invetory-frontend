import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export default function Cars() {
    const router = useRouter();
    useEffect(()=>{
        router.push('/');
    },[router])
  return (
    <h1>Does not exist</h1>
  );
}
