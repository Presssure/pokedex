import "./SearchResult.css";
import { PokemonSchema } from "../../types/PokemonSchema";

interface PokemonSearchResultProps {
  selectedPokemon: PokemonSchema | undefined;
}

const SearchResult = ({ selectedPokemon }: PokemonSearchResultProps) => {
  const { name, id, height, weight, base_experience, sprites } =
    selectedPokemon || {};

  return (
    <div className="poke-result-card">
      {selectedPokemon ? (
        <div>
          <img
            className="pokemon-animated-sprite"
            src={sprites?.animated || sprites?.normal}
            alt={name}
          />
          <p>Name:{name}</p>
          <p>Id: {id}</p>
          <p>height:{height}</p>
          <p>Weight:{weight}</p>
          <p>Base Exp: {base_experience}</p>
        </div>
      ) : (
        <h2>Welcome to the pokedex</h2>
      )}
    </div>
  );
};

export default SearchResult;
