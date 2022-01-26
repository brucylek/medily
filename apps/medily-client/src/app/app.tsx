import { Body } from '@nestjs/common';
import React, { useEffect, useState } from 'react';

interface Activity {
    _id : string;
    address : string;
    date_end : Date;
    date_start : Date;
    description : string;
    id_category : string;
    id_pro : string;
    name : string;
    nb_seats : string;
    price : number;
    }

    

const App = () => {
  const [activity, setActivity] = useState<Activity>();

  // useEffect(() => {
  //   fetch('/api/activity')
  //     .then((_) => _.json())
  //     .then(setActivity);
  // }, []);

  function addActivity() {
    console.log(activity);
    fetch('/api/activity', {
      method: 'POST',
      body: JSON.stringify(activity),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(json => console.log(json));
    
  }


  return (
    <>
      <h1>Todos</h1>
      
          <h3>Nom :</h3>
            <input type="text" name='nom' value={activity?.name} />
            <h3>Tarif :</h3>
            <input type="number" name="tarif" value={activity?.price}/>
            <h3>Lieu :</h3>
            <input type="text" name="lieu" value={activity?.address} />
            <h3>Date :</h3>
            <input type="date" name="date"  />
            <h3>Durée :</h3>
            <input type="text" name='duree' />
            <h3>Image :</h3>
            
            <h3>Categorie :</h3>
            <select  >
                <option >Sport</option> 
                <option >Culture</option>
                <option >Créatif</option>  
            </select>
            <h3>Nombre de personne :</h3>
            <input type="number" name='personne' />
            <h3>Description :</h3>
            <textarea name='description' ></textarea>    
            <button id={'add-activity'} onClick={addActivity}>
               ajouter
            </button>
        
      
    </>
  );
};

export default App;