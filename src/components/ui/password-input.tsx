import * as React from "react"

import { cn } from "@/lib/utils"
import { Input } from "./input"
import { EyeIcon, EyeOffIcon } from "lucide-react"

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {

  }

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setshowPassword] = React.useState(false);
    return (
      <div className="flex gap-2 items-center">
      <Input type={showPassword ? "text" : "password"} extimg={showPassword? (<EyeIcon className='select-none' onClick={ ()=>setshowPassword(false)}/>) : (<EyeOffIcon className='select-none' onClick= {()=>setshowPassword(true)} />)} className={className} {...props} ref={ref}/>
      </div>
    )
  }
)
PasswordInput.displayName = "PasswordInput"

export { PasswordInput }
