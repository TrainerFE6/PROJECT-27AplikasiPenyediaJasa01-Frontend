import React from "react";
import { useNavigate } from "react-router-dom";
import classes from './LayananCard.module.css';
import { FaLocationDot } from "react-icons/fa6";
import { PurchaseButton } from "./Button";

function LayananCard(props){
    const { id, imageLayanan, title, location, price } = props;
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/layanan/${id}`, { state: { id, imageLayanan, title, location, price } });
    };

    return (
        <div className={`${classes.layananCard}`} onClick={handleCardClick}>
            <div className={`${classes.imgContainer}`}>
                <img src={imageLayanan} alt="Gambar Service"></img>
            </div>
            <h4>{title}</h4>
            <p><span><FaLocationDot /></span>  {location}</p>
            <h4>Rp. {price.toLocaleString('de-DE')}</h4>

            <div className={`${classes.purchaseButton}`}>
                <PurchaseButton label="Pesan Layanan"></PurchaseButton>
            </div>
        </div>
    );
}

export default LayananCard;
