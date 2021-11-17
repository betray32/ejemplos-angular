import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Hero } from '../heroes/hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

  heroes$: Observable < Hero[] > ;
  private searchTerms = new Subject < string > ();

  constructor(private heroService: HeroService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  /**
   * Chaining RxJS operators
   * Passing a new search term directly to the searchHeroes() after every user keystroke would 
   * create an excessive amount of HTTP requests, taxing server resources and burning through data plans.
   * 
   * Instead, the ngOnInit() method pipes the searchTerms observable through a sequence 
   * of RxJS operators that reduce the number of calls to the searchHeroes(), ultimately 
   * returning an observable of timely hero search results (each a Hero[])
   */
  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(

      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      /**
       * switchMap() calls the search service for each search term that makes it through debounce() 
       * and distinctUntilChanged(). It cancels and discards previous search observables, 
       * returning only the latest search service observable.
       */
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );

  }

}
