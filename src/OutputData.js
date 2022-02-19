import React from 'react'
import {useLocation} from "react-router-dom";


const OutputData = () => {
	const {state}= useLocation()
	const PrettyPrintJson = ({data}) => (<div><pre>{JSON.stringify(data, null, 5) }</pre></div>);
  return (
    <div>
      <p className={''}>{state}</p>
	  {/*  <PrettyPrintJson data={ state } />*/}
    </div>
  )
};

export default OutputData
