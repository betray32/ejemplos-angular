import { Component, OnInit } from '@angular/core';
import { TortasService } from '../tortas.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { Torta } from '../torta';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {

  tortas: Torta[] = [];

  /**
   * Next, we created an instance of Subject which can emit boolean values 
   * (the type of the value doesn't really matter in this example) that will 
   * be used as the notifier of the takeUntil() operator.
   */
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private dataService: TortasService) { }

  ngOnInit() {

    /**
     * There is also a better way to unsubscribe from or complete Observables by using the takeUntil() operator.
     * 
     * The takeUntil() operator emits the values emitted by the source 
     * Observable until a notifier Observable emits a value.
     */
     this.dataService.sendPostRequest().pipe(takeUntil(this.destroy$))
     .subscribe( data => {
       console.log(data)
       this.tortas = data;
     })
  }

  /**
   * When Angular destroys a component it calls the ngOnDestroy() 
   * lifecycle method which, in our case, calls the next() method 
   * to emit a value so RxJS completes all subscribed Observables.
   */
  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

}
