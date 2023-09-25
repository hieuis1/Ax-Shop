import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import './pagination.scss'

const Pagination = ({currentPage , setCurrentPage,productPerPage, totalProducts}) => {
  let totalPage = totalProducts / productPerPage
  let arr = []
  for(let i=1; i<=Math.ceil(totalPage);i++){
    arr.push(i);
  }
  const [pageLimit,setPageLimit] = useState(5)
  const [maxPageLimit, setMaxPageLimit] = useState(5)
  const [minPageLimit, setMinPageLimit ] = useState(0)
  const paginate = (number) =>{ 
    setCurrentPage(number)
  }
  const paginateNext =() =>{
    setCurrentPage(currentPage+1)
    if(currentPage + 1 >maxPageLimit){
        setMaxPageLimit(maxPageLimit + pageLimit)
        setMinPageLimit(maxPageLimit + pageLimit)
    }
  }
  const paginatePrev = (numer) => {
    setCurrentPage(currentPage - 1)
    if((currentPage - 1) % pageLimit == 0){
        setMaxPageLimit(maxPageLimit - pageLimit)
        setMaxPageLimit(minPageLimit - pageLimit)
    }
  }


  return (
    <div className="pagination">
        <button className= {currentPage == arr[0]?"hide": "color"} onClick={paginatePrev} >Prev</button>
        {arr.map((number ,index) => {
            
                if(number <= maxPageLimit + 1 && number > minPageLimit){
                    return (<button key={index} className={number == currentPage?"active":""} onClick={() => paginate(number)}>{number}</button>)
                }
            
        })}
        <button className={currentPage == arr[arr.length - 1]?"hide": "color"} onClick={() => paginateNext()} >Next</button>
    </div>
  )
}

export default Pagination