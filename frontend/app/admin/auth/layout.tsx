"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {jwtDecode} from 'jwt-decode';

const isTokenExpired = (token: string) => {
  if (!token) return true;
  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  return decodedToken.exp && decodedToken.exp < currentTime;
};


export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const {isAuthenticated} = useAuth();
  const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string).token : null;

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);
  useEffect(() => {
    if (isTokenExpired(token)) {
      
      localStorage.removeItem('user');
      router.push('/login'); 
    }
  }, [token, router]);

 
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
