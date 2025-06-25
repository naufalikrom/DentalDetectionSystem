import { Button } from "@/components/elements/button"
import { HTMLProps } from 'react';
import { useNavigate } from "react-router-dom";
import trash from '@/assets/bin.png';
import edit from '@/assets/edit.png';
import { DeletePanoramic } from "@/services/user.services";
import { toast } from "sonner";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/elements/alertDialog";

interface CardProps extends HTMLProps<HTMLDivElement> {
    children?: React.ReactNode;
}

interface HeaderProps extends HTMLProps<HTMLDivElement> {
    image?: string;
}
interface BodyProps extends HTMLProps<HTMLDivElement> {
    no_rm?: string;
    name?: string
}
interface FooterProps extends HTMLProps<HTMLDivElement> {
    no_rm: string;
}

const CardPanoramic = ({ children }: CardProps) => {
    return (
        <div className="flex w-full items-start">
            <div className="w-full bg-slate-100 border border-blue-200 rounded-lg shadow mx-2 flex flex-col justify-between mb-4 md:mb-0">
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
const Body = ({ no_rm, name }: BodyProps) => {
    return (
        <div className="pb-5 px-5 h-full">
            <h5 className="text-base font-semibold tracking-tight text-gray-900">
                Medical Record Number :  <span className="font-normal">{no_rm}</span>
            </h5>
            <h5 className="text-base font-semibold tracking-tight text-gray-900">
                Name Patient :  <span className="font-normal">{name}</span>
            </h5>
        </div>
    )
}

const Footer = ({ no_rm }: FooterProps) => {
    const navigate = useNavigate();

    const handleEdit = (e: any) => {
        e.preventDefault();
        navigate('/editPanoramic/' + no_rm , { replace: true });
    }


    const handleClick = (e: any) => {
        e.preventDefault();
        navigate('/detectedPanoramic/' + no_rm, { replace: true });
    }

    return (
        <div className="flex flex-row items-end justify-end px-5 pb-5">
            <EditData no_rm={no_rm} />
            <button
                onClick={handleEdit}
                className="flex items-center justify-center mr-2 h-9 w-9 bg-amber-300 text-blue-600 font-semibold rounded-lg shadow-md hover:bg-blue-100 hover:cursor-pointer"
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

const EditData = ({ no_rm }: { no_rm: string }) => {
    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
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

    return (

        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button
                    // onClick={handleDelete}
                    className="flex items-center justify-center mr-2 h-9 w-9 bg-red-400 text-blue-600 font-semibold rounded-lg shadow-md hover:bg-blue-100 hover:cursor-pointer"
                >
                    <img
                        src={trash}
                        alt="trash"
                        className="w-4 h-4 object-cover rounded-2xl "
                    />
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} className="bg-red-600">Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

CardPanoramic.Header = Header;
CardPanoramic.Body = Body;
CardPanoramic.Footer = Footer;
export default CardPanoramic
