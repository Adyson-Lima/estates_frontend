import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from '../../services/api';

export default function NewUpdate(){

  const[name, setName] = useState('');
  const[capital, setCapital] = useState('');
  const navigate = useNavigate();

  // estate_id definido na rota NewUpdate
  const{estate_id} = useParams();

  // recebe eventos do formulario
  async function saveOrUpdate(e){

    e.preventDefault();

    const data = {name,capital};

    if (estate_id === '0') {
      try {
        await api.post('api/v1/estates', data, {});
        navigate('/');
      } catch (error) {
        alert('Erro ao salvar');        
      }      
    } else {
      try {
        await api.patch(`api/v1/estates/${estate_id}`,data,{});
        navigate('/');        
      } catch (error) {
        alert('Erro ao atualizar');        
      }      
    }
  }

  // carrega um resgistro da api e seta dados para atualização
  async function loadEstate(){
    try {
      const response = await api.get(`api/v1/estates/${estate_id}`,{});
      setName(response.data.name);
      setCapital(response.data.capital);
    } catch (error) {
      alert('Erro ao buscar registro');
      navigate('/');      
    }
  }

  // chama loadEstate e preenche form
  useEffect(() => {
    if (estate_id === '0') {
      return;      
    } else {
      loadEstate()      
    }
  }, [estate_id]);

  return(

    <div data-testid="mycard" className="card border-primary" style={{marginTop: '20px'}} >
      <div className="card-header bg-primary" style={{color: '#fff'}}>
        Estates Crud
      </div>
      <div className="card-body">

        <Link data-testid="mylink" className="btn btn-dark" 
        style={{marginBottom: '5px'}} to="/">Home</Link>

        <form data-testid="myform" onSubmit={saveOrUpdate}>

          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input data-testid="input1" id="name" type="text" 
            style={{marginBottom: '20px'}} className="form-control" 
            placeholder="Nome" value={name}
            onChange={e => setName(e.target.value)}></input>
          </div>

          <div className="form-group">
            <label htmlFor="capital">Capital</label>
            <input data-testid="input2" id="capital" type="text" 
            style={{marginBottom: '20px'}} className="form-control" 
            placeholder="Capital" value={capital}
            onChange={e => setCapital(e.target.value)}></input>
          </div>

          <button data-testid="btnenviar" type="submit" className="btn btn-primary">Enviar</button>

        </form>

      </div>
    </div>

  );

}