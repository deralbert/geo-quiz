import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SparqlService {

  constructor(private httpClient: HttpClient) {
  }

  getPlaceAndPropertyValue(theme: string, relation: string, coordinates: any[], radius: number) {
    return this.httpClient.get(`https://query.wikidata.org/bigdata/namespace/wdq/sparql?query=`
      + `SELECT DISTINCT ?placeLabel ?relationLabel ?valueLabel WHERE {`
        + `VALUES (?wdt) {(wdt:${relation})}`
        + `?relation wikibase:directClaim ?wdt .`
        + `?place (wdt:P31/(wdt:P279*)) wd:${theme};`
        + `wdt:${relation} ?value.`
        + `SERVICE wikibase:around {`
        +  `?place wdt:P625 ?location.`
        +  `bd:serviceParam wikibase:center "Point(${coordinates[0]} ${coordinates[1]})"^^geo:wktLiteral;`
        +    `wikibase:radius "${radius}";`
        +    `wikibase:distance ?distance.`
        + `}`
        + `SERVICE wikibase:label { bd:serviceParam wikibase:language "en,de". }`
      + `}`
      + `ORDER BY (?distance)`
      + `LIMIT 50`);
  }

  getNearestPlace(coordinates: any[], radius: number) {
    return this.httpClient.get(`https://query.wikidata.org/bigdata/namespace/wdq/sparql?query=`
      + `SELECT DISTINCT ?place WHERE {`
        + `?place (wdt:P31/(wdt:P279*)) wd:Q515. `
        + `SERVICE wikibase:around {`
        +  `?place wdt:P625 ?location. `
        +  `bd:serviceParam wikibase:center "Point(${coordinates[0]} ${coordinates[1]})"^^geo:wktLiteral;`
        +    `wikibase:radius "${radius}";`
        +    `wikibase:distance ?distance.`
        + `}`
        + `SERVICE wikibase:label { bd:serviceParam wikibase:language "en,de". }`
      + `}`
      + `ORDER BY (?distance)`);
  }

  getPersonFrom(cityQId: any, relation: string) {
    return this.httpClient.get(`https://query.wikidata.org/bigdata/namespace/wdq/sparql?query=`
      + `SELECT ?personLabel ?relationLabel ?valueLabel WHERE { `
        + `VALUES (?wdt) {(wdt:${relation})} `
        + `?relation wikibase:directClaim ?wdt . `
        + `?person wdt:P19 wd:${cityQId}; `
        + `wdt:${relation} ?value. `
        +  `SERVICE wikibase:label { bd:serviceParam wikibase:language "en,de". }`
        + `}`
      + `LIMIT 50`);
  }
}
