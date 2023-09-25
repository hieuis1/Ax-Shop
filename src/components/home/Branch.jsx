import React from 'react'
import { Container } from 'react-bootstrap'
import { SiLenovo,SiApple,SiSamsung,SiAcer,SiSony } from "react-icons/si";
import './home.scss'
const Branch = () => {
  return (
    <div className='branch'>
        <Container className='branchContainer' >
            <div className="item"><SiLenovo size={100} color='gray'/></div>
            <div className="item"><SiSamsung  size={100} color='gray' /></div>
            <div className="item"><SiApple  size={70} color='gray'/></div>
            <div className="item"><SiAcer  size={100} color='gray'/></div>
            <div className="item"><SiSony  size={100}  color='gray'/></div>
        </Container>
    </div>
  )
}

export default Branch