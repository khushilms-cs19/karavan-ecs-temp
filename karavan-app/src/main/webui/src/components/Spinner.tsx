import React from 'react'
import './Spinner.css'

const Spinner: React.FC<{}> = () => (
  <div className="spinner">
    <div className="bounce1" />
    <div className="bounce2" />
    <div className="bounce3" />
  </div>
)

export default Spinner