

import Agent from '@/components/Agent'
import React from 'react'

const page = () => {
  return (
    <>
    <h3>Interview Generation</h3>
    <Agent
    userName="interviewer"
    userId="interviewer"
    type = 'generate'
    />
    </>
  )
}

export default page