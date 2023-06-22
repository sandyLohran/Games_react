import React, { Component } from "react";
import api from "../services/api";
import "./listar.css";
import Cabecalho from "../componentes/cabecalho";


class Listar extends Component {
  state = {
    games: [],
    isLoading: true,
    error: null,
    filterValue: "",
  };

  componentDidMount() {
    this.fetchDataWithTimeout(api.get("/data"), 5000)
      .then((response) => {
        this.setState({ games: response.data, isLoading: false });
        
      })
      .catch((error) => {
        if (
          error.response &&
          [500, 502, 503, 504, 507, 508, 509].includes(error.response.status)
        ) {
          this.setState({
            error: "O servidor falhou em responder, tente recarregar a página",
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

  handleFilterChange = (event) => {
    this.setState({ filterValue: event.target.value });
  };

  render() {
    const { games, isLoading, error, filterValue } = this.state;

    const filteredGames = games.filter((game) => {
      return game.title.toLowerCase().includes(filterValue.toLowerCase());
    });

    return (
      <div>
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
            />
            <div className="container d-flex justify-content-center">
              <div className="row">
                {filteredGames.map((game) => (
                  <div className="py-2 col-md-4" key={game.id}>
                    <div className="card h-100 bg-dark">
                      <img
                        className=""
                        src={game.thumbnail}
                        alt={game.title}
                      />
                      <div className="card-body text-light">
                        <h4 className="card-title">
                          <strong>{game.title}</strong>
                        </h4>
                        <p className="card-text text-secondary">
                          {game.short_description}
                        </p>
                      </div>
                    </div>
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
