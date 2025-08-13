"use client";
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import { userDetailContext } from '@/context/userDetailContext';

export type UsersDetail ={
  name: string;
  email: string;
  credits: number;
}

function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const {user} = useUser();
  const [userDetail, setUserDetail] = useState<any>();

  useEffect(() => {
      user&&createNewUser();
  }, [user]);

    const createNewUser = async()=>{
        const result = await axios.post('/api/users');
        console.log(result.data);
        setUserDetail(result.data);
        
    }
  return (
    <div>
      <userDetailContext.Provider value={{userDetail, setUserDetail}}>

      {children}
      </userDetailContext.Provider>
      </div>
  )
}

export default Provider