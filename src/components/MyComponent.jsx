import { useEffect, useState } from "react"
import './MyComponent.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const MyComponent = () => {
    const url = "https://jsonplaceholder.typicode.com/todos"

    const [ask, setAsk] = useState("");
    const [tasks, setTasks] = useState([])
    const [filteredTasks, setFilteredTasks] = useState([])

    useEffect(() => {
        const fetchData = async () =>{
            try{
                const res = await fetch(url);
                const json = await res.json();

                setTasks(json);
            } catch(error){
                console.log(error)
            }
        }

        fetchData();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        const result = tasks.filter((item) => item.title === ask)
        setFilteredTasks(result)
    }


    const handleChecked = () => {
        const finalizadas = tasks.filter((item) => item.completed)

        setFilteredTasks(finalizadas)

    }


    const handleAllTasks = () => {
        setFilteredTasks(tasks);
    }

    return (
    <div>
        <form onSubmit={handleSubmit} id="myForm">
            <label className="inputText">
                Digite a tarefa que deseja consultar:
                <input type="text" value={ask} onChange={(e) => setAsk(e.target.value)}/>
            </label>
            <button type="submit">Pesquisar</button>

            <label>
                Finalizadas
                <input type="radio" value="checked" name="opcao" onChange={handleChecked } />
            </label>
            <label>
                Todas as tarefas
                <input type="radio" value="all" name="opcao" onChange={handleAllTasks} />
            </label>        
        </form>

        <div className="result">
            {filteredTasks.map((item) => (
                <ul key={item.id}>
                    <li>{item.title}</li>
                    <p>Status: {item.completed ? (
                        <span>Finalizado <FontAwesomeIcon icon={faCheck} size="lg" color="green" /></span>) : (
                        <span>Não finalizado <FontAwesomeIcon icon={faTimes} size="lg" color="red" /></span>)}</p>
                </ul>
            ))}
        </div>
        
    </div>
  )
}

export default MyComponent