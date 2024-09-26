import Image from "next/image";

type ButtonProps = {
    type: 'button' | 'submit';
    title: string;
    icon?: string;
    variant: string;
}

const Button = ({type,title,icon,variant}: ButtonProps) => {
  return (
    <button type={type} className={`flexCenter gap-3 rounded-2xl border ${variant}`}>
        {icon && <Image src={icon} alt={title} width={24} height={24}/>}
        <label className="text-bold">{title}</label>
    </button>
  )
}

export default Button