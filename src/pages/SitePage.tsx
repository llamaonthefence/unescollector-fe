
import React from 'react';
import SiteRootComponent from '../components/siteComponents/siteRootComponent';
import SiteRoutedComponent from '../components/siteComponents/siteRoutedComponent'

import { Outlet, useParams } from 'react-router-dom'; 

const SitePage: React.FC = () => {
    const {id} = useParams< {id?: string} >()

    return (
        <>
        <SiteRootComponent />
        {id && <SiteRoutedComponent />} 
        <Outlet /> 
        </>
    )
}; 


export default SitePage; 