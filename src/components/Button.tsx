import Image from "next/image";
import Link from "next/link";

type ButtonProps = {
  title: string;
  icon?: string;
  variant: string;
  link: string;    // 🔥 link is now REQUIRED
};

const Button = ({ title, icon, variant, link }: ButtonProps) => {
  return (
    <Link href={link} className={`flexCenter gap-3 rounded-2xl border ${variant} px-4 py-2 transition hover:opacity-80`}>
      {icon && <Image src={icon} alt={title} width={24} height={22} />}
      <span className="font-semibold">{title}</span>
    </Link>
  );
};

export default Button;
