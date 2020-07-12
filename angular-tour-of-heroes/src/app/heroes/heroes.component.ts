import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

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
   * The parameter simultaneously defines a private heroService property and identifies it as a HeroService injection site.
   * 
   * @param heroService 
   */
  constructor( private heroService: HeroService, private messageService: MessageService ) {}

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
   * 
   * @param hero 
   */
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }

  /**
   * Create a method to retrieve the heroes from the service.
   */
  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }

}
