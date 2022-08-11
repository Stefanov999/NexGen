import { useEffect, useState } from 'react';
import styles from './Form.module.scss';
import { validEmail,validUsernames,dateInf,sendData } from '../Services/Services';

const Form = () =>{

//States
const [firstName,setfirstName] = useState('');
const [lastName,setlastName] = useState('');
const [email,setemail] = useState('');
const [phone,setphone] = useState('');
const [gender,setgender] = useState('Male');
const [message,setmessage] = useState('');
const [checkbox,setcheckbox] = useState(false);
const [disableSubmit,setdisableSubmit] = useState(true);
const [fromResult,setfromResult] = useState(' ');
//// Errors State
const [errorsInputs,seterrorsInputs] = useState({
    firstName : 'Fill you Your Name',
    lastName : 'Fill you Last Name',
    email :'Fill your e-mail',
    phone:'Fill your Phone Number',
    message : 'Any message ?'
});

///Function checking Field length
const validateInput =(e,lessThan,moreThan) =>{
    const value = e.target.value;
    if(value.length < lessThan){
        seterrorsInputs(state =>( {...state,[e.target.name]:`Must be more than ${lessThan} symbols`}));
    }else if(value.length > moreThan){
        seterrorsInputs(state =>( {...state,[e.target.name]:`Must be less than ${moreThan} symbols`}));
    }else{
        seterrorsInputs(state =>( {...state,[e.target.name]: 'ok'})) ;
    }
    };

    ///Regex for FirstName and Lastname
    const valideUsernames = (e) => {
        
        if (validUsernames.test(e.target.value.trim())) {
            seterrorsInputs(state =>( {...state,[e.target.name]:'ok'}));
        }else{
            seterrorsInputs(state =>( {...state,[e.target.name]:'invalid Name'}));
        }
    };

    ///Regex for E-mail
    const validateEmail = (e) => {
        if (validEmail.test(e.target.value.trim())) {
            seterrorsInputs(state =>( {...state,[e.target.name]:'ok'}));
        }else{
            seterrorsInputs(state =>( {...state,[e.target.name]:'invalid e-mail'}));
        }
    };
   
    ///Checkbox status
    const checkboxValue = () =>{
        setcheckbox(state=> !state);
    };

    /// Validation while typing
    useEffect(()=>{
        if(errorsInputs.firstName==='ok' && errorsInputs.lastName==='ok' && errorsInputs.email==='ok'
         && errorsInputs.phone ==='ok' && errorsInputs.message ==='ok' && checkbox )
        {
            setdisableSubmit(false);
        }else{
            setdisableSubmit(true);
        }
    },[errorsInputs,checkbox]);

    /// Submit function
    const submitForm = (e) =>{
        e.preventDefault();
        sendData({
            firstName : firstName.trim(),
            lastName : lastName.trim(),
            email : email.trim(),
            phone: phone.trim(),
            gender : gender.trim(),
            message : message.trim(),
            date : dateInf()
        },'https://next-f0bbd-default-rtdb.europe-west1.firebasedatabase.app/.json')
        .then((data)=>data)
        .catch((data)=>data);

        setfirstName('');
        setlastName('');
        setemail('');
        setphone('');
        setmessage('');
        checkboxValue();
        setfromResult('Message Sent Successfully')
        seterrorsInputs({
            firstName : 'Fill you Your Name',
            lastName : 'Fill you Last Name',
            email :'Fill your e-mail',
            phone:'Fill your Phone Number',
            message : 'Any message ?'
        });
    };


    ///Form HTML
return(

<div className={styles.signUpWrapper}>
<div className={styles.info}>
<h1 className={styles.info} >Contact Form </h1>
<img src='https://i.ibb.co/jLqGJvg/next.png' alt='nexGen IMG'></img>
</div>
   
<form onSubmit={submitForm}>
<div className={disableSubmit ? styles.signUpForm : styles.signUpFormOk}>
<h1>Contact Form</h1>
<span className={styles.signUpNames}>
<div>
<input type='text' name='firstName' placeholder='First Name' value={firstName} onChange={(e)=>setfirstName(e.target.value)}
onBlur={valideUsernames}>
</input>

{<i className={errorsInputs.firstName==='Fill you Your Name'
? styles.inputErrorOrigin
: errorsInputs.firstName === 'invalid Name'
? styles.inputErrorNotOk 
: styles.inputErrorOK
}>{errorsInputs.firstName}</i> }


</div>
<div>
<input type='text' name="lastName" placeholder='Last Name' value={lastName} onChange={(e)=>setlastName(e.target.value)}
onBlur={valideUsernames}>
</input>

{<i className={errorsInputs.lastName==='Fill you Last Name'
? styles.inputErrorOrigin
: errorsInputs.lastName === 'invalid Name'
? styles.inputErrorNotOk 
: styles.inputErrorOK
}>{errorsInputs.lastName}</i> }


</div>
</span>
<input type='text' name="email" placeholder='e-mail' value={email} onChange={(e)=>setemail(e.target.value)} 
onBlur={validateEmail} ></input>

{<i className={errorsInputs.email === 'Fill your e-mail' 
 ? styles.inputErrorOrigin 
 : errorsInputs.email ==='invalid e-mail' 
 ? styles.inputErrorNotOk 
 : styles.inputErrorOK}
 >{errorsInputs.email}</i>}

<input type='number' name='phone' placeholder='phone' value={phone} onChange={(e)=>setphone(e.target.value)}
onBlur={(e) =>validateInput(e,8,20)}></input>

{<i className={errorsInputs.phone === 'Fill your Phone Number' 
 ? styles.inputErrorOrigin 
 : errorsInputs.phone.includes('Must') 
 ? styles.inputErrorNotOk 
 : styles.inputErrorOK}
 >{errorsInputs.phone}</i>}

<select value={gender} onChange={(e)=>setgender(e.target.value)}>
    <option>Male</option>
    <option>Female</option>
</select>
<textarea name='message' placeholder='Message' value={message} onChange={(e)=>setmessage(e.target.value)}
onBlur={(e) =>validateInput(e,10,200)}
></textarea>

{<i className={errorsInputs.message === 'Any message ?' 
 ? styles.inputErrorOrigin 
 : errorsInputs.message.includes('Must') 
 ? styles.inputErrorNotOk 
 : styles.inputErrorOK}
 >{errorsInputs.message}</i>}


<span className={styles.signUpRobot}>
<label htmlFor="checkbox">I am not a Robot</label>
<input type="checkbox" id='checkbox' value={checkbox} checked={checkbox}  onChange={checkboxValue} />
</span>
<input type="submit" disabled={disableSubmit} value="Submit Form" className={disableSubmit ? styles.signUpSubmit : styles.signUpSubmitOK} />
<i className={styles.fromResult}>{fromResult}</i>
</div>
</form>
</div>

);
};
export default Form;