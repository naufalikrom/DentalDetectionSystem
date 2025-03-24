import { useNavigate } from "react-router-dom";
import arrowBack from '@/assets/arrow.png';
import { Button } from "@/components/elements/button";
import { Label } from "@/components/elements/label";
import { Input } from "@/components/elements/input";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useLogin } from "@/hooks/useLogin";
import { PostPanoramic } from "@/services/user.services";


const ContainerUpload = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const Navigate = useNavigate();
    const idUser = useLogin().idUser.toString();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!e.target.no_rm.value || !e.target.image.value) {
            toast("Please, fill your medical record number and panoramic dental image!");
            return;
        }

        const formData = new FormData();
        formData.append("id_user", String(idUser));
        formData.append("no_rm", e.currentTarget.no_rm.value);
        formData.append("name_patient", e.currentTarget.name.value);
        formData.append("file", e.currentTarget.image.files[0]);

        PostPanoramic({
            data: formData,
            callback: (success, res) => {
                if (success) {
                    toast("Upload success!");
                    Navigate("/panoramic", { replace: true });
                } else {
                    const errorMessage = res instanceof Error ? res.message : res;
                    console.error("❌ Upload failed:", errorMessage);
                    toast(errorMessage);
                }
            }
        });
    }
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const imageUrl = URL.createObjectURL(event.target.files[0]);
            setSelectedImage(imageUrl);
        }
    };

    const no_rmRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        no_rmRef.current?.focus();
    }, [])
    return (
        <div className="flex justify-center">
            <div className=" flex w-3/5 bg-slate-100 rounded-2xl">
                <div className="flex flex-col w-full p-5">
                    <div className="flex w-1/5 justify-between mb-2">
                        <button
                            onClick={() => Navigate("/panoramic", { replace: true })}
                            className=" bg-white text-blue-600 font-semibold px-3 py-1 rounded-lg shadow-md hover:bg-blue-100 flex items-center gap-2"
                        >
                            <img
                                src={arrowBack}
                                alt="back"
                                className="w-4 h-4 object-cover"
                            />
                            Back
                        </button>
                    </div>
                    <div className="w-full md:w-1/2 text-left">
                        <h1 className="text-4xl font-bold mb-3">Upload Image</h1>
                        <p className="mt-3 text-gray-900">
                            Complete the data below by filling in the medical record number and panoramic dental image.
                        </p>
                    </div>
                    <hr className="border border-gray-300 mt-6 mb-2" />
                    <div className="flex w-full justify-between">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <Label htmlFor="no_rm" className="block text-slate-700 font-bold mb-2 text-lg">
                                    Medical Record Number
                                </Label>
                                <Input
                                    id="no_rm"
                                    type="text"
                                    className="w-full rounded bg-white text-sm border px-3 py-2 text-slate-700 placeholder:opacity-50 transition-all duration-300"
                                    placeholder="0000000"
                                    ref={no_rmRef}
                                />
                            </div>
                            <div className="mb-4">
                                <Label htmlFor="name" className="block text-slate-700 font-bold mb-2 text-lg">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    className="w-full rounded bg-white text-sm border px-3 py-2 text-slate-700 placeholder:opacity-50 transition-all duration-300"
                                    placeholder="alexander"
                                />
                            </div>
                            <div className="mb-4">
                                <Label htmlFor="image" className="block text-slate-700 font-bold mb-2 text-lg mt-2">
                                    Panoramic Dental Image
                                </Label>
                                <Input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    className="w-full bg-white rounded text-sm border px-3 py-2 text-slate-700 placeholder:opacity-50 transition-all duration-300"
                                    onChange={handleImageChange}
                                />
                                {selectedImage && (
                                    <div className="mt-3">
                                        <img src={selectedImage} alt="Preview" className="h-36 object-cover rounded-lg" />
                                    </div>
                                )}
                            </div>
                            <Button variant="auth" className="w-full mt-6" type="submit">
                                Upload Image
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContainerUpload
