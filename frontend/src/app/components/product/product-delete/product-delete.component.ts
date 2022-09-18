import { Component, OnInit } from '@angular/core';
import { Product } from '../product-create/product.model';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {
  product: Product


  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) { }//consulta no BD

  ngOnInit(): void { 
    const id = this.route.snapshot.paramMap.get('id') as string; //para pegar o ID
    this.productService.readById(id).subscribe(product => {
      this.product = product
    })

  }
  deleteProduct(): void {
    this.productService.delete(`${this.product.id}`).subscribe(() => {
      this.productService.showMessage('Produto deletado com sucesso!');
      this.router.navigate(['/products'])
    })
  }
 cancel():void {
    this.router.navigate(['/products']);
  }
}
