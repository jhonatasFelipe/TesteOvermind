import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { confirmPaswordValidator } from './Validators/confirmpasword.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Overmind';
  dark:boolean = false; 
  sucess : boolean = false;
  error : boolean = false;
  sended : boolean = false;
  sending : boolean = false;

  public constructor(private http:HttpClient){

  }

  public form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('',[Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    repassword: new FormControl('', [Validators.required, confirmPaswordValidator])
  },{validators: confirmPaswordValidator});


  sendForm(){
    this.sending =  true; 
    let email:any = {
      nome: this.form.get('name')?.value,
      mail: this.form.get('email')?.value,
      telefone: this.form.get('phone')?.value,
      mensagem: "Olá este é o e-mail que mostra que eu terminei o teste"
    }
    alert(JSON.stringify(email));
    this.http.post('https://formspree.io/f/mknyljbr', email).subscribe(
    ()=>{ 
      this.sucess = true;
      this.sended = true;
      this.sending = false; 
    },
    () => {
      this.error = true;
      this.sended = true;
      this.sending = false; 
    })
  }

  newEmail(){
    this.form.reset();
    this.sended = false;
    this.error = false;
    this.sucess = false;
  }

}
