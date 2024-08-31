import { getToken, getUserIdFromToken } from "../util/security";

const BASE_URL = "http://localhost:3000/adventure"; 

export async function getAllAdventures() {
    const createURL = `${BASE_URL}`;
    const res = await fetch(createURL);
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Failed to fetch adventures");
    }
  }

  export async function getUserAdventures (userId) {
    try {
      const response = await fetch (`${BASE_URL}/${userId}`)
      
      if (!response.ok) {
        throw new Error("Failed to fetch adventure")
      }
  
      const res = await response.json();
      const adventuresData = res.profile[0]
      console.log("API getUserAdventures adventureData: ", adventuresData)
      return adventuresData; 
    } catch (error) {
      console.error("Error fetching adventures data:", error);
      throw error; 
    }
  }

  export async function updateAdventure(adventureData) {
    try {
      const token = getToken();
      const user = getUserIdFromToken();
      const adventure_id = adventureData.adventure_id;
      // console.log("adventure_id: ", adventureData.adventure_id)
      console.log("api/adventure/updateAdventure:", adventureData)
      const updateURL = `${BASE_URL}/${adventure_id}`;
      console.log(updateURL); 
    
      console.log("API updateAdventure body: ",{ ...adventureData, user_id: user, adventure_id: adventure_id })
      const res = await fetch (updateURL, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }, 
        body: JSON.stringify({ ...adventureData, user_id: user, adventure_id: adventure_id }), 
      })
  
      // console.log("api/adventure/updateAdventure PATCH Response:", res)
  
      if (res.ok) {
        return res.json();
      } else {
        throw new Error ("invalid adventure update")
      }
    } catch (error) {
      console.error("error updating adventure:", error)
      throw error; 
    }
  }

  export async function createAdventure(adventureData) {
    try {
      const token = getToken();
      const user = getUserIdFromToken();
  
      console.log("body: ",{ ...adventureData, user_id: user })
  
      const createURL = `${BASE_URL}/`;
      // console.log("Create URL:", createURL);
  
      const res = await fetch(createURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...adventureData, user_id: user }), 
      });
  
      // console.log("api/job/createAdventure POST Response:", res);
  
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Invalid adventure creation");
      }
    } catch (error) {
      console.error("Error creating adventure:", error);
      throw error;
    }
  }