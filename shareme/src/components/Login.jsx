import GoogleLogin from "react-google-login"
import {useNavigate} from 'react-router-dom'
import {FcGoogle} from "react-icons/fc"
import sharevideo from "../assets/share.mp4"
import Logo from "../assets/logowhite.png"
import { client } from "../client"

const Login = () => {
    const navigate = useNavigate();

    const responseGoogle = (response) => {
        localStorage.setItem('user', JSON.stringify(response.profileObj))
        console.log(response)

        const { name, googleId, imageUrl } = response.profileObj
        
        const doc = {
            _id: googleId,
            _type: 'user',
            userName: name,
            image: imageUrl
        }

        client.createIfNotExists(doc).then(() => {
            console.log('user created')
            navigate('/', { replace: true })
        })
    }

    return (
        <div className="flex justify-start items-center flex-col h-screen">
            <div className="relative w-full h-full">
                <video
                    src={sharevideo}
                    type="video/mp4"
                    loop
                    controls={false}
                    autoPlay
                    muted
                    className="w-full h-full object-cover"
                
                />
                <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
                    <div className="p-5">
                        <img src={Logo} alt="logo" width='138px'/>
                    </div>
                    <div className="shadow-2xl">
                        <GoogleLogin 
                            clientId={process.env.REACT_APP_GOOGLE_CLIENT_TOKEN}
                            render={(renderprops) => (
                                <button type="button" className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                                    onClick={renderprops.onClick}
                                    disabled={renderprops.disabled} 
                                >
                                    <FcGoogle className="mr-4"/>Sign in with Google
                                </button>
                            )}

                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
