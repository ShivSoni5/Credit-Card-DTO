import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ICardDetails } from './models';
import { cardSelector } from './store/card-details.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  card: ICardDetails;
  storeSubsciption: Subscription;
  routerEventsSubscription: Subscription;
  showButton = true;

  constructor(
    private store: Store,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.storeSubsciption = this.store.select(cardSelector).subscribe((card: ICardDetails) => {
      this.card = card;
    });

    this.routerEventsSubscription = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.showButton = !event.url.includes('save');
      }
    });
  }


  ngOnDestroy(): void {
    this.storeSubsciption.unsubscribe();
    this.routerEventsSubscription.unsubscribe();
  }


  @HostListener('document:keydown.enter')
  onEnter() {
    this.ProvideCardDetails();
  }


  ProvideCardDetails(): void {
    this.router.navigate(['/save-card']);
  }
}
