import axios from "axios";
import { config } from "../../../config";
import { v4 as uuidv4 } from "uuid";

interface IUser{
        _id:string | null;
        username:string | null;
        email:string | null
}

const signup = async({username, email, password}:{username:string; email:string; password:string})=>{
    try {

        const data = await axios.post(`${config.backendUrl}/api/v1/users/signup`, {username, email, password});
        return data.data.data;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

const signin = async({email, password}:{email:string; password:string})=>{
    try {

        const data = await axios.post(`${config.backendUrl}/api/v1/users/signin`, {email, password});
        
        return data.data.data;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getUserDataByToken = async(token:string)=>{
    try {
        const res = await axios.get(`${config.backendUrl}/users/user/data`, {
            headers:{
                Authorization:token
            }
        });
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getExperiences = async({pageParam}:{pageParam:number})=>{
    try {
        const res = await axios.get(`${config.backendUrl}/api/v1/experiences/limit/experiences?page=${pageParam}&limit=6`);
        return res.data?.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getExperienceById = async({id}:{id:string})=>{
    try {
        const res = await axios.get(`${config.backendUrl}/api/v1/experiences/${id}`);
        return res.data?.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const validatePromo = async({token, offerCode, experienceId}:{token:string; offerCode:string; experienceId:string})=>{
    try {
        const res = await axios.post(`${config.backendUrl}/api/v1/experiences/promo/validate`, {offerCode, experienceId}, {
            headers:{
                Authorization:token
            }
        });
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const payNow = async({token, amount, user, experienceId, date, timings}:{token:string, amount:number, user:IUser, experienceId:string, date:Date, timings:string}):Promise<string>=>{
    amount = amount*100; 
    try {
        const receipt = "receipt_" + uuidv4().substring(0, 31);
        const response = await axios.post(`${config.backendUrl}/api/v1/experiences/payment/order`, {
            amount,
            currency:"INR",
            receipt,
            experienceId,
            date,
            timings,
            notes:{}
        }, {
            headers:{
                "Content-Type":"application/json",
                "Authorization": token
            }
        });

        const order = response.data?.data?.order;
         return new Promise<string>((resolve, reject) => {
            const checkRazorpay = () => {
                if (window.Razorpay) {
                    const options = {
                        key: config.razorPayApiKeyId,
                        amount: amount, // Remove template literal, just use number
                        currency: 'INR',
                        name: 'Test Corp',
                        description: 'Test Transaction',
                        order_id: order?.id,
                        handler: async(response: {
                            razorpay_payment_id: string;
                            razorpay_order_id: string;
                            razorpay_signature: string;
                        }) => {
                            try {
                                const res = await axios.post(
                                    `${config.backendUrl}/api/v1/experiences/order/validate`, 
                                    {...response}, 
                                    { headers: { "Content-Type":"application/json", "Authorization":token }}
                                );
                                
                                if(!res.data.success){
                                    reject(new Error("Invalid payment"));
                                    return;
                                }

                                await axios.post(
                                    `${config.backendUrl}/api/v1/experiences/bookings`, 
                                    {experienceId, date, timings}, 
                                    { headers: { Authorization:token }}
                                );
                                
                                resolve(experienceId); // Resolves the Promise
                            } catch (error) {
                                reject(error); // Rejects the Promise
                            }
                        },
                        prefill: {
                            name: user.username,
                            email: user.email,
                            contact: ""
                        },
                        theme: {
                            color: '#F37254'
                        },
                        modal: {
                            ondismiss: () => {
                                reject(new Error("Payment cancelled"));
                            }
                        }
                    };

                    const rzp = new window.Razorpay(options);
                    
                    rzp.on("payment.failed", () => {
                        reject(new Error("Payment failed"));
                    });
                    
                    rzp.open();
                } else {
                    setTimeout(checkRazorpay, 100);
                }
            };

            checkRazorpay();
        });
    } catch (error) {
        console.error(error);
        throw error;   
    }
}

const createBooking = async({ experienceId, date, timings, token, amount, user }:{ experienceId:string, date:Date, timings:string, token:string, amount:number, user:IUser}):Promise<string>=>{
    try {
        const res = await payNow({token, amount, user, experienceId, date, timings});
        return res;
    } catch (error) {
        console.log(error);
        return "";
        
    }
}

const getSearchData = async(searchVal:string)=>{
    try {
        if(!searchVal) return;
        const res = await axios.get(`${config.backendUrl}/api/v1/experiences/search/all?search=${searchVal}`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw error;        
    }
}

const adminSignin = async({email, password}:{email:string, password:string})=>{
    try {
        const res = await axios.post(`${config.backendUrl}/api/v1/admins/signin`, {email, password});
        return res.data?.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getAllExperiences = async()=>{
    try {
        const res = await axios.get(`${config.backendUrl}/api/v1/experiences`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const createExperience = async(data:{title:string; description:string; price:number; place:string; bookingData:string; offerCode:string; date:string; pic:File; token:string; offerPercent:number})=>{
    try {
        const res = await axios.post(`${config.backendUrl}/api/v1/experiences/create`, data, {headers:{
            "Content-Type":"multipart/form-data",
            "Authorization":data.token,
        }});
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const deleteExperience = async(data:{token:string; id:string})=>{
    try {
        const res = await axios.delete(`${config.backendUrl}/api/v1/experiences/delete/${data.id}`, {
            headers:{
                "Authorization":data.token,
            }
        });
        return res.data?.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const updateExperience = async(data:{title:string; description:string; price:number; place:string; bookingData:string; offerCode:string; date:string; pic:File | null; token:string; offerPercent:number; _id:string})=>{
    try {
        const res = await axios.patch(`${config.backendUrl}/api/v1/experiences/update/${data._id}`, data, {headers:{
            "Authorization":data.token,
            "Content-Type":"multipart/form-data"
        }});
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getUserPurchases = async({token}:{token:string})=>{
    try {
        const res = await axios.get(`${config.backendUrl}/api/v1/users/user/purchases`, {headers:{
            "Authorization":token,
        }});
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export {
    signup, 
    signin,
    getUserDataByToken,
    getExperiences,
    getExperienceById,
    validatePromo,
    createBooking,
    getSearchData,
    adminSignin,
    getAllExperiences,
    createExperience,
    deleteExperience,
    updateExperience,
    getUserPurchases
}