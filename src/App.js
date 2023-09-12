
import './App.css';
import { useState } from 'react'
import "./OverrideBootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css"
import { Tables, onHandleSearch } from './Tables.tsx';
function App() {
  const[search, setSearch] = useState('')
  
  function onChangeHandle(e){
    setSearch(e.target.value);
  }

  
  
  function onHandleClick(e){
    e.preventDefault();
    Tables.onHandleSearch();
  }
  

  return (
    <>
    <div className="header1">
        <div className="header2">Adminportal</div>
        <div className="header3">
        <div className='header2a' >Logga ut</div>
        </div>
        <div className='heading'>
          <div className="container-static">
            
            <input className="textBox" type='text' placeholder="Sök"onChange={onChangeHandle}/> 
            
            
          </div>
        </div>
      </div>
      <Tables searchdata1={search}/>
      </>
  );
}

export default App;
