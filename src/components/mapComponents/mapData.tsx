// import jsonData from '../../constants/whc-en.json';

//for single 'site' object in JSON data
interface Site {
    latitude: number;
    longitude: number;
    site: string;
    short_description: string, 
}

//for the structure of the entire JSON data
interface JSONData {
    sites: Site[]; 
  }

//for transformed data to be used by Leaflet
interface TransformedSite {
    latitude: number, 
    longitude: number, 
    name: string, 
    description: string; 
}

//fetch data from 'whc-en.json'
export const fetchSiteData = async (): Promise<TransformedSite[]> => {
    try {
    const response = await fetch('/whc-en-copy.json')
    const data: JSONData = await response.json(); 

    console.log('Fetched data:', data)
    
    if (!Array.isArray(data.sites)) {
        throw new Error("Fetched data is not an array")
    }

    //access 'sites' array in JSON
    const transformedData: TransformedSite[] = data.sites.map(site => {

        const firstSentence = site.short_description.split('.')[0] + '.'; 

        return {
            
        latitude: site.latitude,
        longitude: site.longitude,
        name: site.site,
        description: firstSentence, 
    }
    }); 

    return transformedData; 

} catch (error) {
    console.error('Error transforming data', error);
    throw error
}}


// const transformedData = jsonData.sites.map(site => ({
//     latitude: site.latitude,
//     longitude: site.longitude,
//     name: site.site,
//     description: site.short_description
//   }));
  
//   // Output the result
//   console.log(transformedData);