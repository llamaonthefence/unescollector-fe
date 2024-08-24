import { Link } from "react-router-dom";
import Logo from '../../assets/logo-placeholder.png'
import { useState } from "react";
import { hashData } from "../../util/security";
import { signUp } from "../../api/users";

function SignUpForm() {

const [errorState, setErrorState] = useState({})
const [formState, setFormState] = useState({})
const [disable, setDisable] = useState(true)

function handleChange(evt) {
    var currForm = {...formState}
    currForm[evt.target.name] = evt.target.value
    setDisable(checkPassword());
    setFormState(currForm); 

//field validation
    setErrorState({
        ...errorState, [evt.target.name]: evt.target.value === ""
    })
};

//check password & confirm password are the same
function checkPassword() {
    var currForm = formState;
    if (!currForm.password) {
        return true
    }
    if (!currForm.confirm) {
        return true; 
    }
    if (currForm.password !== currForm.confirm) {
        console.log(currForm.password);
        console.log(currForm.confirm)
        return true; 
    }
    return false; 
}

function hashPassword() {
    var currForm = formState;
    if (currForm.password) {
        //console.log(currForm.password)
        var hash = hashData(currForm.password);
        currForm.password = hash.hash; 
        currForm.salt = hash.salt; 
        currForm.iterations = hash.iterations; 
    }
}

async function handleSubmit(evt) {
    try {
        evt.preventDefault(); 
        hashPassword(); 
        const formData = { ... formState };
        delete formData.error; 
        delete formData.confirm; 

        const user = await signUp(formData);
        console.log(user);
        
        window.location.href = "/signin";
    } catch (error) {
        console.log(error)
    }
    console.log('Form submitted'); // Log form submission
}



return (
    <div className="signup-form">
        <Link to="/SignUp">
            <img src={Logo} alt="Logo" className="logo"></img>
        </Link>
        <h2>Create an Account</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <div>
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                    type="email"
                    id="email"
                    name="email"
                    className={`input ${errorState.email ? "input-error" : ""}`}
                    onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="password" className="form-label">Password</label>
                    <input 
                    type="password"
                    id="password"
                    name="password"
                    className={`input ${errorState.password ? "input-error" : ""}`}
                    onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="confirm" className="form-label">Confirm Password</label>
                    <input 
                    type="password"
                    id="confirm"
                    name="confirm"
                    className={`input ${errorState.confirm ? "input-error" : ""}`}
                    onChange={handleChange}
                    />
                </div>

            </div>

            <button type="submit" disabled={false}>
            Sign Up
            </button>

            <p>
            Already have an account?{" "}
            <a href="/signin" style={{ color: "blue" }}>
            Sign in
            </a>
            .
            </p>

        </form>
    </div>
)};

export default SignUpForm; 