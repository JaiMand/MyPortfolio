import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import '../../style.css';

function ManagePropertyData(Person) {

    const navigate = useNavigate()

    const { sellerId, firstName, surname } = useParams()

    const [records, setRecords] = useState([])

    function getData() {
        fetch('http://localhost:8080/property/read')
            .then((response) => response.json()
                .then((data) => {
                    console.log(data)
                    setRecords(data)
                }))
    }

    useEffect(() => { getData() }, [])

    function removeRecord(rec) {
        let choice = window.confirm(`Are you sure you want to delete property ${rec.address} record. This will also delete this properties from ${rec.first_name} records!`)
        let temprecords = records.filter(recs => recs.id !== rec.id)
        if (choice) {
            setRecords(temprecords)
            fetch(`http://localhost:8080/property/delete/${rec.id}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json', } })
                .then(response => {
                    if (response.ok) { return response.json(); }
                    else { throw new Error(`Failed to delete record with ID ${rec.id}.`); }
                })
                .then(deletedData => {
                    console.log(`Record with ID ${rec.id} deleted successfully!`, deletedData);
                    let temprecords = records.filter(recs => recs.id !== rec.id);
                    setRecords(temprecords);
                })
                /* .then(data => getData()) */
                .catch(error => { console.error(`Error deleting record with ID ${rec.id}.`, error); });
        }
        else {/* Do nothing if the user cancels the deletion */ }
    }

    function sellerPropertyForm() {
        const url = `/Seller/AddSellerPropertyForm/${sellerId}/${firstName}/${surname}`
        navigate(url)
    }

    function withdrawRecord(recno, newstatus) {
        fetch(`http://localhost:8080/property/change/${recno}`, {
            method: 'PATCH',
            headers: { "content-Type": "application/json" },
            body: JSON.stringify({
                "status": newstatus
            })
        })
            .then((response) => {
                navigate(`/Seller/ManageSellerProperty/${sellerId}/${firstName}/${surname}`);
                getData();
            })
            .catch(error => {
                console.error('Error saving seller:', error);
            });
    }

    // eslint-disable-next-line eqeqeq
    // let filteredRecord = records.filter(rec => rec.id == sellerId)

    return (
        <>
            <h1> Manage Seller Property <b>{firstName} {surname}</b> </h1><br />

            <br />
            <div className='container'>
                <button className="btn btn-light addpropertybtn" onClick={() => sellerPropertyForm()}> Add Poperty</button>
            </div>
            <br />

            <table className='container'>
                <tr>
                    <th> SellerId </th>
                    <th> Address </th>
                    <th> Postcode </th>
                    <th> Type </th>
                    <th> Price </th>
                    <th> Bedroom </th>
                    <th> Bathroom </th>
                    <th> Garden </th>
                    <th> Status </th>
                    <th> PropertyID </th>
                    <th>  </th>
                    <th>  </th>
                </tr>

                {records.filter(record => parseInt(sellerId) === parseInt(record.sellers.id)).map(rec => <tr class="tr1">
                    <td> {rec.sellers.id} </td>
                    <td> {rec.address} </td>
                    <td> {rec.postcode} </td>
                    <td> {rec.type} </td>
                    <td> {rec.price} </td>
                    <td> {rec.bedrooms} </td>
                    <td> {rec.bathrooms} </td>
                    {rec.garden == "true" ? (<td>Yes</td>) : (<td>No</td>)}
                    <td> {rec.status} </td>
                    <td> {rec.id} </td>
                    {rec.status != 'SOLD' ?
                        (rec.status == "FOR SALE" ?
                            (<td><button className="btn btn-light" onClick={() => withdrawRecord(rec.id, "WITHDRAW")}>Withdraw</button></td>)
                            : (<td><button className="btn btn-light" onClick={() => withdrawRecord(rec.id, "FOR SALE")}>Resubmit</button></td>))
                        : (<td></td>)}
                    < td > <input className="btn_delete" type="button" value="Remove" onClick={() => removeRecord(rec)} /></td>
                </tr>

                )}
            </table >
        </>
    )

}

export default ManagePropertyData;