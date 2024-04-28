const db = require("../models");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const loginSuccessService = (id, tokenLogin) =>
    new Promise(async (resolve, reject) => {
        try {
            const newTokenLogin = uuidv4();
            let response = await db.User.findOne({
                where: { id, tokenLogin },
                raw: true,
            });

            const token =
                response &&
                jwt.sign(
                    {
                        id: response.id,
                        email: response.email,
                        role: response.role,
                    },
                    "vanduc",
                    { expiresIn: "5d" }
                );
            resolve({
                err: token ? 0 : 3,
                msg: token ? "OK" : "User not found or fail to login!",
                token,
            });

            if (response) {
                await db.User.update(
                    {
                        tokenLogin: newTokenLogin,
                    },
                    {
                        where: { id },
                    }
                );
            }
        } catch (error) {
            reject({
                err: 2,
                msg: "Fail at auth services" + error,
            });
        }
    });

module.exports = {
    loginSuccessService,
};

const bcrypt = require("bcrypt");

const registerService = async (email, password) => {
    // Kiểm tra xem người dùng đã tồn tại chưa
    try {
        let user = await db.User.findOne({ where: { email } });

        if (user) {
            throw new Error("Username already exists");
        }

        // Mã hóa mật khẩu
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Tạo người dùng mới
        user = await db.User.create({
            email,
            password: hashedPassword,
        });

        user = await user.save();
        resolve(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

    return user;
};

const register = async (data) => {
    // Tạo tài khoản mới trong cơ sở dữ liệu ở đây
    // Giả sử bạn có một model User
    const user = new db.User(data);
    await user.save();

    return { success: true };
};

module.exports = {
    registerService,
    register,
};
