import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { EditPanoramic, GetPanoramicByNoRm } from "@/services/user.services";
import { useLogin } from "@/hooks/useLogin";
import { Button } from "@/components/elements/button";
import { Label } from "@/components/elements/label";
import { Input } from "@/components/elements/input";
import arrowBack from '@/assets/arrow.png';

interface ContainerEditProps {
    id: number;
    id_user: number;
    no_rm: string;
    name_patient: string;
    image_url: string;
}

const isValidPanoramicImage = (res: any): res is ContainerEditProps => {
    return res && typeof res === "object" && "no_rm" in res && "name_patient" in res && "image_url" in res;
};

const ContainerEdit = () => {
    const { no_rm } = useParams<{ no_rm: string }>(); // Ambil no_rm dari URL
    const navigate = useNavigate();
    useLogin();

    // State untuk menyimpan data
    const [noRm, setNoRm] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [selectedUrlImage, setSelectedUrlImage] = useState<string | null>(null);

    useEffect(() => {
        if (!no_rm) return;

        GetPanoramicByNoRm({
            no_rm,
            callback: (success, res) => {
                console.log("API Response:", res);

                if (success) {
                    if (isValidPanoramicImage(res)) {
                        setNoRm(res.no_rm || "");
                        setName(res.name_patient || "");
                        setSelectedUrlImage(res.image_url || null);
                    } else {
                        toast.error("Invalid data format from API");
                        console.error("Unexpected response:", res);
                    }
                } else {
                    toast.error("Failed to load panoramic images");
                    console.error(res);
                }
            },
        });
    }, [no_rm]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Implementasi update data ke backend bisa ditambahkan di sini
        if (!noRm ) {
            toast("Please, fill your Medical Record Number!");
            return;
        }

        if (!name) {
            toast("Please, fill your Name Patient!");
            return;
        }

        // if (!selectedImage) {
        //     toast("Please, fill your Image Patient!");
        //     return;
        // }
        const formData = new FormData();
        formData.append("name_patient", name);

        if (selectedImage) { 
            formData.append("file", selectedImage);
        }

        EditPanoramic({
            no_rm: noRm,
            file: formData,
            callback: (success, res) => {
                if (success) {
                    toast.success("Data updated successfully!");
                    navigate("/panoramic", { replace: true });
                } else {
                    toast.error("Failed to update data");
                    console.error(res);
                }
            },
        })
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
    
            setSelectedImage(file); // ✅ Simpan file yang benar
            setSelectedUrlImage(URL.createObjectURL(file)); // ✅ Buat preview dari file
        }
    };
    

    return (
        <div className="flex justify-center">
            <div className="flex w-3/5 bg-slate-100 rounded-2xl">
                <div className="flex flex-col w-full p-5">
                    <div className="flex w-1/5 justify-between mb-2">
                        <button
                            onClick={() => navigate("/panoramic", { replace: true })}
                            className="bg-white text-blue-600 font-semibold px-3 py-1 rounded-lg shadow-md hover:bg-blue-100 flex items-center gap-2 hover:cursor-pointer"
                        >
                            <img
                                src={arrowBack}
                                alt="back"
                                className="w-4 h-4 object-cover"
                            />
                            Back
                        </button>
                    </div>
                    <h1 className="text-4xl font-bold mb-3">Edit Image</h1>
                    <div className="flex w-full justify-between">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <Label htmlFor="no_rm">Medical Record Number</Label>
                                <Input
                                    id="no_rm"
                                    type="text"
                                    value={noRm}
                                    onChange={(e) => setNoRm(e.target.value)}
                                    className="w-full rounded bg-white text-sm border px-3 py-2"
                                />
                            </div>
                            <div className="mb-4">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full rounded bg-white text-sm border px-3 py-2"
                                />
                            </div>
                            <div className="mb-4">
                                <Label htmlFor="image">Panoramic Dental Image</Label>
                                <Input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="w-full bg-white rounded text-sm border px-3 py-2"
                                />
                                {selectedUrlImage && (
                                    <div className="mt-3">
                                        <p>Preview :</p>
                                        <img src={selectedUrlImage} alt="Preview" className="h-36 object-cover rounded-lg" />
                                    </div>
                                )}
                            </div>
                            <Button variant="auth" className="w-full mt-6 hover:cursor-pointer" type="submit">
                                Edit Data
                            </Button>
                        </form></div>
                </div>
            </div>
        </div>
    );
};

export default ContainerEdit;
