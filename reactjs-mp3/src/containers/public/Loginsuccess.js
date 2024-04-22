import React, { useEffect } from "react";
import { loginSuccess } from "../../store/actions/authAction";
import { useParams, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Loginsuccess = () => {
    const { userId, tokenLogin } = useParams();
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(loginSuccess(userId, tokenLogin));
    }, []);

    return (
        <div>
            {isLoggedIn ? (
                <Navigate to={"/"} replace={true} />
            ) : (
                <h3 className="text-[40px] text-red-500 flex justify-center items-center mt-[30%]">
                    Vui lòng đăng nhập!
                </h3>
            )}
        </div>
    );
};

export default Loginsuccess;
