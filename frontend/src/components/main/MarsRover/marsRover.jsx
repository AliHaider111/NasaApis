import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FetchMarsRover } from '../../../redux/marsRover/action';

const MarsRover = () => {
  const dispatch = useDispatch();
  const { marsRover } = useSelector((state) => state.mars);
console.log(marsRover, "====marsRover")
  useEffect(()=>{
    dispatch(FetchMarsRover());
  },[])

  return (
    <div>
      Mars Rover data
    </div>
  )
}

export default MarsRover
