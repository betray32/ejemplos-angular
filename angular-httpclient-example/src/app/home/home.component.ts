import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { Product } from '../product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];

  /**
   * Next, we created an instance of Subject which can emit boolean values 
   * (the type of the value doesn't really matter in this example) that will 
   * be used as the notifier of the takeUntil() operator.
   */
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private dataService: DataService) { }

  ngOnInit() {

    /**
     * There is also a better way to unsubscribe from or complete Observables by using the takeUntil() operator.
     * 
     * The takeUntil() operator emits the values emitted by the source 
     * Observable until a notifier Observable emits a value.
     */
     this.dataService.sendGetRequest().pipe(takeUntil(this.destroy$))
     .subscribe((res: HttpResponse<Product[]>) => {
      console.log(res);
      this.products = res.body;
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


  /*************************
   * Metodos de paginacion
   */
  public firstPage() {
    this.products = [];
    this.dataService.sendGetRequestToUrl(this.dataService.first).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<Product[]> ) => {
      console.log(res);
      this.products = res.body;
    })
  }
  public previousPage() {

    if (this.dataService.prev !== undefined && this.dataService.prev !== '') {
      this.products = [];
      this.dataService.sendGetRequestToUrl(this.dataService.prev).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<Product[]> ) => {
        console.log(res);
        this.products = res.body;
      })
    }

  }
  public nextPage() {
    if (this.dataService.next !== undefined && this.dataService.next !== '') {
      this.products = [];
      this.dataService.sendGetRequestToUrl(this.dataService.next).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<Product[]> ) => {
        console.log(res);
        this.products = res.body;
      })
    }
  }
  public lastPage() {
    this.products = [];
    this.dataService.sendGetRequestToUrl(this.dataService.last).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<Product[]> ) => {
      console.log(res);
      this.products = res.body;
    })
  }
  /***********************/

}