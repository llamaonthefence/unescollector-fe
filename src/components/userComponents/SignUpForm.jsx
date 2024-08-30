import { Link } from "react-router-dom";
import Logo from '../../assets/logo.png'
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
    // setDisable(checkPassword());
    setFormState(currForm); 

//field validation
    setErrorState({
        ...errorState, [evt.target.name]: evt.target.value === ""
    })

    //check if form should be disabled
    setDisable(
        !currForm.email ||
        !currForm.password ||
        !currForm.confirm ||
        checkPassword(currForm.password, currForm.confirm)
    );

};

//check password & confirm password are the same
// function checkPassword() {
//     var currForm = formState;
//     if (!currForm.password) {
//         return true
//     }
//     if (!currForm.confirm) {
//         return true; 
//     }
//     if (currForm.password !== currForm.confirm) {
//         console.log(currForm.password);
//         console.log(currForm.confirm)
//         return true; 
//     }
//     return false; 
// }
function checkPassword(password, confirm) {
    return password !== confirm;
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
    <div className="signup-form" style={{ padding: '1rem', textAlign: 'center' }}>
        <Link to="/SignUp">
            <img src={Logo} alt="Logo" 
            className="logo"
            style={{ height: '6em', padding: '1.5em' }}
            ></img>
        </Link>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>Create an Account</h2>
        <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label 
                    htmlFor="email" 
                    className="form-label"
                    style={{ display: 'block', marginBottom: '0.5rem' }}
                    >Email</label>
                    <input
                    type="email"
                    id="email"
                    name="email"
                    className={`input ${errorState.email ? "input-error" : ""}`}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }}
                    />
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
                    name="password"
                    className={`input ${errorState.password ? "input-error" : ""}`}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }}
                    />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label 
                    htmlFor="confirm" 
                    className="form-label"
                    style={{ display: 'block', marginBottom: '0.5rem' }}
                    >Confirm Password</label>
                    <input 
                    type="password"
                    id="confirm"
                    name="confirm"
                    className={`input ${errorState.confirm ? "input-error" : ""}`}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }}
                    />
                </div>

            </div>

            <button 
            type="submit" disabled={disable}
            style={{ marginTop: '1rem', padding: '0.5rem 1rem', fontSize: '1rem' }}
            >
            Sign Up
            </button>

            <p style={{ marginTop: '1rem' }}>
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