import { Button } from "@/components/elements/button"
import { HTMLProps } from 'react';
import { Link, useNavigate } from "react-router-dom";
import trash from '@/assets/bin.png';
import edit from '@/assets/edit.png';
import { DeletePanoramic } from "@/services/user.services";
import { toast } from "sonner";

interface CardProps extends HTMLProps<HTMLDivElement> {
    children?: React.ReactNode;
}

interface HeaderProps extends HTMLProps<HTMLDivElement> {
    image?: string;
}
interface BodyProps extends HTMLProps<HTMLDivElement> {
    title?: string;
}
interface FooterProps extends HTMLProps<HTMLDivElement> {
    link: string;
    no_rm: string;
}

const CardPanoramic = ({ children }: CardProps) => {
    return (
        <div className="flex w-full items-start">
            <div className="md:w-1/4 w-full bg-slate-100 border border-blue-200 rounded-lg shadow mx-2 flex flex-col justify-between mb-4 md:mb-0">
                {children}
            </div>
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
const Body = ({ title }: BodyProps) => {
    return (
        <div className="pb-5 px-5 h-full">
            <h5 className="text-base font-semibold tracking-tight text-gray-900">
                Medical Record Number :  <span className="font-normal">{title}</span>
            </h5>
        </div>
    )
}

const Footer = ({ link, no_rm}: FooterProps) => {
    const navigate = useNavigate();

    const handleEdit = (e: any) => {
        e.preventDefault();
        navigate(link, { replace: true });
    }
    const handleDelete = (e: any) => {
        e.preventDefault();
        DeletePanoramic({
            no_rm: no_rm,
            callback: (success, res) => {
                if (success) {
                    toast("Delete success!");
                    window.location.reload();
                } else {
                    const errorMessage = res instanceof Error ? res.message : res;
                    console.error("❌ Delete failed:", errorMessage);
                    toast(errorMessage);
                }
            }
        })
    }

    const handleClick = (e: any) => {
        e.preventDefault();
        navigate(link, { replace: true });
    }

    return (
        <div className="flex flex-row items-end justify-end px-5 pb-5">
            <button
                onClick={handleDelete}
                className="flex items-center justify-center mr-2 h-9 w-9 bg-red-400 text-blue-600 font-semibold rounded-lg shadow-md hover:bg-blue-100 "
            >
                <img
                    src={trash}
                    alt="trash"
                    className="w-4 h-4 object-cover rounded-2xl "
                />
            </button>
            <button
                onClick={handleEdit}
                className="flex items-center justify-center mr-2 h-9 w-9 bg-amber-300 text-blue-600 font-semibold rounded-lg shadow-md hover:bg-blue-100 "
            >
                <img
                    src={edit}
                    alt="edit"
                    className="w-4 h-4 object-cover rounded-2xl "
                />
            </button>
            <Button className="w-1/3 mt-6 cursor-pointer" variant="auth" onClick={handleClick}>Detail</Button>
        </div>
    )
}

CardPanoramic.Header = Header;
CardPanoramic.Body = Body;
CardPanoramic.Footer = Footer;
export default CardPanoramic
