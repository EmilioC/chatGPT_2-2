import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatgptService } from '../services/chatgpt.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-chat-gpt',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chat-gpt.component.html',
  styleUrl: './chat-gpt.component.css'
})
export class ChatGPTComponent {

  promptText = '¿Por qué llueve arroz los martes?';

  constructor(private chatgptSvc: ChatgptService) { }

  checkResponse() {
    console.log("PROMPT: " + this.promptText);
    console.log("START -- checkResponse");
    this.chatgptSvc.getResponse(this.promptText);
    console.log("END -- checkResponse");
  }




  /*   sendMessage() {

      this.chatgptSvc.getDataFromOpenAI(this.message);
      this.message = '';
    } */

  limpiar() {

    location.reload();

  }

}
