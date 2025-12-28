interface IConfig{
    backendUrl:string;
    frontendUrl:string;
    razorPayApiKeyId:string;
    razorPayApiSecret:string;
}

export const config:IConfig = {
    backendUrl: new String(import.meta.env.VITE_BACKEND_URL).toString(),
    frontendUrl: new String(import.meta.env.VITE_FRONTEND_URL).toString(),
    razorPayApiKeyId: new String(import.meta.env.VITE_RAZORPAY_KEY_ID).toString(),
    razorPayApiSecret: new String(import.meta.env.VITE_RAZORPAY_SECRET).toString(),
}