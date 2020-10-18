import React, {useEffect, useState} from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import {useParams} from 'react-router-dom'

import '../styles/pages/orphanage.css';

import SideBar from '../components/sideBar'

import mapIcon from '../utils/mapIcon'

import api from '../services/api'

interface Orphanage {
  id: number
  latitude: number,
  longitude: number,
  name: string,
  about: string,
  instructions: string,
  opening_hours: string,
  open_on_weekends: boolean,
  images: Array<{
    id: number
    url: string
  }>
}

interface OrphanageParams {
  id: string
}

export default function Orphanage() {
  const params = useParams<OrphanageParams>()

  const [orphanage, setOrphanage] = useState<Orphanage>()
  const [activeImageIndex, setActiveImageIndex] = useState(0)

    useEffect(() => {
        api.get(`/orphanages/${params.id}`).then(response => {
            setOrphanage(response.data)
        })
    }, [params.id])

  if(!orphanage) {
    return <p>Carregando...</p>
  } else {
    return (
      <div id="page-orphanage">
        <SideBar />
        <main>
          <div className="orphanage-details">
            <img src={orphanage.images[activeImageIndex].url} alt={orphanage.name} />
  
            <div className="images">
              {
                orphanage.images.map((img, index) => {
                  return (
                    <button 
                      key={img.id} 
                      className={activeImageIndex == index ? "active" : ""} 
                      type="button"
                      onClick={() => {
                        setActiveImageIndex(index)
                      }}
                    >
                      <img src={img.url} alt={orphanage.name} />
                    </button>
                  )
                })
              }
            </div>
            
            <div className="orphanage-details-content">
              <h1>{orphanage.name}</h1>
              <p>{orphanage.about}</p>
  
              <div className="map-container">
                <Map 
                  center={[orphanage.latitude, orphanage.longitude]} 
                  zoom={16} 
                  style={{ width: '100%', height: 280 }}
                  dragging={false}
                  touchZoom={false}
                  zoomControl={false}
                  scrollWheelZoom={false}
                  doubleClickZoom={false}
                >
                  <TileLayer 
                    url={'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'}
                  />
                  <Marker interactive={false} icon={mapIcon} position={[orphanage.latitude, orphanage.longitude]} />
                </Map>
  
                <footer>
                  <a href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`} target='_blank' rel='noopener noreferrer'>Ver rotas no Google Maps</a>
                </footer>
              </div>
  
              <hr />
  
              <h2>Instruções para visita</h2>
              <p>{orphanage.instructions}</p>
  
              <div className="open-details">
                <div className="hour">
                  <FiClock size={32} color="#15B6D6" />
                  Segunda à Sexta <br />
                  {orphanage.opening_hours}
                </div>
                <div className={`open-on-weekends ${!orphanage.open_on_weekends && "dont-open"}`}>
                  <FiInfo size={32} color={(!orphanage.open_on_weekends) ? "#FF6690" : `#39CC83`} />
                  {!orphanage.open_on_weekends && 'Não'} Atendemos <br />
                  fim de semana
                </div>
              </div>
  
              {/* <button type="button" className="contact-button">
                <FaWhatsapp size={20} color="#FFF" />
                Entrar em contato
              </button> */}
            </div>
          </div>
        </main>
      </div>
    );
  }
  
}