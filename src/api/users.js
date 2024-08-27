const BASE_URL = "http://localhost:3000/users"

export async function signUp(userData) {
    const res = await fetch(BASE_URL + "/signup", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(userData)
    });
    if(res.ok) {
        return res.json();
    } else {
        throw new Error("Invalid Sign Up")
    }}; 

export async function getSignInDetails(email) {
    const searchParams = new URLSearchParams({"email": email})
    const getSignInDetailsURL = BASE_URL + '/signin?' + searchParams; 
    const res = await fetch(getSignInDetailsURL, {
        method: "GET", 
        headers: {"Content-Type": "application/json"}, 
    });
    if (res.ok) {
        console.log(res)
        return res.json(); 
    } else {
        throw new Error("Invalid user"); 
    }
}

export async function storeToken(userData) {
    const createURL = BASE_URL + '/storetoken';
    console.log(createURL)
    const res = await fetch(createURL, {
        method: "POST",
        headers: { "Content-Tpye": "application/json" }, 
        body: JSON.stringify(userData)
    })
    if (res.ok) {
        console.log(res)
        return res.json();
    } else {
        throw new Error("Invalid token")
    }
}

export async function signInUser(userData) {
    const signInURL = BASE_URL + '/signin'; 
    console.log(signInURL);
    const res = await fetch(signInURL, {
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify(userData)
    })
    if (res.ok) {
        console.log(res)
        return res.json(); 
    } else {
        throw new Error("Invalid sign in")
    }
}

export async function checkSignIn(token) {
    const signInURL = BASE_URL + '/checksignin'; 
    console.log(signInURL); 
    const res = await fetch(signInURL, {
        method: "POST", 
        headers: { "Content-Type": "application/json", "Authorization": token}
    })
    if (res.ok) {
        console.log(res)
        return res.json()
    } else {
        throw new Error ("Invalid sign in")
    }
}

export async function checkPermission(token) {
    const signInURL = BASE_URL + '/checkpermission'; 
    console.log(signInURL); 
    const res = await fetch(signInURL, {
        method: "POST", 
        headers: { "Content-Type": "application/json", "Authorization": token }
    })
    if (res.ok) {
        console.log(res)
        return res.json()
    } else {
        throw new Error("Invalid sign in")
    }
}

export async function signOutUser(token, userData) {
    const signOutURL = BASE_URL + '/signout';
    console.log(signOutURL); 
    const res = await fetch (signOutURL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": token},
        body: JSON.stringify(userData)
    })
    if (res.ok) {
        console.log(res)
        return res.json()
    } else {
        throw new Error ("Invalid sign out.")
    }
}

export async function getUserDetails(userId) {
    try {
        const url = `${BASE_URL}/${userId}`

        const res = await fetch(url, {
            method: "GET",
            headers: { 'Content-Type': 'application/json'}
        })

        if (!res.ok) {
            throw new Error(`HTTP error. Status: ${res.status}`)
        }

        const data = await res.json() 
        return data; 

    } catch (error) {
        console.error(`Error fetching user details: ${error.message}`)
        throw error; 
    }
}


//handling 'likes' toggle on 'site' tab
export async function handleLikes(userId, id) {
    try {
        const url = `${BASE_URL}/${userId}/likes`;

        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-type": "aplication/json"}, 
            body: JSON.stringify({id})
        })

        if(!res.ok) {
            throw new Error(`HTTP error. Status: ${res.status}`)
        }

        const data = await res.json(); 
        return data.likes; 
    } catch (error) {
        console.error(`Error handling likes: ${error.message}`);
        throw error; 
    }
}

//handling 'beenTo' toggle on 'site' tab
export async function handleBeenTo(userId, id) {
    try {
        const url = `${BASE_URL}/${userId}/beenTo`;

        const res = await fetch(url, {
            method: "POST", 
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({id})
        })

        if(!res.ok) {
            throw new Error(`HTTP error. Status ${res.status}`)
        }

        const data = await res.json();
        return data.beenTo; 
    } catch (error) {
        console.error(`Error handling beenTo: ${error.message}`);
        throw error
    }
}
