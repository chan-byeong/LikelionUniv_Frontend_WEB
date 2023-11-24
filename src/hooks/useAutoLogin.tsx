import axios from 'axios'
import { userState } from '../store/auth'
import { useRecoilState } from 'recoil'
import { requestUserInfo } from '../apis/auth/auth'
import { useEffect } from 'react'

export const useAutoLogin = () =>{
    const [userInfo , updateUserInfo] = useRecoilState(userState);
    const token = localStorage.getItem('access-token');
    
    useEffect(()=>{
        const fetchUser =async () => {
            if(token){
                const userInfo = await requestUserInfo();
                console.log(userInfo);
                updateUserInfo(userInfo);
            }
        }
        fetchUser();
    },[])
}