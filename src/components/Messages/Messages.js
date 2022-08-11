import { useEffect } from 'react';
import { useState } from 'react';
import { getData } from '../Services/Services';
import styles from './Messages.module.scss';
import { deleteData } from '../Services/Services';

const Messages = () =>{

const [dataMsgs,setdataMsgs] = useState({});

///Getting Data from the Server
useEffect(()=>{
    getData('https://next-f0bbd-default-rtdb.europe-west1.firebasedatabase.app/.json')
    .then((data)=> setdataMsgs(data) )
})


/// Delete current message
async function deleteMsg(el){
   if (window.confirm(`Delete ?`)) {
   await  deleteData(el,'https://next-f0bbd-default-rtdb.europe-west1.firebasedatabase.app/').then((data)=> data);
   getData('https://next-f0bbd-default-rtdb.europe-west1.firebasedatabase.app/.json')
   .then((data)=> setdataMsgs(data) )
  }
};


/// HTML for Table in Messages
return (
<div className={styles.TableWrapper}>
<table className={styles.table}>
    <tbody>
        <tr className={styles.tableRow}>
                <td className={styles.tableTd}>First Name</td>
                <td className={styles.tableTd}>Last Name</td>
                <td className={styles.tableTd}>Sex</td>
                <td className={styles.tableTd}>E-mail</td>
                <td className={styles.tableTd}>Phone</td>
                <td className={styles.tableTd}>Message</td>
                <td className={styles.tableTd}>Click to Delete</td>
        </tr>
        {dataMsgs ? Object.keys(dataMsgs).map(el=>{
            return(
              <tr className={styles.tableRow} key={el}>
                <td>{dataMsgs[el].firstName}</td>
                <td>{dataMsgs[el].lastName}</td>
                <td>{dataMsgs[el].gender}</td>
                <td>{dataMsgs[el].email}</td>
                <td>{dataMsgs[el].phone}</td>
                <td>{dataMsgs[el].message}</td>
                <td className={styles.tableDel} onClick={()=>deleteMsg(el)}>DELETE</td>
              </tr>
            )
        }) : <h1>No Messages</h1>}
    </tbody>
</table>
</div>

);

};
export default Messages;