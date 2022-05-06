import styled from "styled-components";

const PageList = styled.ul`
    list-style: none;
    display: flex;
    li{
        padding: 10px;
        border: 1px solid white;
        button {
            background-color: transparent;
            border: none;
            color: black;
            font-size: 1.2rem;
            cursor:pointer;
        }
    }
    .active {
        background-color: white;
        color: ${props => props.theme.colors.primary.blue};
    }
`;


const Pagination = (props) => {
  const { currentPage, maxPageLimit, minPageLimit, totalPages} = props;
  const pages = [];

    for(let i=1 ; i<=totalPages; i++){
        pages.push(i);
    }

    const handlePrevClick = ()=>{
        props.onPrevClick();
    }

    const handleNextClick = ()=>{
        props.onNextClick();
    }

    const handlePageClick = (e)=>{
        props.onPageChange(Number(e.target.id));
    }

    const pageNumbers = pages.map(page => {
        if(page <= maxPageLimit  && page > minPageLimit) {
            return(
        <li key={page} id={page} onClick={handlePageClick} 
            className={currentPage===page ? 'active' : null}>
            {page}
        </li>
            );
        }else{
            return null;
        }
    }
   
 );

 let pageIncrementEllipses = null;
    if(pages.length > maxPageLimit){
        pageIncrementEllipses = <li onClick={handleNextClick}>&hellip;</li>
    }
    let pageDecremenEllipses = null;
    if(minPageLimit >=1){
        pageDecremenEllipses = <li onClick={handlePrevClick}>&hellip;</li> 
    }

    return (
        <PageList> 
           <li>
               <button onClick={handlePrevClick} disabled={currentPage === pages[0]}>{'<'}</button>
           </li>
           {pageDecremenEllipses}
            {pageNumbers}
           {pageIncrementEllipses}
            <li>
               <button onClick={handleNextClick} disabled={currentPage === pages[pages.length-1]}>{'>'}</button>
           </li>
        </PageList>
    )
}

export default Pagination