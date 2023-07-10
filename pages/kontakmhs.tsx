import { useState,useEffect } from "react";
import axios from "axios";
import { stat } from "fs";

 
 const koneksiKontak_mahasiswa = axios.create({
  
  baseURL: "http://127.0.0.1:5000/api/kontak_mahasiswa" 
});

export default function FormKontak_mahasiswa() {
    const [statenama, setNama] = useState("");
    const [statenim, setNim] = useState("");
    const [stateemail, setEmail] = useState("");
    const [statenohp, setNohp] = useState("");
    const [statealamat, setAlamat] = useState("");
    const [statefoto, setFoto] = useState("");
    const [kontak_mahasiswa, setKontak_mahasiswa] =  useState(null);
    const [stateadd,setAdd]=useState("hide");
    const [statebutonadd,setbtnAdd]=useState("show");
    const [stateedit,setEdit]=useState("hide");
    
    function formatDate(date) {
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
  
      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;
  
      return [year, month, day].join('-');
  }
  
  const handleSubmitAdd = (event) => {
    
    event.preventDefault();
    const formData = new FormData(event.target);
    koneksiKontak_mahasiswa
      .post("/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
     
 }
 const handleSubmitEdit =  (event) => {
    
  event.preventDefault();
  const address = "/"+event.target.nim.value;
  alert(address);
  //const formData = new FormData(event.target);
  const formData = {
    nim: event.target.nim.value,
    nama: event.target.nama.value,
    email: event.target.email.value,
    nohp: event.target.nohp.value,
    alamat: event.target.alamat.value
}
  alert(formData);
  koneksiKontak_mahasiswa
    .put( address,formData)
    .then((res) => {
      console.log(res);
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
   
}
  const handleAdd = (event) => {
    
     setAdd("show");
     setbtnAdd("hide");
     setEdit("hide");
 
      
  }
  const handleCancelAdd = (event) => {
    
     setAdd("hide");
     setbtnAdd("show");
     setEdit("hide");
 
      
  }
  const handleCancelEdit = (event) => {
    
    setAdd("hide");
    setbtnAdd("show");
    setEdit("hide");
    setNama("");
    setNim("");
    setEmail("");
    setNohp("");
    setAlamat("");
    setFoto("");
     
 }
   const handleDelete = (event) => {
            event.preventDefault();
            var nim = event.target.value;
            koneksiKontak_mahasiswa.delete(`/${nim}`)
              .then(response => {
                console.log('Data berhasil dihapus:', response.data);
                setKontak_mahasiswa(
                  kontak_mahasiswa.filter((kontak_mahasiswa) => {
                     return kontak_mahasiswa.nim !== nim;
                  }))
             
                // Lakukan langkah-langkah lain setelah penghapusan data
              })
              .catch(error => {
                console.error('Gagal menghapus data:', error);
              })
          }

      const handleEdit = (event) => {
            event.preventDefault();
            var nim = event.target.value;
            
               const kntkEdit = kontak_mahasiswa.filter((kontak_mahasiswa) => {
                     return kontak_mahasiswa.nim == nim;
                  });
                  if(kntkEdit!=null){

                    setNama(kntkEdit[0].nama);
                    setNim(kntkEdit[0].nim);
                    setEmail(kntkEdit[0].email);
                    setNohp(kntkEdit[0].nohp);
                    setAlamat(kntkEdit[0].alamat);
                    setFoto(kntkEdit[0].foto);
                    setAdd("hide");
                    setbtnAdd("hide");
                    setEdit("show");

                  }
          }
  useEffect(() => {
      async function getKontak_mahasiswa() {
        const response = await koneksiKontak_mahasiswa.get("/").then(function (axiosResponse) {
            setKontak_mahasiswa(axiosResponse.data.data); 
     
         })
         .catch(function (error) {   
          alert('error from mahasiswa in api mahasiswa: '+error);
         });;
          }
      getKontak_mahasiswa();
    }, []);
  
   
if(kontak_mahasiswa==null){
return(
  <div>
    waiting...
  </div>
)
}else{

  return (
   <center><div>
    <br></br><h1>DATA KONTAK MAHASISWA</h1><br></br>
       <form id="formadd" className={stateadd} onSubmit={handleSubmitAdd} >
       <br/><h3>TAMBAH DATA KONTAK MAHASISWA</h3><br/>
        <table border={0}>
            <tbody>
            <tr>
            <td> <label> Nim:</label></td>
            <td><input type="text" id="nim" name="nim"/>
              
              </td>
        </tr>
        <tr>
            <td>  <label> Nama:</label></td>
            <td><input type="text" id="nama"   name="nama" 
               /></td>
        </tr>
        <tr>
            <td>  <label> Foto:</label></td>
            <td>   <input
                    type="file" name="image"/>  </td>
        </tr>
        <tr>
            <td>  <label> Email:</label></td>
            <td><input type="text" id="email"   name="email" 
               /></td>
        </tr>
        <tr>
            <td>  <label> No Handphone:</label></td>
            <td><input type="text" id="nohp"   name="nohp" 
               /></td>
        </tr>
        <tr>
            <td>  <label> Alamat:</label></td>
            <td><textarea  id="address" style={{resize: "none"}}  name="alamat" ></textarea></td>
        </tr>
            </tbody>
          </table>
          <br/>
          <input type="submit"/> | <input type="button" value="Cancel" onClick={handleCancelAdd} /><br/><br/>
          </form>  

      <form id="formedit" className={stateedit} onSubmit={handleSubmitEdit}>
      <br/><h3>EDIT DATA KONTAK MAHASISWA</h3><br/>
          <table border={0}>
            <tbody>
            <tr>
            <td> <label> Nim:</label></td>
            <td><input type="text" id="nim"  value={statenim} name="nim"/>
              {/* onChange={handleOnchangeNim}  /> */}
              </td>
        </tr>
        <tr>
            <td>  <label> Nama:</label></td>
            <td><input type="text" id="nama"  value={statenama} name="nama"
               onChange={(e) => setNama(e.target.value)}
               /></td>
        </tr>
        <tr>
            <td>  <label> Foto:</label></td>
            <td>  <img src={statefoto} width="80"/> </td>
        </tr>
        <tr>
            <td>  <label> Email:</label></td>
            <td><input type="text" id="email"  value={stateemail} name="email"
               onChange={(e) => setEmail(e.target.value)}
               /></td>
        </tr>
        <tr>
            <td>  <label> No Handphone:</label></td>
            <td><input type="text" id="nohp"  value={statenohp} name="nohp"
               onChange={(e) => setNohp(e.target.value)}
               /></td>
        </tr>
        <tr>
            <td>  <label> Alamat:</label></td>
            <td><textarea  id="address" style={{resize: "none"}} value={statealamat} name="alamat"  onChange={(e) => setAlamat(e.target.value)}></textarea></td>
        </tr>
            </tbody>
          </table>
          <br/><input type="submit" /> | <input type="button" value="Cancel" onClick={handleCancelEdit} /><br/><br/>
          </form>  
          <br></br>
        <button id="btnadd" onClick={handleAdd} className={statebutonadd} style={{backgroundColor: "#2db175", borderWidth: "0.5px", padding: "5px", borderSpacing: "0", borderRadius: "5px", cursor:"pointer"}}>
          Tambah Data</button>
        <br></br><br></br>
            Tabel Kontak Mahasiswa hasil get Local Nodejs 
        <table className="tampilan-table" border={2}>
            <thead>
                <tr style={{textAlign:"center"}}>
                <td>Nim</td> 
                <td>Nama</td>
                <td>Foto</td>
                <td>Email</td>
                <td>No Handphone</td>
                <td>Alamat</td>
                <td colSpan={2}><center>Action</center></td>
                </tr>
            </thead>
            <tbody className="table-body">
            {kontak_mahasiswa.map((kntk) => 
                <tr>
                    <td>{kntk.nim}</td>
                    <td>{kntk.nama}</td>
                    <td><img src={kntk.foto} width="80"/></td>
                    <td>{kntk.email}</td>
                    <td>{kntk.nohp}</td>
                    <td>{kntk.alamat}</td>
                   <td><button className="for-edit" onClick={handleEdit} value={kntk.nim}>Edit</button> | <button className="for-hapus" onClick={handleDelete} value={kntk.nim}> Delete</button></td>
                </tr>
           )}     
                   </tbody>
          </table>
          <br></br>
          <br></br><br></br>
         
          </div></center>
        )
}
  
  }