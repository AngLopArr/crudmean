import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrl: './listar-productos.component.css'
})
export class ListarProductosComponent implements OnInit{
  
  productos: Producto[] = [];

  constructor(private productoService: ProductoService, private toast: ToastrService){}

  ngOnInit(){
    this.obtenerProductos();
  }

  obtenerProductos(){
    this.productoService.getProductos().subscribe({
    next: (data) => {
      this.productos = data;
    }, 
    error: (error) => {
      console.error(error);
    }});
  }

  eliminarProducto(id: any){
    this.productoService.eliminarProducto(id).subscribe({
      next: (data) => {
        // Este código, por alguna razón, evita el funcionamiento del 'toast'
        // let indice = this.productos.findIndex(producto => {
        //   producto._id == id;
        // })
        // this.productos.splice(indice, 1);

        this.obtenerProductos();
        this.toast.error("El producto fue eliminado correctamente.", "Producto Eliminado");
      }, 
      error: (error) => {
        console.error(error);
      }});
  }
}
