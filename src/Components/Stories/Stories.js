import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';


function Seller() {
    const navigate = useNavigate()

    const [records, setRecords] = useState([])

    function getData() {
        fetch('http://18.202.34.215:8080/seller/read')
            .then((response) => response.json()
                .then((data) => setRecords(data)))
    }

    useEffect(() => { getData() }, [])

    function removeRecord(rec) {
        let choice = window.confirm(`Are you sure you want to delete ${rec.first_name} record. This will also delete all properties registered to ${rec.first_name}!!!`)
        let temprecords = records.filter(recs => recs.id !== rec.id)
        if (choice) {
            setRecords(temprecords)
            fetch(`http://18.202.34.215:8080/seller/delete/${rec.id}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json', } })
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


    function sellerProperty(seller) {
        const url = `/Seller/ManageSellerProperty/${seller.id}/${seller.first_name}/${seller.surname}`
        navigate(url)
    }

    return (
        <>
            <h1> Seller Data Page </h1>
            <div className='container'>
                <Link className="btn btn-light" to="/Seller/AddSellerForm"> Add Seller</Link>
                <Link className="addsellerbtn" type="button" value="Add Seller" />
            </div>
            <br />
            <table className='container'>
                <tr>
                    <th> First Name </th>
                    <th> Surname </th>
                    <th> Address </th>
                    <th> Poscode </th>
                    <th> PhoneNo </th>
                    <th>  </th>
                    <th>  </th>
                </tr>
                {records.map(rec => <tr class="tr1">
                    <td> {rec.first_name}  </td>
                    <td> {rec.surname}  </td>
                    <td> {rec.address}  </td>
                    <td> {rec.postcode}  </td>
                    <td> {rec.phone_number}  </td>
                    <td><button className='btn btn-light' onClick={() => sellerProperty(rec)}>Manage</button></td>
                    <td><input className="btn_delete" type="button" value="Remove" onClick={() => removeRecord(rec)} /></td>
                </tr>
                )
                }
            </table>

        </>
    )
}

export default Seller;
