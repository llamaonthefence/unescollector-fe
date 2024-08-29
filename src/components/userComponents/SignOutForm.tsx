import React from "react";
import { Button } from "@chakra-ui/react";

import { signOutUser } from "../../service/users";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../util/security";

const SignOutForm: React.FC = () => {
    const redirect = useNavigate(); 

    const handleSignOut = async () => {
        try {
            const token = getToken(); 
            if (token) {
               await signOutUser(); 
               signOutUser(); 
               redirect('/signin');
            } else {
                console.error('No token found')
            }
        } catch (error) {
            console.error('Sign out unsuccessful:', error)
        }
    }

    return (
        <>
        <Button onClick={handleSignOut}>
            Sign Out
        </Button>
        </>
    )
}

export default SignOutForm; 