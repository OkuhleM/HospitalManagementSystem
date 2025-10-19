import React, {useEffect} from 'react'
import { NewtonsCradle } from 'ldrs/react'
import 'ldrs/react/NewtonsCradle.css'
import '../Styling/IsLoading.css'

function IsLoading() {
  return (
    <div className='container'>

<NewtonsCradle
  size="150"
  speed="1.3"
  color="white" 
/>

    </div>
  )
}

export default IsLoading;





