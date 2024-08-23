import SignUpForm from "../components/userComponents/SignUpForm";

function SignUpPage() {
    return(
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <SignUpForm />
    <p style={{ marginTop: '0' }}>Need help? Contact us at 
        <a href="mailto:unescollector@gmail.com" style={{ color: 'blue', textDecoration: 'underline' }}>
        unescollector@gmail.com</a></p>
  </div>
    )
}

export default SignUpPage; 