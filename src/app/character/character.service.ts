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
    const cache = this.GetCache();
    if (cache) {
      return cache;
    }

    let response = await fetch(this.GetUrl());
    let responseJson: Response = await response.json();

    const characters = responseJson.data.results;
    this.SetCache(characters);
    return characters;
  }

  private GetUrl(): string {
    if (!environment.production) {
      return `${environment.baseUrl}/${environment.charactersEndpoint}`;
    }

    const timestamp = new Date().getTime();
    const hash = Md5.hashStr(
      timestamp + environment.privateKey + environment.publicKey
    );
    return `${environment.baseUrl}/${environment.charactersEndpoint}?ts=${timestamp}&apikey=${environment.publicKey}&hash=${hash}`;
  }

  private GetCache(): Character[] | undefined {
    let cached = localStorage.getItem('/characters');
    if (!cached) {
      return undefined;
    }
    let cache = JSON.parse(cached);

    if (cache.expireDate < new Date().getTime()) {
      localStorage.removeItem('/characters');
      return undefined;
    }

    return cache.characters;
  }

  private SetCache(characters: Character[]) {
    if (characters.length == 0) {
      return;
    }
    localStorage.setItem(
      '/characters',
      JSON.stringify({
        characters: characters,
        expireDate: new Date().getTime() + environment.cacheExpirationTime,
      })
    );
  }
}
