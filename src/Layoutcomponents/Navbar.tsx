"use client"

import React,{useState, useRef, useEffect} from 'react'
import Link from "next/link"
import Image from "next/image"
import {NAV_LINKS} from "@/constants/index"
import Button from '@/components/Button'
import SearchBox from '@/components/SearchBox'

const Navbar = () => {
    const [OpenMenu,SetOpenMenu]= useState(false);
    const [OpenNav2, SetOpenNav2] = useState(false);
    const navbar2Ref = useRef<HTMLDivElement>(null);

    const Togglemenu = () =>{
        SetOpenMenu(!OpenMenu);
    }
    const ToggleNav2 = () => {
      SetOpenNav2((prevState) => !prevState);
  };
  const handleBoth = () => {
    Togglemenu();
    ToggleNav2();
  }
    
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (navbar2Ref.current && !navbar2Ref.current.contains(event.target as Node)) {
            SetOpenNav2(false);
        }
    };
    document.addEventListener("mouseup", handleClickOutside);
    return () => {
        document.removeEventListener("mouseup", handleClickOutside);
    };
}, []);

  return (
    <div className='w-full flex justify-center'>
    <nav className=" flex items-center justify-between max-container padding-conatiner z-30 py-3 px-5 fixed top-0 w-full h-auto bg-white">
        <Link href="/">
            <Image src="/logo.svg" alt="logo" width={63} height={63}/>
        </Link>
        <div className='flex gap-12 items-center'>
        <ul className="hidden h-full gap-12 lg:flex">
            {NAV_LINKS.map((link)=> (
                <Link href={link.href} key={link.key} className=' text-gray-600 flexCenter 
                cursor-pointer pt-2 transition-all hover:font-bold'>{link.label}</Link>
            ))}
            
        </ul>
        <button onClick={ToggleNav2} className="text-gray-600 flexCenter cursor-pointer pt-2 transition-all hover:font-bold"><Image src='/search_icon.svg' alt='search' width={35} height ={35} /></button>
        </div>
        <div className="hidden lg:flex justify-between gap-2">
        <Button 
            type="button"
            title="Signup"
            icon="/signup_icon.svg"
            variant="btn_gray"/>
        <Button 
            type="button"
            title="Login"
            icon="/user_icon.svg"
            variant="btn_teal"/>
        </div>

        <Image src="/menu_icon.svg" alt="menu" height={32} width={32} onClick={Togglemenu} className="inline-block cursor-pointer lg:hidden"/>

        <div className={`fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center transition-opacity ${OpenMenu ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="bg-white p-8 rounded-2xl relative w-11/12 max-w-sm">
          <button onClick={Togglemenu} className="absolute top-2 right-3 text-3xl transition-all hover:font-bold">
            &times;
          </button>
          <nav>
            <ul className="flex flex-col items-center space-y-4">
              {NAV_LINKS.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-xl text-gray-800 transition-all underline hover:font-semibold"
                    onClick={Togglemenu}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            
          </nav>
          <div className="flex flex-col gap-2 mt-8">
            <Button type="button" title="Signup" icon="/signup_icon.svg" variant="btn_gray" />
            <Button type="button" title="Login" icon="/user_icon.svg" variant="btn_teal" />
          </div>
        </div>
      </div>


    </nav>
    {OpenNav2 &&<div ref={navbar2Ref} className="flexCenter rounded-full bg-gradient-to-r from-pink-300 to-green-200 opacity-40 fixed w-full h-auto max-container padding-conatiner border-2 border-gray-600 z-30 py-5 px-5 transition-transform duration-300 ease hover:opacity-100">
    <SearchBox/>
    </div>}
    </div>
  )
}

export default Navbar