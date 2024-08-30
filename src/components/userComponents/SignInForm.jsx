import { useState } from "react";
import { Link } from "react-router-dom"; 
import Logo from '../../assets/logo.png'

import { hashDataWithSaltRounds, storeToken } from "../../util/security";
import { getSignInDetails, signInUser } from "../../service/users";

import './SignInForm.css'


function SignInForm() {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    
    async function handleSubmit(event){
        try {
            event.preventDefault(); 

            if (!email) setEmailError("Email can't be blank");
            if (!password) setPasswordError("Password can't be blank");

            const formData = { email, password };

            const signInDetails = await getSignInDetails(formData.email); 

            const hashedPassword = hashDataWithSaltRounds(
                formData.password, 
                signInDetails.salt,
                signInDetails.iterations
            );
            formData.password = hashedPassword;
            console.log(formData)

            const token = await signInUser(formData)
            storeToken(token)

            //redirect to home once user is logged in
            window.location.href = `/home`;


            } catch (error) {
                console.log(error)
        }
    }

    return (
        <div className="container">
            <Link to="/signup">
            <img src={Logo} alt="Logo" className="logo" />
            </Link>
            <h2 style={{ 
                fontSize: '2rem', 
                fontWeight: 'bold', 
                marginBottom: '2rem', 
                textAlign: 'center' }}
                >Sign In</h2>
            
            <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.5rem' }}>
                <label 
                htmlFor="email" 
                className="form-label" 
                style={{ display: 'block', marginBottom: '0.5rem' }}
                >Email</label>
                <input
                type="email"
                id="email"
                className={`input ${emailError ? "input-error" : ""}`}
                value={email}
                onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
                }}
                style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }}
                />

                {emailError && 
                <div className="error"
                style={{ color: 'red', marginTop: '0.25rem' }}
                >{emailError}</div>}
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
                <label 
                htmlFor="password" 
                className="form-label"
                style={{ display: 'block', marginBottom: '0.5rem' }}
                >Password</label>
                <input
                type="password"
                id="password"
                className={`input ${passwordError ? "input-error" : ""}`}
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError("");
                }}
                style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }}
                />

                {passwordError && 
                <div className="error"
                style={{ color: 'red', marginTop: '0.25rem' }}
                >{passwordError}</div>}
            </div>
            
            <p>Don&apos;t have an account? {" "}
                <a href="/signup" style={{ color: "blue" }}>
                Sign up
                </a>
            </p>

            <button type="submit" style={{ marginTop: '1rem' }}>Continue</button>

            </form>
        </div>
    )
}

export default SignInForm; 