import { useEffect, useState } from "react";
import axios from "axios";

import IconLoader from "../../assets/loader.gif"

import { CardCharacter } from "../CardCharacter";

import { ContainerApp, ContentCharacters, HeaderApp, Loader } from "./styles";

export function Application() {

  const [characters, setCharacters] = useState([])

  const [page, setPage] = useState(1)

  const [countPages, setCountPages] = useState('')

  const [qtdCharacters, setQtdCharacters] = useState('')

  const [isLoader, setIsLoader] = useState(true)

  useEffect(() => {
    axios.get(`https://rickandmortyapi.com/api/character?page=${page}`)
    .then((response) => {
      const array = [...characters, ...response.data.results]
      setCharacters(array)  
      setCountPages(response.data.info.pages) 
      setQtdCharacters(response.data.info.count) 
      setIsLoader(false)
    })
    .catch((err) => {
      console.log(err);
    });

  }, [page])

  return (
    <>
      {
        isLoader && (
          <Loader>
          <img src={IconLoader} alt="" />
          </Loader>
        )
      }      
      <ContainerApp>
        <HeaderApp>
          <h1>Ricky and Morty</h1>
          <span>Nº de Personagens: {qtdCharacters}</span>
        </HeaderApp>
        <ContentCharacters>
          <div>
            {
              characters && characters.map(({image, name, species, genre}) => {
                return (
                  <CardCharacter 
                  image={image}
                  name={name}
                  genre={genre}
                  specie={species}
                />  
                )
              })
            }              
          </div>
          {
            (!(page === countPages)) &&  <button onClick={() => setPage(page + 1)}>Carregar Mais</button>
          }       
        </ContentCharacters>
      </ContainerApp>
    </>
  );
}
