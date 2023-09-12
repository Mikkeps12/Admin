import Table from 'react-bootstrap/Table';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Dropdown } from 'react-bootstrap';
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import './App.css';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const ar = [{
  ID: 0,
  Bestallare_Namn: "",
  Insertdatetime: "",
  Beslut: ""
  //Updatedatetime: ""
}]

 
export function Tables({ searchdata1 }) {
  
  const [file, setFile] = useState(ar);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [searchdata, setSearchdata] = useState('');
  
  const [page, setPage] = useState(0);
  const [filteredData, setFilteredData] = useState({});
  let url_ ="http://vgdb1572.vgregion.se:820/backend/vgr/";
let url_local_ ="http://localhost:5196/vgr/";


  const [details, setDetails] = useState({
    Insertdatetime: "",
    Updatedatetime: "",
    Forskningshuvudman: "",
    Bestallare_Namn: "",
    Bestallare_Titel_och_Roll: "",
    Bestallare_Epostadress: "",
    Bestallare_Mobiltelefon: "",
    Bestallare_Organisation: "",
    Huvudans_Namn: "",
    Huvudans_Epostadress: "",
    Huvudans_Mobiltelefon: "",
    Huvudans_Organisation: "",
    Bestallare_Fak_Org: "",
    Bestallare_Fak_Adress: "",
    Bestallare_Postnummer: "",
    Bestallare_Postort: "",
    Bestallare_Fak_Referens: "",
    Beslut: { ID: "", Beslut_: "", Bestallare_id: "" }

  })
  const [fileName, setFileName] = useState([{
    FileName: "",
    User_ID: 0

  }])

  const [name, setName] = useState([{
    Namn: ""
  }])

  const [mailtemplate, setMailtemplate] = useState([{
    Amne: "",
    Meddelande: ""
  }])

  const [dataCollection, setDataCollection] = useState([{
    data: ""
  }])

  const dateformat = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  };

  const [project, setProject] = useState([{
    Projekttitel: "",
    Projektbeskrivning: "",
    Diarienummer: "",
    Andringansökan_Diarienummer: "",
    Lakemedelstudier: false,
    Samarbete_Med_Industrin: false
  }])

  useEffect(() => {

    if (file && searchdata1) {
      const n = file.filter((item) => item.Bestallare_Namn && item.Bestallare_Namn.includes(searchdata1));
      setFile(n);
      n.map((maps) => {

        console.log("log" + maps.Bestallare_Namn);
      }
      )
    }
    else{   
         get_data();
    }

  }, [searchdata1]);


  const set = (index) => {
    get_detail(index);
    get_fileName(index);
    get_dataCollection(index);
    get_names();
    get_project(index);
    setShow(!show);
    get_mail_templates();

  }

  return (
    <>

      <div>

        <Table striped bordered hover className='table-hover'>
          <thead >
            <tr>
              <th >Beställarens namn</th>

              <th>Ankomstdatum</th>
              <th>Status</th>
              <th></th>
              <th>Beslut</th>
            </tr>
          </thead>
          <tbody>
            {file.map((maps, index) =>
              <tr key={index} onClick={(e) => { set(maps.ID) }}>
                <td>{maps.Bestallare_Namn}</td>
                <td>{new Date(maps.Insertdatetime).toLocaleString('Sv-SE', dateformat)}</td>
                <td></td>
                <td></td>
                <td>{maps.Beslut}</td>
                <td></td>
              </tr>
            )}

          </tbody>
        </Table>
      </div>
      <div>{searchdata}</div>

      <ToastContainer />
      <div></div>
      {/* Här ska modal vara */}
      <Modal show={show} dialogClassName="my-modal">
        <Modal.Header closeButton onClick={() => setShow(!show)}>
          <Modal.Title id="contained-modal-title-vcenter">

            <div>Beställarens namn: {details.Bestallare_Namn}</div>

          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          
          <div className="outer-container2" >
            <div className=" button_modal1">

              <button onClick={() => setPage(0)} className={page === 0 ? 'active-tabs2' : 'tabs'}>Beställare</button>
              <button onClick={() => setPage(1)} className={page === 1 ? 'active-tabs2' : 'tabs'}>Projekt</button>
              <button onClick={() => setPage(2)} className={page === 2 ? 'active-tabs2' : 'tabs'}>Bifogade filer</button>
              <button onClick={() => setPage(3)} className={page === 3 ? 'active-tabs2' : 'tabs'}>Datauttag</button>
              <button onClick={() => setPage(4)} className={page === 4 ? 'active-tabs2' : 'tabs'}>Meddelande mall</button>
              <div style={{ marginTop: "-30px", marginLeft: "450px", width: "550px", backgroundColor: "white", color: "white" }}>.</div>
              

              <ToastContainer />
            </div>
            <div className="container1">
              <div className="row">



                {/* Beställare */}
                <div className="col2123">
                  {page === 0 && <Buyer />}
                  {page === 1 && <Project />}
                  {page === 2 && <Files />}
                  {page === 3 && <DataCollection />}
                  {page === 4 && <Mail />}
                </div>
              </div>
            </div>

          </div>
          <div style={{ marginLeft: "1100px", marginTop: "-600px" }}>
            
            <div className='headingb16'>Datum</div>
            <div className='heading16'>Ansökan inkommen: {new Date(details.Insertdatetime).toLocaleString('sv-SE', dateformat)} </div>
            <div className='heading16'>Ansökan beslutad: {new Date(details.Updatedatetime).toLocaleString('sv-SE', dateformat)}</div>
            <div className="heading16" style={{ width: "150px" }}>Meddelande skickad till beställaren:</div>
            <div className='headingb16'>Beslut</div>
            <button className='primaryButton'>Godkänd</button>
            <div className='heading16'>{details.Beslut.Beslut_}</div>
            
          </div>

        </Modal.Body>
      </Modal>
      {/* Här slutar modal */}
     <br />
      <br />
      <div></div>
    </>
  )

  function h() {
    toast.success("Namnbytet är genomfört");
  }


  

  function Buyer() {
    return (
      <div style={{ overflowY: "scroll", height: "440px", marginTop: "20px" }} className="active-content">

        {/* <div className='headingb16'>Forskningshuvudman: {details.bestallning_av_data.Forskningshuvudman}</div> */}
        <div className='heading16'>Beställare Namn: {details.Bestallare_Namn} </div>
        <div className='heading16'>Beställare Titel och Roll: {details.Bestallare_Titel_och_Roll}</div>
        <div className='heading16'>Beställare Epostadress: {details.Bestallare_Epostadress}</div>
        <div className='heading16'>Beställare Mobiltelefon: {details.Bestallare_Mobiltelefon}</div>
        <div className='heading16'>Beställare Organisation: {details.Bestallare_Organisation}</div>
        <div className='heading16'>Huvudansvarig Namn: {details.Huvudans_Namn}</div>
        <div className='heading16'>Huvudansvarig Epostadress: {details.Huvudans_Epostadress}</div>
        <div className='heading16'>Huvudansvarig Mobiltelefon: {details.Huvudans_Mobiltelefon}</div>
        <div className='heading16'>Huvudansvarig Organisation: {details.Huvudans_Organisation}</div>
        <div className='heading16'>Organisationsnummer: {details.Bestallare_Fak_Org}</div>
        <div className='heading16'>Faktureringsadress: {details.Bestallare_Fak_Adress}</div>
        <div className='heading16'>Postnummer: {details.Bestallare_Postnummer}</div>
        <div className='heading16'>Postort: {details.Bestallare_Postort}</div>
        <div className='heading16'>Fakturareferens / beställar-id: {details.Bestallare_Fak_Referens}</div>

        <div className='headingb16'></div>

      </div>
    )
  }

  function Mail() {
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedMessage, setSelectedMessage] = useState('');


    const onHandleOnchange = (e) => {
      const optionHandle = e.target.options[e.target.selectedIndex];
      const subject = optionHandle.getAttribute("amne");
      const message = optionHandle.getAttribute("meddelande");

      setSelectedSubject(subject);
      setSelectedMessage(message);
    }
    const mailTo = "mailto:" + details.Bestallare_Epostadress + "?subject=" + encodeURIComponent(selectedSubject) + "&body="
      + encodeURIComponent(selectedMessage);

    return (
      <div>

        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Välj mall</label>
          <br />
          <select onChange={onHandleOnchange}>
            <option></option>
            {mailtemplate.map((maps) =>

              <>
                <option key={maps.Amne} amne={maps.Amne} meddelande={maps.Meddelande}>{maps.Amne}</option>

              </>
            )}
          </select>
          <br />
          <a href={mailTo}>Öppna Outlook</a>

        </div>
      </div>
    )
  }

  function Project() {
    return (
      <div style={{ overflowY: "scroll", height: "220px" }}>
        {project.map((maps) =>
          <>
            <div className='headingb16'>Projektets titel: {maps.Projekttitel}</div>
            <div className='heading16'>Projektbeskrivning: {maps.Projektbeskrivning} </div>
            <div className='heading16'>Grundansökan diarienummer: {maps.Diarienummer}</div>
            <div className='heading16'>Ändringsansökan diarienummer: {maps.Andringansökan_Diarienummer}</div>
            <div className='heading16'>Läkemedelstudie: {maps.Lakemedelstudier}</div>
            <div className='heading16'>Samarbete med industrin: {maps.Samarbete_Med_Industrin}</div>
          </>
        )}
      </div>
    )
  }

  function Files() {
    const onHandleOnchange = (e, filename, user_id) => {
      const selectedId = e.target.options[e.target.selectedIndex].getAttribute("name-id");
      const selectedFileName = filename;
      rename_filename(selectedId, selectedFileName, user_id);
    }
    return (

      <div style={{ overflow: "scroll", height: "440px", marginTop: "0px", position: "relative" }}>
        <div className='headingb16'>Filer
          <Table style={{ marginTop: "0px" }}>
            <thead >
              <tr>
                <th >Fil</th>

                <th>Byt namn</th>

              </tr>
            </thead>
            <tbody>
              {fileName.map((maps, index) =>
                <tr key={maps.FileName} onChange={(e) => onHandleOnchange(e, maps.FileName, maps.User_ID)} >


                  <td onClick={(e) => open_file(maps.FileName, maps.User_ID)}>{maps.FileName}</td>
                  <td><select >

                    <option>Välj namn</option>
                    {name.map((maps) =>
                      <>
                        <option name-id={maps.Namn}>{maps.Namn}</option>
                      </>

                    )}
                  </select></td>
                  
                </tr>

              )}

            </tbody>
            {fileName.map((maps) =>
              <>
                <div className='heading16 cursor' onClick={(e) => open_file(maps.FileName, maps.User_ID)}>{maps.FileName}</div>
              </>
            )}

          </Table>
        </div>
      </div>
    )
  }

  function DataCollection() {

    return (
      <div style={{ overflowY: "scroll", height: "490px" }}>    <div className='headingb16'>Datauttag</div>
        {dataCollection.map((maps, index) => {

          const objects = JSON.parse(maps.data);

          return (
            <>
              <div className="datacollection">
                <div className="datacollectionheading3">{index + 1}. Datauttag: {objects.Goverment}</div>
                <div className='heading16'>Datakälla: {objects.Register}</div>
                <div>Från datum: {new Date(objects.FromDate).toLocaleDateString('Sv-SE')}</div>
                <div>Till datum: {new Date(objects.ToDate).toLocaleDateString('Sv-SE')}</div>
                <div>Datumintervallet avser: {objects.DateInterval}</div>
                <div>Kön: {objects.Gender}</div>
                <div>Ålder från: {objects.AgeFrom}</div>
                <div>Ålder till: {objects.AgeTo}</div>
                <div>Åldersintervallet avser: {objects.AgeInterval}</div>
                <div>Kompletterande beskrivning av urval: {objects.Additional}</div>
                <div>Beskrivning av variabler: {objects.DescriptionOfVariables}</div>
                <div>Variabellista filformat{objects.V}</div>
                <div>Filformat som önskas vid leverans: {objects.FileFormat}</div>
                <div>Vem ska aktuell data levereras till: {objects.DataDelivered}</div>
                <div>Namn: {objects.Name}</div>
                <div>Organisation: {objects.Organization}</div>
                <div>Epost: {objects.Mail}</div>
                <div>Telefon: {objects.Phone}</div>
                <div>Ska data från aktuellt register samköras med inkommande fil från beställaren? {objects.SyncRegistersWithFile}</div>
                <div>Ska data från aktuellt register samköras med andra datakällor? {objects.SyncRegisterFromOtherSources}</div>
                <div>Angivna datakälla: {objects.NameDatasources}</div>
                <div>Beskrivning av den tänkta processen kring samkörning: {objects.ProcessOfSync}</div>
                <div>Vilka variabler ska samkörningen göras på? {objects.WhichVariables}</div>
              </div>
            </>
          )
        }
        )}
      </div>
    )
  }

  
  
  function get_data() {

    const url = url_+"getdata";
    const url_local = url_local_+"getdata";
    axios.get(url).then((result) => {
      
      setFile(result.data);
      
    })
  }

  function get_detail(index: number) {
    const url = url_+"getdata/" + index;
    const url_local = url_local_+"getdata/" + index;
    axios.get(url).then((result) => {

      setDetails(result.data);
    })
  }

  function get_fileName(index: number) {
    const url = url_+"getfilename/" + index;
    const url_local = url_local_+"getfilename/" + index;
    axios.get(url).then((result) => {

      setFileName(result.data);
    })
  }

  function get_dataCollection(index: number) {
    const url = url_+"getdatacollection/" + index;
    const url_local = url_local_+"getdatacollection/" + index;
    axios.get(url).then((result) => {

      setDataCollection(result.data);
    })
  }

  function get_project(index: number) {
    const url = url_+"getproject/" + index;
    const url_local = url_local_+"getproject/" + index;
    axios.get(url).then((result) => {

      setProject(result.data);
    })
  }

  function get_names() {
    const url =url_+ "getnames";
    const url_local = url_local_+"getnames";
    axios.get(url).then((result) => {
      setName(result.data);
    })
  }

  function get_mail_templates() {
    const url = url_+"getmailtemplates";
    const url_local = url_local_+"getmailtemplates";
    axios.get(url).then((result) => {
      setMailtemplate(result.data);
    })
  }
  
  function rename_filename(newFilename: string, oldFilename: string, user_id: number) {
    const data = {
      newFilename: newFilename,
      oldFilename: oldFilename
    }
    const url = url_+"renamefile/" + user_id;
    const url_local = url_local_+"renamefile/" + user_id;

    axios.put(url, data).then((response) => {
      if (response.status === 200) {

        h();
        fileName.map((maps) => {
          if (maps.FileName === oldFilename) {
            get_dataCollection(user_id);
            return { ...maps, FileName: newFilename };

          }
        })

      }

    })

  }

  async function open_file(fileName: any, user_id: number) {
    const url = url_+"getfile?filename=" + fileName + "&user_id=" + user_id;
    const url_local = url_local_+"getfile?filename=" + fileName + "&user_id=" + user_id;


    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        // Create a temporary URL for the blob object
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName); // Specify the desired file name
        document.body.appendChild(link);
        // Trigger the click event on the link
        link.click();
      }
      )
  }

}