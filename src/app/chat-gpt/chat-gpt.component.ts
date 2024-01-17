import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatgptService } from '../services/chatgpt.service';
import { FormsModule } from '@angular/forms';
import { ChatWithBot } from '../models/gpt-response';


@Component({
  selector: 'app-chat-gpt',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat-gpt.component.html',
  styleUrl: './chat-gpt.component.css'
})
export class ChatGPTComponent {

  promptText = '¿Por qué llueve caramelos?';
  chatConversation: ChatWithBot[] = [];
  showSpinner = false;

  constructor(private chatgptSvc: ChatgptService) { }

  async checkResponse() {
    try {
      this.showSpinner = true
      const response = await this.chatgptSvc.getResponse(this.promptText);
      if (response) {
        const chat = this.chatgptSvc.pushChatContent(response, 'BOT', 'USER');
        console.log("CHAT", chat);
        this.chatConversation = chat;
        this.showSpinner = false// Cambia 'Fistro pecador' y 'person' según sea necesario
      }
      // this.promptText = '';
    } catch (error) {
      console.error('Error al obtener la respuesta del servicio:', error);
    }
  }


  getText(data: string) {
    // Verifica si 'data' está definido y no es null antes de llamar a 'split'
    if (data) {
      return data.split('\n').filter(f => f.length > 0);
    } else {
      // Retorna un valor predeterminado o un array vacío si 'data' es undefined o null
      return [];
    }
  }
}
