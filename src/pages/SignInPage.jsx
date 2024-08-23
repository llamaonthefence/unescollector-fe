import SignInForm from '../components/userComponents/SignInForm'

function SignInPage() {
    return (
        <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
        >
        <SignInForm />
        <p style={{ marginTop: "0" }}>
        Need help? Contact us at{" "}
        <a
          href="mailto:unescollector@gmail.com"
          style={{ color: "blue", textDecoration: "underline" }}
        >
          unescollector@gmail.com
        </a>
      </p>

    </div>
    )
}

export default SignInPage;