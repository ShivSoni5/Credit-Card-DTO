import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ICardDetails } from 'src/app/models';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { setDetails } from 'src/app/store/card-details.action';
import { cardSelector } from 'src/app/store/card-details.selectors';

@Component({
  selector: 'app-save-card-details',
  templateUrl: './save-card-details.component.html',
  styleUrls: ['./save-card-details.component.css']
})
export class SaveCardDetailsComponent implements OnInit, OnDestroy {
  card: ICardDetails;
  userCardDetails: FormGroup;
  minDate = Date.now();
  storeSubsciption: Subscription;
  loading: boolean;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private datePipe: DatePipe,
    private router: Router,
    private toast: ToastrService
  ) { }


  ngOnInit(): void {
    this.storeSubsciption = this.store.select(cardSelector).subscribe(card => this.card = card);

    this.buildForm();
  }


  ngOnDestroy() {
    this.storeSubsciption.unsubscribe();
  }


  buildForm() {
    this.userCardDetails = this.fb.group({
      cardNumber: [this.card.cardNumber, Validators.required],
      cardHolder: [this.card.cardHolderName, Validators.required],
      expiry: [this.datePipe.transform(this.card.expiry, 'yyyy-MM'), Validators.required],
      cvv: [this.card.cvv],
      amount: [this.card.amount, this.amountValidator]
    });
  }


  amountValidator(control: AbstractControl): { [errorKey: string]: boolean } | null {
    if (control.value === null || isNaN(control.value) || control.value <= 0) {
      return { amountError: true };
    }

    return null;
  }


  hasError(controlName): boolean {
    return this.userCardDetails.get(controlName).invalid && this.userCardDetails.get(controlName).touched;
  }


  get controls(): { [key: string]: AbstractControl; } {
    return this.userCardDetails.controls;
  }


  onSubmit() {
    this.loading = true;

    const card: ICardDetails = {
      cardNumber: this.controls.cardNumber.value,
      cardHolderName: this.controls.cardHolder.value,
      expiry: new Date(this.controls.expiry.value),
      amount: this.controls.amount.value,
      cvv: this.controls.cvv.value
    };

    this.paymentService.SaveCardDetails(card).subscribe((response) => {
      this.store.dispatch(setDetails({ card }));
      this.toast.success(response.message);
      this.router.navigate(['']);
      this.loading = false;

    }, (error) => {
      this.toast.error(error);
      this.loading = false;
    });
  }

}
