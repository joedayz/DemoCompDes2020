import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})

export class FormComponent implements OnInit {


  cliente: Cliente = new Cliente();
  titulo: string = "Crear Cliente";

  errores : string[];

  constructor(private clienteService: ClienteService,
    private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarCliente();
  }


  cargarCliente() {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.clienteService.getCliente(id).subscribe(
          (cliente) => this.cliente = cliente
        )
      }
    })
  }
  create(): void {
    this.clienteService.create(this.cliente).subscribe(
      cliente =>{
              this.router.navigate(['/clientes'])
              swal('Nuevo Cliente', `Cliente ${cliente.nombre} creado con exito!`, 'success')
            },
      err => {
              this.errores = err.error.errors as string[];
              console.error('Codigo del error desde el backend:  ' + err.status);
              console.error(err.error.errors);
            }
      );
  }

  update(): void {
    this.clienteService.update(this.cliente).subscribe(cliente =>{
      this.router.navigate(['/clientes'])
      swal('Cliente Actualizado', `Cliente ${cliente.nombre} actualizado con exito!`, 'success')
    } );
  }


}
