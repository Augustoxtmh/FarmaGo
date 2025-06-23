import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-buttons';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import 'datatables.net-buttons/js/buttons.colVis';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserAdminComponent implements AfterViewInit {
  usuarios: Usuario[] = [];

  constructor(private usuarioServ: UsuarioService) {
    
  }

  ngAfterViewInit(): void {
    this.usuarioServ.getAll().subscribe({
      next: (res) => {
        if (res) {
          this.usuarios = res;
          setTimeout(() => {
            ($('#usersTable') as any).DataTable({
              responsive: true,
              paging: true,
              ordering: true,
              info: true,
              searching: true,
              pageLength: 7,
              lengthMenu: [5, 10, 20],
              dom: 'Bfrtip',
              buttons: [
                { extend: 'copyHtml5', text: 'Copiar', action: () => alert('Copiado al portapapeles') },
                { extend: 'excelHtml5', text: 'Excel' },
                { extend: 'pdfHtml5', text: 'PDF' },
                { extend: 'print', text: 'Imprimir' },
                { extend: 'colvis', text: 'Mostrar' }
              ],
              language: {
                url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json'
              }
            });

            $('.dataTables_paginate').addClass('ms-auto');
          }, 0);
        } else {
          window.alert('Error al buscar los datos');
        }
      },
      error: (err) => {
        console.error('Error de login:', err);
      }
    });
  }

}
