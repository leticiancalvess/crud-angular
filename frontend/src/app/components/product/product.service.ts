import { map, catchError } from 'rxjs/operators';
import { Product } from './product-create/product.model';
import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Observable, EMPTY } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = 'http://localhost:3001/products'

  constructor(private snackBar: MatSnackBar,
    private http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError? ['msg-error'] : ['msg-success'] //classes CSS que podem ser aplicadas
    })
  }
  create(product: Product): Observable<Product> { //retorna observable de produto
    return this.http.post<Product>(this.baseUrl, product).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    ) //como faz checagem de tipos, é preciso retornar tipo observable de produto
  }

errorHandler(e: any):Observable<any> {
  this.showMessage('Ocorreu um erro!', true);
  return EMPTY; //retorna observable sozinho
}

  read(): Observable<Product[]> { //irá ler uma array de produtos
    return this.http.get<Product[]>(this.baseUrl).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    ) //retorna array de produtos
  }
  readById(id: string): Observable<Product> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Product>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    ) 
  }
  update(product: Product):Observable<Product>{
    const url = `${this.baseUrl}/${product.id}`
    return this.http.put<Product>(url, product).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    ) 
  }
  delete(id: String):Observable<Product>{ //não precisa passar o produto inteiro, apenas o ID
    const url = `${this.baseUrl}/${id}`
    return this.http.delete<Product>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    ) 
  }
}
