import {useEffect , useState} from 'react';
import { useParams , useNavigate } from 'react-router-dom';
import { userState } from '../../store/auth';
import { useSetRecoilState } from 'recoil';
import {requestIdtoken , requestLogin ,requestUserInfo} from '../../apis/auth/auth';
import axios from 'axios';

export const Redirect = () =>{
    const navigate = useNavigate();
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get('code');
    const {provider} = useParams();
    const updateUserState = useSetRecoilState(userState);

    useEffect( () => {
        const socialLogin = async () => {

            const idtoken = await requestIdtoken(authorizationCode , provider);
            console.log(idtoken , typeof(idtoken))
            const isUser = await requestLogin(provider,idtoken);
            
            const userInfo = await requestUserInfo();
            updateUserState(userInfo);
            console.log(userInfo);
            
            isUser ? navigate("/") : navigate(`/signup/${provider}`)
        }

        socialLogin();


        /*
        const requestLogin = async () => {
            try{
                const url = new URL(window.location.href);
                const authorizationCode = url.searchParams.get('code');
                let idtoken;
                // idToken 요청 API
                const res1 = await axios.get(`${process.env.REACT_APP_BASE_URL}/v1/auth/${provider}/idtoken?code=${authorizationCode}`,
                {
                    withCredentials: true,
                })
  
                if(res1.data.isSuccess){
                    idtoken = res1.data.data.idToken;
                    localStorage.setItem('idtoken', idtoken);
                }
                
                
                // login 요청 API
                const res2 = await axios.post(`${process.env.REACT_APP_BASE_URL}/v1/auth/${provider}/login?idtoken=${idtoken}`,{
                    withCredentials: true,
                })
                console.log(res2.data.data)
                const isUser = res2.data.data.isRegistered;
                console.log(isUser)

                if(isUser){
                    const {accessToken , refreshToken} = res2.data.data;
                    console.log(accessToken , refreshToken)

                    const payload = accessToken.split('.')[1];
                    const decodedPayload = atob(payload);
                    const jsonPayload = JSON.parse(decodedPayload);
                    const expirationTime = new Date(jsonPayload.exp * 1000);

                    console.log('Expiration Time: ', expirationTime);

                    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
                    
                    axios.get(`${process.env.REACT_APP_BASE_URL}/v1/auth/userinfo`,{
                        withCredentials: true,
                    })
                    .then(res => console.log(res))
                    // navigate("/");
                }
                else{
                    navigate(`/signup/${provider}`);
                }

            }
            catch (error) {
                alert("로그인 실패. 인터넷 연결 확인")
                console.log(error)
                // navigate("/")
                // navigate(`/signup/${provider}`)
            }
        }

        requestLogin();
        */
    },[]);

    return (
    <div>
    Redirect,    Redirect    Redirect
    </div>
    )
}