import axios from "axios";
import { serverAxiosInstance } from "./config";


export const publicKey = 'public_HAj4maBfdhx6eWVrMDujqUTbRSw=';
export const urlEndpoint = 'https://ik.imagekit.io/PST01/TSA-users';

const authenticator = async () => {
    try {
        let data;
        await serverAxiosInstance.get('/user/auth/imagekit').then((res) => {
            console.log("ImageKit Auth Data: ", res.data);
            data = res.data;
            // return res.data;
        }).catch((err) => {
            if (err.status === 401) {
                localStorage.removeItem("TSAUser");
                window.location.href = "/login";
            }
            console.log("Error: ", err);
            return err;
        });
        const { signature, expire, token } = data.authData;
        return { signature, expire, token };
    } catch (error) {
        throw new Error(`Authentication request failed: ${error.message}`);
    }
};

export const getUploadedImageUrl = async (file, customName) => {
    const { signature, expire, token } = await authenticator();

    const formData = new FormData();
    formData.append("file", file); // File, Blob, or base64
    formData.append("fileName", `${customName}.${file.name.split('.').pop()}`); // File name
    formData.append("publicKey", publicKey);
    formData.append("signature", signature);
    formData.append("expire", expire);
    formData.append("token", token);
    formData.append("useUniqueFileName", "false"); // Use unique file name
    formData.append("overwriteFile", "true"); // Overwrite file if it exists
    formData.append("isImage", "true"); // Specify if the file is an image
    formData.append("folder", "/tsausers");

    const uploadResponse = await axios.post("https://upload.imagekit.io/api/v1/files/upload", formData);

    const { data } = uploadResponse;
    console.log("Upload Response URL: ", data.url);
    const url = `${data.url}?${new Date().getTime()}`;
    return url;
};

export default authenticator;