import { Box } from "@chakra-ui/react";
import HomeDashboard from "../components/homeComponents/homeDashboard";
import UserCharts from "../components/progressComponents/userCharts";

function HomePage() {

    return(
        <>
        <Box maxWidth="550px" mx="auto">
        <HomeDashboard />
        <UserCharts />
        </Box>
        </>
    )
}; 


export default HomePage; 