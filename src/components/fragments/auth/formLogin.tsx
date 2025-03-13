import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/elements/button";
import { Input } from "@/components/elements/input";
import { Label } from "@/components/elements/label";

const FormLogin = () => {
  const navigate = useNavigate(); 

  useEffect(() => {
    if (!localStorage.getItem("email")) {
      window.history.replaceState(null, "", "/dashboard");
    }
  }, []);

  const handleLogin = (e: any) => {
    e.preventDefault();

    const email = e.currentTarget.email.value.trim();
    const password = e.currentTarget.password.value.trim();

    if (!email || !password) {
      alert("Please, fill your email and password!");
      return;
    }

    if (!email.includes("@")) {
      alert("Please, fill your email correctly");
      return;
    }

    // Simpan ke local storage
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);

    // 🔹 Redirect ke /detection tanpa menambahkan history login
    navigate("/Development", { replace: true });
  };

  const emailRef = useRef<HTMLInputElement>(null);
  useEffect(()=>{
    emailRef.current?.focus();
  },[])

  return (
    <form onSubmit={handleLogin}>
      <div className="mb-4">
        <Label htmlFor="email" className="block text-sm text-slate-700 font-bold mb-2">
          Email
        </Label>
        <Input
          id="email"
          type="text"
          className="w-full rounded text-sm border px-3 py-2 text-slate-700 placeholder:opacity-50 transition-all duration-300"
          placeholder="example@gmail.com"
          ref={emailRef}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="password" className="block text-sm text-slate-700 font-bold mb-2 mt-2">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          className="w-full rounded text-sm border px-3 py-2 text-slate-700 placeholder:opacity-50 transition-all duration-300"
          placeholder="*******"
        />
      </div>
      <Button variant="auth" className="w-full mt-6" type="submit">
        Login
      </Button>
    </form>
  );
};

export default FormLogin;
