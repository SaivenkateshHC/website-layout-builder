import React from 'react'
import OutputData from "./OutputData";
import App from "./App";
import {Routes, Route} from 'react-router-dom';

const CombinedRoutes = () => {
  return (
	  <Routes>
		  <Route path={'/'} element={<App/>}/>
		  <Route path={'/output'} element={<OutputData/>}/>


	  </Routes>
  )
}

export default CombinedRoutes
