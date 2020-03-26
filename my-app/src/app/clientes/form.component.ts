import { Component, OnInit } from '@angular/core';
import {Cliente} from './cliente';
import {ClienteService} from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  private cliente:Cliente = new Cliente();
  private titulo:string = 'Crear Cliente';

  constructor(private clienteService: ClienteService, private router: Router,
              private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarCliente();
  }

  cargarCliente(): void{
    this.activateRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.clienteService.getCliente(id).subscribe(
          (cliente) => this.cliente = cliente
        );
      }
    });

  }

  create():void{
    /*
    console.log("Clicked!");
    console.log(this.cliente);
    */
    this.clienteService.create(this.cliente)
      .subscribe(cliente => {
        this.router.navigate(['/clientes'])
        swal.fire({title:'Nuevo cliente', text: `Usuario ${cliente.nombre} Creado con exito`})
      }
    );

  }

  update(): void{
  this.clienteService.update(this.cliente)
    .subscribe( cliente => {
      this.router.navigate(['/clientes'])
      // swal('Cliente Actualizado',`Cliente ${cliente.nombre} Actualizado con exito`,'success')
      swal.fire({title: 'Cliente actualizado', text: `Cliente ${cliente.nombre} actualizado con exito`})
      }
    );
  }


}
