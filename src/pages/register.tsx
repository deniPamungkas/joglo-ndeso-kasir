import { useFormik } from 'formik';
import { useState } from 'react'
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from '../components/atom/button';
import axios from 'axios';

const Register = () => {
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(null);

    //handle form validation register
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: async () => { },
        validationSchema: yup.object().shape({
            username: yup
                .string()
                .matches(/^[^\s]{3,15}$/)
                .required(),
            email: yup.string().email().required(),
            password: yup
                .string()
                .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
                .required(),
        }),
    });
    const handleChangeForm = (e) => {
        formik.setFieldValue(e.target.name, e.target.value);
    };
    //handle hit API register
    const handleRegister = async (e) => {
        e.preventDefault();
        if (
            formik.errors.email ||
            formik.errors.password
        ) {
            console.log("first");
        } else {
            try {
                setLoading(true);
                setErr(null);
                const response = await axios.post(
                    "http://localhost:5500/auth/v1/signUp",
                    formik.values
                );
                toast.success("Berhasil membuat akun ! Silahkan verifikasi melalui email yang terkirim ke email anda!", {
                    position: 'top-right',
                    draggable: true
                });
                console.log(response)
                return response;
            } catch (error) {
                setLoading(true);
                setErr(error.response.data);
                setTimeout(() => {
                    setErr(null);
                }, 100);
            } finally {
                setLoading(false);
            }
        }
    };

    //handle error message when register
    err && toast.error(
        `gagal membuat akun! ${err.message}`, {
        position: 'top-right',
        draggable: true
    }
    )
    return (
        <div className="bg-filter w-full h-screen flex justify-center items-center">
            <form
                onSubmit={handleRegister}
                className="w-[90%] md:w-[400px] flex flex-col gap-y-5"
            >
                <h1 className="font-bold text-3xl text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    Register Account
                </h1>
                <div className="flex flex-col gap-y-2">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        placeholder="email"
                        id="email"
                        name="email"
                        className="h-[50px] px-3 rounded-md outline-none"
                        onChange={handleChangeForm}
                        required
                    />
                    {formik.errors.email && (
                        <p className="text-red-700 text-xs">format email harus benar</p>
                    )}
                </div>
                <div className="flex flex-col gap-y-2">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        placeholder="password"
                        id="password"
                        name="password"
                        className="h-[50px] px-3 rounded-md outline-none"
                        onChange={handleChangeForm}
                        required
                    />
                    {formik.errors.password && (
                        <p className="text-red-700 text-xs">
                            password must contain minimum 8 characters, at least one letter
                            and one number
                        </p>
                    )}
                </div>
                <Button type='submit' onClick={() => { }}
                    className={`${loading
                        ? "bg-gray-500"
                        : " bg-gradient-to-r from-purple-400 to-pink-600"
                        } w-full h-[50px] text-white font-semibold rounded-md flex items-center justify-center`}
                >
                    {loading && (
                        <img
                            src={"/images/spinner.png"}
                            className="w-5 h-5 mr-2 animate-spin"
                        />
                    )}
                    Register
                </Button>
                <ToastContainer limit={3} />
                <span className="text-center">
                    Already have an account?{" "}
                    <a
                        href="/"
                        className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500"
                    >
                        Login
                    </a>
                </span>
            </form>
        </div>
    )
}

export default Register