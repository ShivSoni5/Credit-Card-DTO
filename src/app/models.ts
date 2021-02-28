export interface IHttpResponse {
  message: string;
  statusCode: 200 | 404;
}

export interface ICardDetails {
  cardNumber: string;
  cardHolderName: string;
  expiry: Date;
  cvv: string;
  amount: number;
}
