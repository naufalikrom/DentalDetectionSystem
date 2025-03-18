import { useState } from "react";
import { Button } from "@/components/elements/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/elements/dialog";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/elements/inputOTP";
import { Label } from "@/components/elements/label";
import { toast } from "sonner";
import { EmailOTP, ResendOTP } from "@/services/auth.services";
import { useNavigate } from "react-router-dom";

const DialogOTP = ({ from, email, open, setOpen }: { from?: string, email: string; open: boolean; setOpen: (open: boolean) => void }) => {
    const [otp, setOtp] = useState(""); // State untuk menyimpan OTP sebagai string

    const Navigate = useNavigate();
    // Fungsi untuk menangani perubahan input OTP
    const handleOtpChange = (newOtp: string) => {
        setOtp(newOtp);
    };

    // Fungsi untuk menangani klik tombol "Verify"
    const handleVerify = async () => {
        if (otp.length < 6) {
            toast("⚠️ OTP harus diisi lengkap!");
            return;
        }

        await EmailOTP({
            otp, callback: (success, res) => {
                if (success) {
                    if (typeof res === "string") {
                        toast("✅ OTP Verified!");
                    }

                    if (from === "register") {
                        Navigate("/login", { replace: true });
                    } else {
                        Navigate("/Development", { replace: true });
                    }
                } else {
                    const errorMessage = res instanceof Error ? res.message : res;
                    console.error("❌ Login failed:", errorMessage);
                }
            }
        });
        setOpen(false); // Menutup dialog setelah verifikasi sukses
    };

    const handleclose = async () => {
        setOpen(false);
    };

    const handleResendOTP = async () => {
        const res = await ResendOTP({
            email, callback: (success, res) => {
                if (success) {
                    if (typeof res === "string") {
                        toast(res);
                    }
                } else {
                    const errorMessage = res instanceof Error ? res.message : res;
                    console.error("❌ Resend OTP failed:", errorMessage);
                }
            }
        });
        
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Input OTP</DialogTitle>
                    <DialogDescription>Input the OTP code sent to {email}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Label htmlFor="otp">OTP Code</Label>
                    <div className="flex justify-center">
                        <InputOTP maxLength={6} value={otp} onChange={handleOtpChange}>
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                    </div>
                    <p className="text-sm text-blue-600 hover:underline" onClick={handleResendOTP}>
                        Resend OTP code
                    </p>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleclose}>
                        close
                    </Button>
                    <Button type="submit" onClick={handleVerify}>
                        Verify
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DialogOTP;
