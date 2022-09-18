import { Product } from './product-create/product.model';
import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = 'http://localhost:3001/products'

  constructor(private snackBar: MatSnackBar,
    private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }
  create(product: Product): Observable<Product> { //retorna observable de produto
    return this.http.post<Product>(this.baseUrl, product) //como faz checagem de tipos, é preciso retornar tipo observable de produto
  }
  read(): Observable<Product[]> { //irá ler uma array de produtos
    return this.http.get<Product[]>(this.baseUrl) //retorna array de produtos
  }
  readById(id: string): Observable<Product> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Product>(url)
  }
}
