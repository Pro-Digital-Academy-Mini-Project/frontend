import React from 'react'
import { useParams } from 'react-router-dom'

export default function RoomPage() {
  const { roomId } = useParams();
  return (
    <div>
      <h1>RoomPage {roomId}</h1>
      
    </div>
  )
}
