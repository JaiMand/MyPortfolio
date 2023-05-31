import { Link, useNavigate } from 'react-router-dom';
import React, { useRef, useState } from 'react';


export const AddBuyerForm = () => {
    const firstNameRef = useRef();
    const surnameRef = useRef();
    const addressRef = useRef();
    const postcodeRef = useRef();
    const phoneNumberRef = useRef();

    let [errorMessage_firstName, setErrorMessage_firstName] = useState('');
    let [errorMessage_surname, setErrorMessage_surname] = useState('');
    let [errorMessage_address, setErrorMessage_address] = useState('');
    let [errorMessage_postcode, setErrorMessage_postcode] = useState('');
    let [errorMessage_phoneNumber, setErrorMessage_phoneNumber] = useState('');

    const navigate = useNavigate()

    function validateAndSave() {
        const newBuyer = {
            "first_name": firstNameRef.current.value,
            "surname": surnameRef.current.value,
            "address": addressRef.current.value,
            "postcode": postcodeRef.current.value,
            "phone_number": phoneNumberRef.current.value,
        }

        if (!newBuyer.first_name) { setErrorMessage_firstName('Please fill in First Name.'); }
        else { setErrorMessage_firstName('') }
        if (!newBuyer.surname) { setErrorMessage_surname('Please fill in Surname.'); }
        else { setErrorMessage_surname('') }
        if (!newBuyer.address) { setErrorMessage_address('Please fill in Address.'); }
        else { setErrorMessage_address('') }
        if (!newBuyer.postcode) { setErrorMessage_postcode('Please fill in Postcode.'); }
        else { setErrorMessage_postcode('') }
        if (!newBuyer.phone_number) { setErrorMessage_phoneNumber('Please fill in Phone Number.'); }
        else { setErrorMessage_phoneNumber('') }

        if (
            newBuyer.first_name &&
            newBuyer.surname &&
            newBuyer.address &&
            newBuyer.postcode &&
            newBuyer.phone_number
        ) {
            fetch('http://18.202.34.215:8080/buyer/add', {
                method: "POST",
                headers: { "content-Type": "application/json" },
                body: JSON.stringify(newBuyer)
            })
                .then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    } else {
                        throw new Error(`Server returned status code ${response.status}`);
                    }
                })
                .then((data) => {
                    navigate("/Buyer/BuyerProperty");
                })
                .catch(error => {
                    console.error('Error saving buyer:', error);
                });
        }
    }

    return (
        <>
            <h1> Add Buyer Form </h1><br />

            <form class="sellerForm container">
                <label class="col-sm-3 col-form-label"> First Name: </label>
                <input ref={firstNameRef} type='text' placeholder='First Name' />
                <small id="passwordHelp" class="text-danger">
                    {errorMessage_firstName && <div className="form-group has-warning">{errorMessage_firstName}</div>}
                </small><br />

                <label class="col-sm-3 col-form-label"> Surname: </label>
                <input ref={surnameRef} type='text' placeholder='Surname' />
                <small id="passwordHelp" class="text-danger">
                    {errorMessage_surname && <div className="form-group has-warning">{errorMessage_surname}</div>}
                </small><br />

                <label class="col-sm-3 col-form-label"> Address: </label>
                <input ref={addressRef} type='text' placeholder='City/Country' />
                <small id="passwordHelp" class="text-danger">
                    {errorMessage_address && <div className="form-group has-warning">{errorMessage_address}</div>}
                </small><br />

                <label class="col-sm-3 col-form-label"> Postcode: </label>
                <input ref={postcodeRef} type='text' placeholder='Postcode' />
                <small id="passwordHelp" class="text-danger">
                    {errorMessage_postcode && <div className="form-group has-warning">{errorMessage_postcode}</div>}
                </small><br />

                <label class="col-sm-3 col-form-label"> Phone Number: </label>
                <input ref={phoneNumberRef} type='text' placeholder='Phone Number' />
                <small id="passwordHelp" class="text-danger">
                    {errorMessage_phoneNumber && <div className="form-group has-warning">{errorMessage_phoneNumber}</div>}
                </small><br />

                <Link className="btn btn-dark link1" onClick={() => validateAndSave()}> Save </Link>
                <Link to="/Buyer/BuyerProperty" className="btn btn-light link1"> Cancel </Link>

            </form >
        </>
    )
}

export default AddBuyerForm;