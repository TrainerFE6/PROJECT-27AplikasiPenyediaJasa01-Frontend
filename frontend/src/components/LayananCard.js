import React from "react";
import classes from './LayananCard.module.css';
import { FaLocationDot } from "react-icons/fa6";
import { PurchaseButton } from "./Button";

function LayananCard(props){
    const {imageLayanan, title, location, price} = props;

    return (
        <div className={`${classes.layananCard}`}>
            <div className={`${classes.imgContainer}`}>
                <img src={imageLayanan} alt="Gambar Service"></img>
            </div>
            <h4>{title}</h4>
            <p><span><FaLocationDot /></span>  {location}</p>
            <h4>Rp. {price.toLocaleString('de-DE')}</h4>

            <div className={`${classes.purchaseButton}`}>
                  <PurchaseButton label="Pesan Layanan" ></   PurchaseButton>
                
            </div>
        </div>
    )
}

export default LayananCard;