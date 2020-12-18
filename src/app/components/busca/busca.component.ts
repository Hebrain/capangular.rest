import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Estabelecimento } from 'src/app/models/estabelecimento.model';
import { Coordenada } from 'src/app/models/coordenada.model';
import { BuscaService } from 'src/app/services/busca.service';
import { NgForm } from '@angular/forms';
import { Validators,FormControl } from '@angular/forms';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.component.html',
  styleUrls: ['./busca.component.css']
})
export class BuscaComponent implements OnInit {

  estabelecimentos: Estabelecimento[] = [];

  constructor(private service:BuscaService) { }

  ngOnInit(): void {

  }

  onSubmit(form: NgForm){


    var km : number = form.value.valor;
    this.service.getIp().subscribe((resIp: Ip) => {

      this.service.getCoordinates(resIp.ip).subscribe((resCoord: any) => {

        this.service.getEstablishment().subscribe((respEstab: any) => {
          console.log(km);
          this.estabelecimentos = this.service.getBy(resCoord, respEstab, km);

        });

      });
    });
  }

}

export interface Ip{ip: string;}
