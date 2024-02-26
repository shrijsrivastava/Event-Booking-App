import React from 'react'
import './Login.css'
import SignIn from "../SignIn/SignIn";
// import SignUp from "../SignUp/SignUp";
function LoginScreen() {

    return (
        <div className='block'>
            <div className='flex-container'>
                <div className="flex-item1">
                    {/* <div >1 of 1</div> */}
                </div>
                <div className="flex-item2">
                    <div className='datafields'>
                        <SignIn />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginScreen