import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../../models/producto';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrl: './crear-producto.component.css'
})
export class CrearProductoComponent implements OnInit {
  productoForm: FormGroup;
  titulo = 'crear producto';
  id: string | null;
  boton = 'crear';

  constructor(private formBuilder: FormBuilder, private router: Router, private toast: ToastrService, private productoService: ProductoService, private activatedRoute: ActivatedRoute){
    this.productoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: ['', Validators.required]
    });
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(){
    this.esEditar();
  }

  producto(){
    // this.productoForm.get('producto')?.value;
    const nuevoProducto: Producto = {
      nombre: this.productoForm.value.nombre,
      categoria: this.productoForm.value.categoria,
      ubicacion: this.productoForm.value.ubicacion,
      precio: this.productoForm.value.precio
    }

    // EDITAR
    if(this.id !== null){
      this.productoService.editarProducto(this.id, nuevoProducto).subscribe({
        next: (data) => {
          this.router.navigateByUrl('/');
          this.toast.info('¡El producto fue editado correctamente!', 'Producto Editado');
        },
        error: (error) => {
          console.error(error);
          this.productoForm.reset();
        }
      });
    }
    // CREAR
    else{
      this.productoService.guardarProducto(nuevoProducto).subscribe({
        next: (data) => {
          this.router.navigateByUrl('/');
          this.toast.success('¡El producto fue registrado correctamente!', 'Producto Registrado');
        },
        error: (error) => {
          console.error(error);
          this.productoForm.reset();
        }
      });
    }
  }

  esEditar(){
    if(this.id !== null){
      this.titulo = 'editar producto';
      this.boton = 'editar';
      this.productoService.obtenerProducto(this.id).subscribe({
        next: (data) => {
          this.productoForm.setValue({
            nombre: data.nombre,
            categoria: data.categoria,
            ubicacion: data.ubicacion,
            precio: data.precio
          });
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }
}