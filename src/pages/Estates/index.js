import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from '../../services/api';

export default function Estates(){

  const[my_estates, setEstates] = useState([]);
  const navigate = useNavigate();

  // read, busca todos os registros na api
  useEffect(() => {
    api.get('api/v1/estates',{})
    .then(response => {setEstates(response.data)})
  }, []);

  // update, navega para NewUpdate
  async function updateEstate(id){
    try {
      navigate(`/newupdate/${id}`);
    } catch (error) {
      alert('Erro ao navegar');      
    }
  }

  // delete, exclui um elemento na api
  async function deleteEstate(id){
    try {
      await api.delete(`api/v1/estates/${id}`,{});
      setEstates(my_estates.filter(estate => estate.id !== id));
    } catch (error) {
      alert('Erro ao excluir');      
    }
  }

  return(

    <div data-testid="mycard" className="card border-primary" style={{marginTop: '20px'}} >
      <div className="card-header bg-primary" style={{color: '#fff'}}>
        Estates Crud
      </div>
      <div className="card-body">

        <Link data-testid="mylink" className="btn btn-success" 
        style={{marginBottom: '10px'}} to="/newupdate/0">Novo</Link>

        <table data-testid="mytable" className="table table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nome</th>
              <th scope="col">Capital</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {my_estates.map(estate => (
              <tr key={estate.id}>
                <th scope="row">{estate.id}</th>
                  <td>{estate.name}</td>
                  <td>{estate.capital}</td>
                  <td>

                    <button data-testid="mybtn1" type="button"
                    className="btn btn-outline-info" style={{margin: '2px'}}
                    onClick={() => updateEstate(estate.id)}>Editar</button>

                    <button data-testid="mybtn2" type="button"
                    className="btn btn-outline-danger" style={{margin: '2px'}}
                    onClick={() => deleteEstate(estate.id)}>Excluir</button>

                  </td>
              </tr>
            ))}            
          </tbody>
        </table>

      </div>
    </div>

  );

}