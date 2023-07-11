import React, { Component } from "react";
import api from "../services/api";
import "./listar.css";
import Cabecalho from "../componentes/cabecalho";
import Card from "../componentes/card";
import FirebaseDataComponent from "../buscar";

class Listar extends Component {
  state = {
    games: [],
    isLoading: true,
    error: null,
    filterValue: "",
    selectedGenre: "",
    genres: [],
    favoritos: [],
    isFilterButtonClicked: false,
  };

  componentDidMount() {
    this.fetchDataWithTimeout(api.get("/data"), 5000)
      .then((response) => {
        const games = response.data;
        const genres = this.getUniqueGenres(games);
        this.setState({
          games,
          isLoading: false,
          genres,
        });
      })
      .catch((error) => {
        if (
          error.response &&
          [500, 502, 503, 504, 507, 508, 509].includes(error.response.status)
        ) {
          this.setState({
            error:
              "O servidor falhou em responder, tente recarregar a página",
            isLoading: false,
          });
        } else {
          this.setState({
            error:
              "O servidor não conseguirá responder por agora, tente voltar novamente mais tarde",
            isLoading: false,
          });
        }
      });
  }

  fetchDataWithTimeout = (requestPromise, timeout) => {
    return new Promise((resolve, reject) => {
      const tempo = setTimeout(() => {
        reject(new Error("O servidor demorou para responder, tente mais tarde"));
      }, timeout);

      requestPromise
        .then((response) => {
          clearTimeout(tempo);
          resolve(response);
        })
        .catch((error) => {
          clearTimeout(tempo);
          reject(error);
        });
    });
  };

  getUniqueGenres = (games) => {
    const genres = [...new Set(games.map((game) => game.genre.toLowerCase()))];
    return genres;
  };

  handleFilterChange = (event) => {
    this.setState({ filterValue: event.target.value });
  };

  handleGenreChange = (event) => {
    this.setState({ selectedGenre: event.target.value });
  };

  handleFavoritosChange = (favoritos) => {
    this.setState({ favoritos });
    // Faça o que for necessário com os favoritos atualizados
  };

  handleFilterButtonClick = () => {
    this.setState((prevState) => ({
      isFilterButtonClicked: !prevState.isFilterButtonClicked,
    }));
  };

  renderGenre = (gameId) => {
    const { selectedGenre, games } = this.state;
    const game = games.find((game) => game.id === gameId);

    if (
      selectedGenre === "" ||
      game.genre.toLowerCase() === selectedGenre.toLowerCase()
    ) {
      return (
        <p className="text-dark card-text text-uppercase">{game.genre}</p>
      );
    }

    return null;
  };

  render() {
    const {
      games,
      isLoading,
      error,
      filterValue,
      selectedGenre,
      genres,
      favoritos,
      isFilterButtonClicked,
    } = this.state;

    const arrayDeFavoritosTitle = favoritos ? Object.keys(favoritos) : [];

    const filteredGames = games.filter((game) => {
      const titleMatchesFilter = game.title
        .toLowerCase()
        .includes(filterValue.toLowerCase());
      const genreMatchesFilter =
        game.genre.toLowerCase() === selectedGenre.toLowerCase();
      const isTitleInFavorites = arrayDeFavoritosTitle.some(
        (titulo) => game.title.replace(/\s/g, "") === titulo
      );

      return (
        titleMatchesFilter &&
        (selectedGenre === "" || genreMatchesFilter) &&
        (isTitleInFavorites || !isFilterButtonClicked)
      );
    });

    return (
      <div>
        <FirebaseDataComponent onFavoritosChange={this.handleFavoritosChange} />
        
        {isLoading ? (
          <div className="contft">
            <div className="loading-overlay">
              <h1 className="loading-title">Carregando...</h1>
              <div className="loading-bar"></div>
            </div>
          </div>
        ) : error ? (
          <div className="estiloError ">
            <div className="circuloError">
              <h1 className="estiloError__h1 ">!</h1>
            </div>
            <div>
              <p className="">
                <strong>{error}</strong>
              </p>
            </div>
          </div>
        ) : (
          <div>
            <Cabecalho
              filterValue={filterValue}
              handleFilterChange={this.handleFilterChange}
              selectedGenre={selectedGenre}
              handleGenreChange={this.handleGenreChange}
              genres={genres}
              handleFilterButtonClick={this.handleFilterButtonClick}

              isFilterButtonClicked={isFilterButtonClicked}
              
            />
            <div className="container d-flex justify-content-center">
              <div className="row justify-content-around">
                {filteredGames.map((game) => (
                  <div className="card-deck col-md-4 py-2" key={game.id}>
                    <Card game={game} selectedGenre={selectedGenre} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Listar;
