import * as adventuresAPI from "../api/adventures";

export async function getAllAdventures() {
    try {
      const adventures = await adventuresAPI.getAllAdventureData();
      return adventures;
    } catch (error) {
      console.error("Error fetching adventures:", error);
      throw error; 
    }
  }
  
  export async function getUserAdventure(listing_id) {
    try {
      const adventure = await adventuresAPI.getAdventure(listing_id);
      console.log("adventure: ", adventure)
      return adventure;
    } catch (error) {
      console.error("Error fetching adventure:", error);
      throw error;
    }
  }
  
  export async function updateAdventure(adventureData) {
    try {
      // console.log("service/adventure/updateAdventure:", adventureData)
      await adventuresAPI.updateAdventure(adventureData)
    } catch (error) {
      console.error("Error updating adventure", error)
      throw error
    }
  }
  
  export async function getAdventureDetails(userid) {
    const userDetails = await adventuresAPI.getAdventure(userid);
    // console.log("service userDetails: ", userDetails)
    return userDetails;
  }
  
  export async function createAdventure(adventureData) {
    try {
      // console.log("service/adventure/adventureData adventureData: ", adventureData)
  
      await adventuresAPI.createAdventure(adventureData);
      // You can return a success message or handle additional logic here if needed
    } catch (error) {
      console.error("Error creating adventure:", error);
      throw error; // Propagate the error to handle it further up the chain
    }
  }
