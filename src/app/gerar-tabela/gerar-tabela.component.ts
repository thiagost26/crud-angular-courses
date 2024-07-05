import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gerar-tabela',
  templateUrl: './gerar-tabela.component.html',
  standalone: true,
  styleUrl: './gerar-tabela.component.scss',
  imports: [FormsModule]
})
export class GerarTabelaComponent {

  upm: string = 'BOPE';
  chegada: string = 'OUT/2010';
  saida: string = 'MAI/2011';
  origem: string = 'Ofício SEI nº 698 (140018409)';
  recebido: string = 'Ofício SEI nº 699 (140018630)';
  exercicios: string[] = ["NG", "NG"];

  addExercicio() {
    for (let i = 0; i < 6; i++) {
      const exercicio = 'NG';
      console.log(exercicio);
    }

  }


  dataList: {
    upm: string;
    chegada: string;
    saida: string;
    origem: string;
    recebido: string;
    exercicio: string[];
  }[] = [];


  addData() {
    if (this.upm && this.chegada && this.saida && this.origem && this.recebido && this.exercicios) {
      this.dataList.push({
        upm: this.upm,
        chegada: this.chegada,
        saida: this.saida,
        origem: this.origem,
        recebido: this.recebido,
        exercicio: this.exercicios
      });
      this.upm = '';
      this.chegada = '';
      this.saida = '';
      this.origem = '';
      this.recebido = '';
      this.exercicios = [];
    }
  }

}
