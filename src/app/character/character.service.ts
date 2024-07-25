import { Injectable } from '@angular/core';
import { Character } from './character';
import { Md5 } from 'ts-md5';
import { environment } from '../../environments/environment.development';

type Response = {
  code: number;
  status: string;
  etag: string;
  data: {
    total: number;
    results: Character[];
  };
};

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  async GetCharacters(): Promise<Character[]> {
    let response = await fetch(this.GetUrl());
    let responseJson: Response = await response.json();
    return responseJson.data.results;
  }

  async GetCharacter(searchString: string): Promise<Character[]> {
    let response = await fetch(this.GetUrl2(searchString));
    let responseJson: Response = await response.json();
    return responseJson.data.results;
  }

  private GetUrl(): string {
    const timestamp = new Date().getTime();
    const hash = Md5.hashStr(
      timestamp + environment.privateKey + environment.publicKey
    );
    return `${environment.baseUrl}/${environment.charactersEndpoint}?ts=${timestamp}&apikey=${environment.publicKey}&hash=${hash}`;
  }

  private GetUrl2(searchString: string): string {
    const timestamp = new Date().getTime();
    const hash = Md5.hashStr(
      timestamp + environment.privateKey + environment.publicKey
    );

    let auth = `ts=${timestamp}&apikey=${environment.publicKey}&hash=${hash}`;
    let queryParams = `${auth}&nameStartsWith=${searchString}`;
    return `${environment.baseUrl}/${environment.charactersEndpoint}?${queryParams}`;
  }
}
