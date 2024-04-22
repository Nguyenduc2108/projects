import React from "react";
import facebook from "../../assets/images/facebook.png";
import google from "../../assets/images/google.png";

const Login = () => {
    const handleLogin = (e) => {
        e.preventDefault();
        window.open("http://localhost:5000/api/auth/google", "_self");
    };

    const handleLoginFacebook = (e) => {
        e.preventDefault();
        window.open("http://localhost:5000/api/auth/facebook", "_self");
    };

    return (
        <div className="flex flex-col gap-8 items-center justify-center mt-[90px]">
            <h1 className="text-[40px] font-semibold">Đăng nhập</h1>
            <div>
                <form
                    action=""
                    className="w-[400px] max-w-[100%] bg-white rounded-md p-4"
                >
                    <h2 className="text-main-500 text-[24px] text-center mb-4">
                        Đăng nhập
                    </h2>
                    <input
                        type="text"
                        placeholder="Email/Số điện thoại/Tên đăng nhập"
                        className="w-full p-3 border border-gray-500 mb-6"
                    />
                    <input
                        type="password"
                        placeholder="Mật khẩu"
                        className="w-full p-3 border border-gray-500 mb-8"
                    />

                    <button
                        type="button"
                        className="w-full p-3 mb-4 bg-main-500 hover:opacity-90 text-white rounded-sm"
                    >
                        ĐĂNG NHẬP
                    </button>
                    <div className="flex justify-between text-sm text-blue-400">
                        <span className="">Quên mật khẩu</span>
                        <span>Đăng nhập với SMS</span>
                    </div>

                    <div className=" mt-4 h-[1px] w-full bg-gray-500 relative">
                        <span className="absolute top-[50%] right-[38%] text-sm  translate-x-[-50%] translate-y-[-50%] text-gray-500 p-1 bg-white">
                            HOẶC
                        </span>
                    </div>

                    <div className="flex justify-between gap-2 mt-4 ">
                        <button
                            className="flex justify-center items-center bg-[#E6E6E6] flex-1 p-2 rounded-sm"
                            onClick={handleLoginFacebook}
                        >
                            <img
                                src={facebook}
                                alt="facebook"
                                className="w-[22px] h-[22px] "
                            />
                            <span>Facebook</span>
                        </button>
                        <button
                            className="flex justify-center items-center bg-[#E6E6E6] flex-1 p-2 rounded-sm"
                            onClick={handleLogin}
                        >
                            <img
                                src={google}
                                alt="google"
                                className="w-[22px] h-[22px]"
                            />
                            Google
                        </button>
                    </div>

                    <p className="mt-4 text-gray-400 text-center">
                        Bạn mới biết đến Zingmp3-Clone?{" "}
                        <span type="button" className="text-main-500">
                            Đăng ký
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
