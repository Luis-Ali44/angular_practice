
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { APP_CONFIG } from '../../../core/config/app.config';
import { SpotifySearchResponse } from '../domain/models/search-result.model';

@Injectable({
  providedIn: 'root'
})
export class SpotifySearchAdapter {
  private apiUrl = APP_CONFIG.spotify.apiBaseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Buscar en Spotify (tracks, artists, albums)
   * 
   * @param query - Término de búsqueda
   * @param type - Tipos a buscar: 'track', 'artist', 'album'
   * @param limit - Número máximo de resultados por tipo
   * @returns Observable con los resultados de búsqueda
   * 
   * Ejemplo:
   * this.adapter.search('coldplay', 'track,artist,album', 20)
   */
  search(
    query: string,
    type: string = 'track,artist,album',
    limit: number = 20
  ): Observable<SpotifySearchResponse> {
    return this.http.get<SpotifySearchResponse>(
      `${this.apiUrl}/search`,
      {
        params: {
          q: query,
          type: type,
          limit: limit.toString()
        }
      }
    );
  }

  /**
   * Buscar solo tracks
   */
  searchTracks(query: string, limit: number = 20): Observable<SpotifySearchResponse> {
    return this.search(query, 'track', limit);
  }

  /**
   * Buscar solo artists
   */
  searchArtists(query: string, limit: number = 20): Observable<SpotifySearchResponse> {
    return this.search(query, 'artist', limit);
  }

  /**
   * Buscar solo albums
   */
  searchAlbums(query: string, limit: number = 20): Observable<SpotifySearchResponse> {
    return this.search(query, 'album', limit);
  }
}