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

    setErrorState({
        ...errorState, [evt.target.name]: evt.target.value === ""
    })
};


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
        
        window.location.href = "/";
    } catch (error) {
        console.log(error)
    }
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
                    <label>Email</label>
                    <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className={`input ${errorState.lastName ? "input-error" : ""}`}
                    onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input 
                    type="password"
                    id="password"
                    name="password"
                    className={`input ${errorState.password ? "input-error" : ""}`}
                    onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Confirm Password</label>
                    <input 
                    type="password"
                    id="confirm"
                    name="confirm"
                    className={`input ${errorState.confirm ? "input-error" : ""}`}
                    onChange={handleChange}
                    />
                </div>

            </div>

            <button type="submit" disabled={disable}>
            Sign Up
            </button>

        </form>
    </div>
)};

export default SignUpForm; 