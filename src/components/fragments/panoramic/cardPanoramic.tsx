import { Button } from "@/components/elements/button"
import { HTMLProps } from 'react';
import { Link, useNavigate } from "react-router-dom";

interface CardProps extends HTMLProps<HTMLDivElement> {
    children?: React.ReactNode;
}

interface HeaderProps extends HTMLProps<HTMLDivElement> {
    image?: string;
}
interface BodyProps extends HTMLProps<HTMLDivElement> {
    title?: string;
    children?: React.ReactNode;
}
interface FooterProps extends HTMLProps<HTMLDivElement> {
    link: string;
}

const CardAbnormalities = ({ children }: CardProps) => {
    return (
        <div className="w-full bg-slate-100 border border-blue-200 rounded-lg shadow mx-2 flex flex-col justify-between mb-4 md:mb-0">
            {children}
        </div>
    )
}


const Header = ({ image }: HeaderProps) => {
    return (
        <div>
            <img src={image} alt={image} className="rounded-t-lg p-8 h-48 w-full object-cover" />
        </div>
    )
}
const Body = ({ title, children }: BodyProps) => {
    return (
        <div className="pb-5 px-5 h-full">
            <h5 className="text-xl mb-2 font-semibold tracking-tight text-gray-900">
                {title}
            </h5>
            <p className="text-m text-gray-900 line-clamp-3">
                {children}
            </p>
        </div>
    )
}

const Footer = ({ link }: FooterProps) => {
    const navigate = useNavigate();

    const handleClick = (e: any) => {
        e.preventDefault();
        navigate(link, { replace: true });
    }

    return (
        <div className="flex items-end justify-end px-5 pb-5">
            <Button className="w-1/3 mt-6 cursor-pointer" variant="auth" onClick={handleClick}>More</Button>
        </div>
    )
}

CardAbnormalities.Header = Header;
CardAbnormalities.Body = Body;
CardAbnormalities.Footer = Footer;
export default CardAbnormalities
