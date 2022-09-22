import {InputHTMLAttributes}   from "react";

interface LaProps extends InputHTMLAttributes<HTMLInputElement>{}

export default function Input(props : LaProps){
    return(
        
        <input 
        {...props}
        className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder: text-zinc-500'
        />
    )
}