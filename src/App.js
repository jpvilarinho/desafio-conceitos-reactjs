import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [repositoryNumber, setRepositoryNumber] = useState(0);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
      setRepositoryNumber(response.data.length);
    });
  }, []);

  async function handleAddRepository() {
    setRepositoryNumber(repositoryNumber + 1);

    const response = await api.post("repositories", {
      title: `Repository ${repositoryNumber + 1}`,
      url: "",
      techs: [],
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    const filteredRepositories = repositories.filter(
      (repository) => repository.id !== id
    );

    setRepositories(filteredRepositories);
    setRepositoryNumber(filteredRepositories.length);
  }

  return (
    <div>
      <p>Number of Repositories: {repositoryNumber}</p>
      <ul data-testid="repository-list">
        {repositories.length > 0
          ? repositories.map((repository) => (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
								</button>
            </li>
          ))
          : ""}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;