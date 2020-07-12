import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  /**
   * variables
   */
  heroes: Hero[];
  selectedHero: Hero;

  /**
   * Add a private heroService parameter of type HeroService to the constructor.
   * 
   * @param heroService 
   */
  constructor(private heroService: HeroService) {

  }

  /**
   * Call it in ngOnInit()
   * 
   * While you could call getHeroes() in the constructor, that's not the best practice.
   * Reserve the constructor for simple initialization such as wiring constructor parameters to properties. The constructor shouldn't do anything. It certainly shouldn't call a function that makes HTTP requests to a remote server as a real data service would.
   * Instead, call getHeroes() inside the ngOnInit lifecycle hook and let Angular call ngOnInit() at an appropriate time after constructing a HeroesComponent instance.
   */
  ngOnInit(): void {
    this.getHeroes();
  }

  /**
   * Metodos
   * @param hero 
   */
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  /**
   * Create a method to retrieve the heroes from the service.
   */
  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }

}
