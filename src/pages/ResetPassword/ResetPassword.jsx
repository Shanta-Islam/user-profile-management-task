import { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/AuthProvider';


const ResetPassword = () => {
    const { resetPassword, errorMsgToast } = useContext(AuthContext);
    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const password = form.password.value;
        const rePassword = form.repassword.value;

        if (password !== rePassword) {
            toast.error("Your Password Doesn't Match!")
        }
        else {
            resetPassword(password)
                .then(() => {
                    form.reset();
                    toast.success('Password Successfully Updated');
                })
                .catch(error => errorMsgToast(error));
        }
    }
    return (
        <div>
            <div className='container mx-auto py-20 px-2 md:px-5 md:mt-5 mb-5'>
                <div className='md:flex gap-3'>
                    <div className="flex flex-col w-full bg-transparent border-2 rounded-lg border-gray-150 mt-3 md:mt-0 dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex justify-center mx-3 md:py-16 py-2">
                            <div className="container md:w-1/3">
                                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                    <div>
                                        <div className="mb-2 block text-sm text-gray-200 font-semibold">
                                            <span>Your New Passwords</span>
                                        </div>
                                        <input name='password' type="password" placeholder="Enter New Password" className="input input-bordered w-full" required />
                                    </div>
                                    <div>
                                        <div className="mb-2 block text-sm text-gray-200 font-semibold">
                                            <span>Repeat New password</span>
                                        </div>
                                        {/* <TextInput
                                id="repeat-password"
                                type="password"
                                placeholder="Re-Enter New Password"
                                name='repassword'
                                required={false}
                                shadow={true}
                            /> */}
                                        <input name='repassword' type="password" placeholder="Re-Enter New Password" className="input input-bordered w-full" />
                                    </div>
                                    <button type='submit' className='mt-5 btn bg-white'>Change Password</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    );
};

export default ResetPassword;