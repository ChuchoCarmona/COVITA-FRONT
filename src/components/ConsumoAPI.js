import React, { Component } from 'react';

function Pokemon(props) {
  return (
    <tr>
      <td>{props.name}</td>
      <td>
        <img src={props.avatar} alt={props.name} />
      </td>
    </tr>
  );
}

export default class AjaxAPIs extends Component {
  state = {
    pokemons: []
  };

  componentDidMount() {
    let url = 'https://pokeapi.co/api/v2/pokemon/';
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        let pokemons = [];
        json.results.forEach((el) => {
          fetch(el.url)
            .then((res) => res.json())
            .then((jsonResult) => {
              let pokemon = {
                id: jsonResult.id,
                name: jsonResult.name,
                avatar: jsonResult.sprites.front_default
              };
              pokemons = [...pokemons, pokemon];
              this.setState({ pokemons });
            });
        });
      });
  }

  render() {
    return (
      <>
        <h2>Peticiones asincronas en componentes de clase</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {this.state.pokemons.map((el) => (
              <Pokemon key={el.id} name={el.name} avatar={el.avatar} />
            ))}
          </tbody>
        </table>
      </>
    );
  }
}
