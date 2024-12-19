'use client'
import { useTheme } from "next-themes";
import { redirect } from "next/navigation";
import React from "react";

export default function Home() {

  redirect("/admin");

  
  return null;
}
