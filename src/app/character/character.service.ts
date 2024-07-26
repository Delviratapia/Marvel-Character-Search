import { Injectable } from '@angular/core';
import { Character } from '../types/character';
import { Md5 } from 'ts-md5';
import { environment } from '../../environments/environment.development';
// import * as data from '../../../characters.json';
// import * as data2 from '../../../characters detail.json';
// import * as data3 from '../../../characters comics.json';
import { Comic } from '../types/comic';

type Response = {
  code: number;
  status: string;
  etag: string;
  data: {
    total: number;
    results: Character[];
  };
};

type ResponseComics = {
  code: number;
  status: string;
  etag: string;
  data: {
    total: number;
    results: Comic[];
  };
};

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  characters: Character[] | undefined;

  async GetCharacters() {
    return this.characters;
  }

  SetCharacters(characters: Character[]) {
    this.characters = characters;
  }

  async GetCharactersFromAPI(searchString: string): Promise<Character[]> {
    let response = await fetch(this.charactersUrl(searchString));
    let responseJson: Response = await response.json();
    this.SetCharacters(responseJson.data.results);
    return responseJson.data.results;
  }

  async GetCharacterFromAPI(id: string): Promise<Character | undefined> {
    let response = await fetch(this.characterUrl(id));
    let responseJson: Response = await response.json();
    if (responseJson.data.results.length === 0) {
      return undefined;
    }
    return responseJson.data.results[0];
  }

  async GetCharacterComicsFromAPI(
    characterId: string
  ): Promise<Comic[] | undefined> {
    let response = await fetch(this.comicsUrl(characterId));
    let responseJson: ResponseComics = await response.json();
    if (responseJson.data.results.length === 0) {
      return undefined;
    }
    return responseJson.data.results;
  }

  //

  // async GetCharactersFromAPI(searchString: string): Promise<Character[]> {
  //  const res: Response = data as Response;
  //    this.SetCharacters(res.data.results);
  //    return res.data.results;
  //  }

  //  async GetCharacterFromAPI(id: string): Promise<Character | undefined> {
  //    const res: Response = data2 as Response;
  //    this.SetCharacters(res.data.results);
  //    return res.data.results[0];
  //  }

  //  async GetCharacterComicsFromAPI(
  //    characterId: string
  //  ): Promise<Comic[] | undefined> {
  //    const res: ResponseComics = data3 as ResponseComics;
  //    return res.data.results;
  //  }

  private charactersUrl(searchString: string): string {
    let queryParams = `${this.getAuth()}&nameStartsWith=${searchString}`;
    return `${environment.baseUrl}/${environment.charactersEndpoint}?${queryParams}`;
  }

  private characterUrl(id: string): string {
    let queryParams = `${this.getAuth()}`;
    return `${environment.baseUrl}/${environment.charactersEndpoint}/${id}?${queryParams}`;
  }

  private getAuth(): string {
    const timestamp = new Date().getTime();
    const hash = Md5.hashStr(
      timestamp + environment.privateKey + environment.publicKey
    );

    return `ts=${timestamp}&apikey=${environment.publicKey}&hash=${hash}`;
  }

  private comicsUrl(id: string): string {
    // let orderBy = 'onsaleDate';
    let orderBy = 'issueNumber';
    let queryParams = `${this.getAuth()}&orderBy=${orderBy}`;
    return `${environment.baseUrl}/${environment.charactersEndpoint}/${id}/comics?${queryParams}`;
  }
}
