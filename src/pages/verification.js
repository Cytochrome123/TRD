import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const EmailVerification = () => {
    const [verificationStatus, setVerificationStatus] = useState('verifying');
    // const { code, email } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const code = queryParams.get('code');
    const email = queryParams.get('email');

    const ref = useRef(true);
    
    useEffect(() => {
        if(ref.current) {
            verifyEmailToken();
        };

        return () => (ref.current = false);
    }, []);

    const navigate = useNavigate();
    console.log(email, code)
    const verifyEmailToken = async () => {
        try {
            const response = await axios({
                method: 'get',
                url: `${process.env.REACT_APP_SERVERURL}/auth/verify?code=${code}&email=${email}`,
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            console.log(response);

            if (response.data.success) {
                setVerificationStatus('success');
                setTimeout(() => {
                    navigate('/auth/signin');
                }, 2000);
            } else {
                setVerificationStatus('failure');
            }
        } catch (error) {
            console.error('Error verifying email:', error);
            setVerificationStatus('failure');
        }
    };

    return (
        <div className="h-screen px-8 py-8 pb-20 my-10 lg:px-16 xl:px-20">
            <div className="email-verification-page flex flex-col justify-center align-center text-center p-20">
                {verificationStatus === 'verifying' && <p className='text-[20px] my-10'>Verifying your email...</p>}
                {verificationStatus === 'success' && <p className='text-[20px] my-10'>✅Your email has been successfully verified!, you'll be redirected to continue..</p>}
                {verificationStatus === 'failure' && <p className='text-[20px] my-10'>Failed to verify your email. Please try again or contact support.</p>}
            </div>

        </div>
    );
};

export default EmailVerification;
