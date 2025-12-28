import {useInfiniteQuery, useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import { adminSignin, createBooking, createExperience, deleteExperience, getAllExperiences, getExperienceById, getExperiences, getSearchData, getUserDataByToken, signin, signup, updateExperience, validatePromo } from ".";
import { KEYS } from "./queryKeys";

interface IUser{
        _id:string | null;
        username:string | null;
        email:string | null
}

export const SignupMutation = ()=>{
    return useMutation({
        mutationFn:(data:{username:string; email:string; password:string})=>{
            return signup(data);
        }
    });
}

export const SigninMutation = ()=>{
    return useMutation({
        mutationFn:(data:{email:string; password:string})=>{
            return signin(data);
        }
    });
}

export const AdminSigninMutation = ()=>{
    return useMutation({
        mutationFn:(data:{email:string; password:string})=>{
            return adminSignin(data);
        }
    });
}

export const BookExperenceMutation = ()=>{
    return useMutation({
        mutationFn:(data:{ experienceId:string, date:Date, timings:string, token:string, amount:number, user:IUser})=>createBooking(data),
    })
}

export const ValidatePromoMutation = ()=>{
    return useMutation({
        mutationFn:(data:{token:string; offerCode:string; experienceId:string})=>{
            return validatePromo(data);
        }
    })
}

export const CreateExperience = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:(data:{title:string; description:string; price:number; place:string; bookingData:string; offerCode:string; date:string; pic:File; token:string, offerPercent:number})=>createExperience(data),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:[KEYS.GET_ALL_EXPERIENCES]});
        }
    });
}

export const DeleteExperience = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:(data:{id:string, token:string})=>deleteExperience(data),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:[KEYS.GET_ALL_EXPERIENCES]});
        }
    });
}

export const UpdateExperience = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:(data:{title:string; description:string; price:number; place:string; bookingData:string; offerCode:string; date:string; pic:File | null; token:string; offerPercent:number; _id:string})=>updateExperience(data),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:[KEYS.GET_ALL_EXPERIENCES]});
        }
    })
}

// Quries
export const GetUserByTokenQuery = (token:string)=>{
    return useQuery({
        queryKey:[KEYS.GET_USER_BY_TOKEN, token],
        queryFn: async()=>{
            const data = await getUserDataByToken(token);
            return data;
        }
    })
} 

export const GetExperiencesByLimit = ()=>{

    return useInfiniteQuery({
        queryKey: [KEYS.GET_EXPERIENCES_BY_LIMIT],
        queryFn: ({pageParam=1})=>getExperiences({pageParam}),
        getNextPageParam: (lastPage) => lastPage.nextPage,
    });
}

export const GetExperienceById = (id:string)=>{
    return useQuery({
        queryKey:[KEYS.GET_EXPERIENCE_BY_ID, id],
        queryFn:()=>getExperienceById({id}),
    })
}

export const GetAllExperiences = ()=>{
    return useQuery({
        queryKey:[KEYS.GET_ALL_EXPERIENCES],
        queryFn:()=>getAllExperiences(),
    })
}

export const GetExperienceBySearchVal = (searchVal:string)=>{
    return useQuery({
        queryKey:[KEYS.GET_EXPERIENCE_BY_SEARCH_VALUE, searchVal],
        queryFn:()=>getSearchData(searchVal),
    })
}