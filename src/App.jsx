import { useState } from "react";
import "./App.css";
import allContacts from "./contacts.json"

function App() {

  // mostrarmos una array que pasamos por el useState de solo 5 resultados
  const [contacts, setContacts] = useState(allContacts.slice(0, 5))

  // lógica para añadir un contacto random
  const handleAddContact = () => {
    // primero generamos un número aleatorio y lo pasamos como indice a la array allContacts
    let randomContacts = allContacts[Math.floor(Math.random() * allContacts.length)]

    // Determinamos si ya existe un contacto en la vista
    let repeatedContact = contacts.find((eachContact) => {
      if (eachContact.id === randomContacts.id) {
        return true
      }
    })

    if (repeatedContact !== undefined) {
      handleAddContact()
      return;
    }

    // hacemos un clon de la array para poder añadir el nuevo contacto
    let clone = JSON.parse(JSON.stringify(contacts))
    clone.unshift(randomContacts)

    // actualizamos el estado
    setContacts([randomContacts, ...contacts])
  }

  // handle para ordenar por nombre
  const handleSortName = () => {
    let clone = JSON.parse(JSON.stringify(contacts))

    // Ordenar alfabéticamente en orden descendente
    clone.sort((cont1, cont2) => {
      return cont1.name.localeCompare(cont2.name);
    });

    // actualizamos el estado
    setContacts(clone)
  }

  // handle para ordenar por popularidad
  const handleSortPopularity = () => {
    let clone = JSON.parse(JSON.stringify(contacts))

    // Ordenar alfabéticamente en orden descendente
    clone.sort((cont1, cont2) => {
      return cont1.popularity > cont2.popularity ? -1 : 1
    });

    // actualizamos el estado
    setContacts(clone)
  }

  // handle para eliminar un contacto
  const handleDeleteContact = (idContact) => {
    console.log("vamos a eliminar el contact con id:", idContact)
    let clone = JSON.parse(JSON.stringify(contacts))

    clone = clone.filter(eachContact => eachContact.id !== idContact);

    // actualizamos el estado
    setContacts(clone)
  }

  return (
    <div className="App">
      <h1>IronContacts</h1>
      <button onClick={handleAddContact}>Add Random Contact</button>
      <button onClick={handleSortPopularity}>Sort by popularity</button>
      <button onClick={handleSortName}>Sort by name</button>
      <div className="container-tabla">
        <table className="tabla">
          <thead>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Popularity</th>
              <th>Won Oscar</th>
              <th>Won Emmy</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((eachContact, i) => {
              return (
                <tr key={eachContact.i}>
                  <td><img src={eachContact.pictureUrl}></img></td>
                  <td>{eachContact.name}</td>
                  <td>{eachContact.popularity.toFixed(2)}</td>
                  <td>{eachContact.wonOscar && "🏆"}</td>
                  <td>{eachContact.wonEmmy && "🌟"}</td>
                  <td><button className="btn-elimina" onClick={() => handleDeleteContact(eachContact.id)}>Delete</button></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
