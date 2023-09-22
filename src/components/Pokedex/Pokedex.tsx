import "./Pokedex.css";
import SearchResult from "../SearchResult/SearchResult";
import SearchBox from "../SearchBox/SearchBox";
import Pokelist from "../Pokelist/Pokelist";
import { PokemonSchema } from "../../types/PokemonSchema";

interface PokedexProps {
  searchedPokemons: PokemonSchema[];
  selectedPokemon: PokemonSchema | undefined;
  onInputChange: (inputValue: string) => void;
  onPokemonClick: (inputValue: string) => void;
}
// assigning the type of props
const Pokedex = ({
  searchedPokemons,
  selectedPokemon,
  onInputChange,
  onPokemonClick,
}: PokedexProps) => {
  return (
    <div className="pokedex-container">
      <div className="pokelist-container">
        <SearchBox onInputChange={onInputChange} />
        <Pokelist
          searchedPokemons={searchedPokemons}
          onPokemonClick={onPokemonClick}
        />
      </div>
      <div className="pokesearchresult-container">
        {/* <p>Poke search results</p> */}
        <SearchResult selectedPokemon={selectedPokemon} />
      </div>
    </div>
  );
};

export default Pokedex;
