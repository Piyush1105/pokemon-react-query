import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { ReactQueryDevtools } from "react-query/devtools";

const App = () => {
  const [id, setId] = useState(1);

  const { data, isLoading, error } = useQuery(["pokemon", id], () =>
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => res.data)
  );

  if (id < 1) return setId(1);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching Pokémon details</div>;

  return (
    <div>
      {/* {console.log(data.results)}
      {data.results.map((poke) => (
        <li key={poke.name}>{poke.name}</li>
      ))} */}
      <h1>{data.name}</h1>
      <img src={data.sprites.front_default} alt={data.name} />
      <ul>
        <h3>Abilities</h3>
        {data.abilities.map((ability) => (
          <li key={ability.ability.name}>{ability.ability.name}</li>
        ))}
      </ul>
      <button onClick={() => setId(id - 1)}>Previous</button>
      <button onClick={() => setId(id + 1)}>Next</button>
      <ReactQueryDevtools initialIsOpen />
    </div>
  );
};

export default App;
