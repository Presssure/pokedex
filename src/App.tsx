import React from "react";
import "./App.css";
import Pokedex from "./components/Pokedex/Pokedex";
import { pokemonData } from "./Data/PokemonData";
import {
  PokemonSpritesSchema,
  UnpatchedPokemonSchema,
  PokemonSchema,
} from "./types/PokemonSchema";

interface AppState {
  searchField: string;
  allPokemons: PokemonSchema[];
  searchedPokemons: PokemonSchema[];
  selectedPokemon: PokemonSchema | undefined;
}

// first argument is the type of the porps and second is type of state
class App extends React.Component<any, AppState> {
  state = {
    searchField: "",
    allPokemons: [],
    searchedPokemons: [],
    selectedPokemon: undefined,
  };

  patchPokemonData = (pokemons: UnpatchedPokemonSchema[]) => {
    const patchedPokemons = pokemons.map((pokemon) => {
      let parsedSprites: PokemonSpritesSchema = {
        normal: undefined,
        animated: undefined,
      };
      try {
        parsedSprites = pokemon.sprites ? JSON.parse(pokemon.sprites) : null;
      } catch (e) {
        console.log("exception while parsing the sprites: ", e);
      }
      const patchedPokemon: PokemonSchema = {
        ...pokemon,
        sprites: parsedSprites,
      };
      return patchedPokemon;
    });
    return patchedPokemons;
  };
  componentDidMount() {
    const patchedPokemons: PokemonSchema[] = this.patchPokemonData(pokemonData);
    this.setState({
      allPokemons: patchedPokemons,
      // we assinged this beacuse initally nothing is searched so we display all the pokemon
      searchedPokemons: patchedPokemons,
    });
  }

  handleInputChange = (inputValue: string) => {
    const { allPokemons } = this.state;
    // calls a filter method that include the searched values then updating the return list
    const searchedPokemons = allPokemons.filter((pokemon: PokemonSchema) => {
      return (
        pokemon.name &&
        pokemon.name.toLowerCase().includes(inputValue.toLowerCase())
      );
    });

    this.setState({
      searchField: inputValue,
      searchedPokemons: searchedPokemons,
    });
  };

  handleClick = (pokemonName: string) => {
    const { searchedPokemons } = this.state;

    const selectedPokemon = searchedPokemons.find(
      (pokemon: PokemonSchema) => pokemon.name === pokemonName
    );
    this.setState({ selectedPokemon });
  };

  render() {
    return (
      <div className="App">
        <h1>Pokedex</h1>
        <Pokedex
          searchedPokemons={this.state.searchedPokemons}
          selectedPokemon={this.state.selectedPokemon}
          onPokemonClick={this.handleClick}
          onInputChange={this.handleInputChange}
        />
      </div>
    );
  }
}

export default App;
