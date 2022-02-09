import { Body } from '@nestjs/common';
import React, { useEffect, useState } from 'react';

const Activity = {
    _id : "",
    address : "",
    date_end : "",
    date_start : "",
    description : "",
    id_category : "",
    id_pro : "",
    name : "",
    nb_seats : 0 ,
    price : 0 ,
    }
     

const App = () => {
  const [activity, setActivity] = useState(Activity);

  // useEffect(() => {
  //   fetch('/api/activity')
  //     .then((_) => _.json())
  //     .then(setActivity);
  // }, []);

  // function handleChange (event) {
  //   const name = event.target.name;
  //   const value = event.target.value;
  //   setActivity(values => ({...values, [name]: value}))
  // }

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
//e => setActivity({ ...activity, name: e.target.value })

  return (
    <form>
      <h1>Activity</h1>
      
          <h3>Nom :</h3>
            <input type="text" name="name" value={activity.name || ""} onChange={e => setActivity({ ...activity, name: e.target.value })} />
            <h3>Tarif :</h3>
            <input type="number" name="price" value={activity.price} onChange={e => setActivity({ ...activity, price: Number(e.target.value) })}/>
            <h3>Lieu :</h3>
            <input type="text" name="address" value={activity.address} onChange={e => setActivity({ ...activity, address: e.target.value })} />
            <h3>Date début :</h3>
            <input type="date" name="date_start" value={activity.date_start} onChange={e => setActivity({ ...activity, date_start: e.target.value })} />
            <h3>Date fin :</h3>
            <input type="date" name="date_end" value={activity.date_end} onChange={e => setActivity({ ...activity, date_end: e.target.value })} />
            
            <h3>Image :</h3>
            
            <h3>Categorie :</h3>
            <select  name='id_category' value={activity.id_category} onChange={e => setActivity({ ...activity, id_category: e.target.value })}>
                <option >Sport</option> 
                <option >Culture</option>
                <option >Créatif</option>  
            </select>
            <h3>Nombre de personne :</h3>
            <input type="number" name='nb_seats' value={activity.nb_seats} onChange={e => setActivity({ ...activity, nb_seats: Number(e.target.value) })} />
            <h3>Description :</h3>
            <textarea name='description' value={activity.description} onChange={e => setActivity({ ...activity, description: e.target.value })}></textarea>    
            <button id={'add-activity'} onClick={addActivity}>
               Ajouter
            </button>
        
      
    </form>
  );
};

export default App;