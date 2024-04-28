import React, { useState } from "react";
import facebook from "../../assets/images/facebook.png";
import google from "../../assets/images/google.png";
import { toast } from "react-toastify";
import { register } from "../../apis/authService";

const initFormValue = {
    email: "",
    password: "",
    confirmPassword: "",
};

const isEmptyValue = (value) => {
    return !value || value.trim().length === 0;
};

const isValidateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const Register = () => {
    const [formValue, setFormValue] = useState(initFormValue);
    const [formError, setFormError] = useState({});

    const validateForm = () => {
        const error = {};

        if (isEmptyValue(formValue.email)) {
            error["email"] = "Email không được để trống";
        } else if (!isValidateEmail(formValue.email)) {
            error["email"] = "Email không hợp lệ";
        }

        if (isEmptyValue(formValue.password)) {
            error["password"] = "Mật khẩu không được để trống";
        }

        if (isEmptyValue(formValue.confirmPassword)) {
            error["confirmPassword"] = "Nhập lại mật khẩu không được để trống";
        } else if (formValue.password !== formValue.confirmPassword) {
            error["confirmPassword"] = "Nhập lại mật khẩu không khớp";
        }

        setFormError(error);

        return Object.keys(error).length === 0;
    };

    const handleChange = (e) => {
        const { value, name } = e.target;
        setFormValue({
            ...formValue,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await register(formValue);

        if (validateForm() || response.data.success) {
            console.log(formValue);
            // Switch back to /login
            toast.success("Đăng ký thành công");
            window.location.href = "/login";
        } else {
            console.log("Form is invalid");
        }
    };

    return (
        <div className="flex flex-col gap-8 items-center justify-center mt-[90px]">
            <h1 className="text-[40px] font-semibold">Đăng ký</h1>
            <div>
                <form
                    onSubmit={handleSubmit}
                    action=""
                    className="w-[400px] max-w-[100%] bg-white rounded-md p-4"
                >
                    <h2 className="text-main-500 text-[24px] text-center mb-4">
                        Đăng ký
                    </h2>
                    <div>
                        <input
                            className="w-full p-3 border border-gray-500 "
                            type="text"
                            name="email"
                            value={formValue.email}
                            placeholder="Email"
                            onChange={handleChange}
                        />
                        {formError.email && (
                            <p className="text-red-500 text-sm">
                                {formError.email}
                            </p>
                        )}
                    </div>
                    <div>
                        <input
                            className="w-full p-3 border border-gray-500 mt-6"
                            type="password"
                            name="password"
                            value={formValue.password}
                            placeholder="Mật khẩu"
                            onChange={handleChange}
                        />
                        {formError.password && (
                            <p className="text-red-500 text-sm">
                                {formError.password}
                            </p>
                        )}
                    </div>
                    <div>
                        <input
                            className="w-full p-3 border border-gray-500 mt-6"
                            type="password"
                            name="confirmPassword"
                            value={formValue.confirmPassword}
                            placeholder="Nhập lại mật khẩu"
                            onChange={handleChange}
                        />
                        {formError.confirmPassword && (
                            <p className="text-red-500 text-sm">
                                {formError.confirmPassword}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full p-3 mb-4 mt-8 bg-main-500 hover:opacity-90 text-white rounded-sm"
                    >
                        ĐĂNG KÝ
                    </button>
                    <div className="flex justify-between text-sm text-blue-400">
                        <span>Đăng nhập với SMS</span>
                    </div>

                    <div className=" mt-4 h-[1px] w-full bg-gray-500 relative">
                        <span className="absolute top-[50%] right-[38%] text-sm  translate-x-[-50%] translate-y-[-50%] text-gray-500 p-1 bg-white">
                            HOẶC
                        </span>
                    </div>

                    <div className="flex justify-between gap-2 mt-4 ">
                        <button className="flex justify-center items-center bg-[#E6E6E6] flex-1 p-2 rounded-sm">
                            <img
                                src={facebook}
                                alt="facebook"
                                className="w-[22px] h-[22px] "
                            />
                            <span>Facebook</span>
                        </button>
                        <button className="flex justify-center items-center bg-[#E6E6E6] flex-1 p-2 rounded-sm">
                            <img
                                src={google}
                                alt="google"
                                className="w-[22px] h-[22px]   "
                            />
                            <span>Google</span>
                        </button>
                    </div>

                    <p className="mt-4 text-gray-400 text-center">
                        Bạn đã có tài khoản Zingmp3-Clone?
                        <span type="button" className="text-main-500">
                            Đăng nhập
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
