// validar se o arquivo  é uma imagem com base nos bits iniciais

// todo form control passa no teste é um Abstract control

import { AbstractControl } from '@angular/forms';
import { Observable, Observer } from 'rxjs';

export const mimeTypeValidator = (
  control: AbstractControl
): Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> => {
  const arquivo = control.value as File;
  const leitor = new FileReader();
  const observable = new Observable(
    (observer: Observer<{ [key: string]: any }>) => {
      leitor.addEventListener('loadend', () => {
        // U - unsigned == numero de 8 bits todos para representar os dados, nenhum representa sinal
        const bytes = new Uint8Array(leitor.result as ArrayBuffer).subarray(
          0,
          4
        ); // pega os primeiros 4 bytes = 32 bits
        let valido: boolean = false;
        let header = '';
        for (let i = 0; i < bytes.length; i++) {
          header += bytes[i].toString(16);
        }
        console.log(header);
        switch (header) {
          // png
          case '89504e47':
          // variacoes de jpeg
          case 'ffd8ffe0':
          case 'ffd8ffe1':
          case 'ffd8ffe2':
          case 'ffd8ffe3':
          case 'ffd8ffe8':
          case '424db682': // bitmap
            valido = true;
          break;
          default:
            valido = false;
        }

        observer.next(valido ? null : { mimeTypeInvalido: true });
        observer.complete();
      });

      leitor.readAsArrayBuffer(arquivo);
    }
  );

  return observable;
};
