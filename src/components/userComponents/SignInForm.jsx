import { useState } from "react";
import { Link } from '@chakra-ui/react'; 
import Logo from '../../assets/logo-placeholder.png'

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
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <Link to="/">
            <img src={Logo} alt="Logo" className="logo" />
            </Link>
            <h2>Sign In</h2>
            <form>
                <label htmlFor="email" className="form-label">Email</label>
                <input
                type="email"
                id="email"
                className={`input ${emailError ? "input-error" : ""}`}
                value={email}
                onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
                }}
                />
            {emailError && <div className="error">{emailError}</div>}

                <label htmlFor="password" className="form-label">Password</label>
                <input
                type="password"
                id="password"
                className={`input ${passwordError ? "input-error" : ""}`}
                value={password}
                onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
                }}
                />
            {passwordError && <div className="error">{passwordError}</div>}

            <p>Don&apos;t have an account? {" "}
                <a href="/signup" style={{ color: "blue" }}>
                Sign up
                </a>
            </p>

            <button type="submit">Continue</button>

            </form>
        </div>
    )
}

export default SignInForm; 