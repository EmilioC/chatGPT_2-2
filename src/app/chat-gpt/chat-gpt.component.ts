import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatgptService } from '../services/chatpgt.service';
import { FormsModule } from '@angular/forms';
import { ChatWithBot } from '../models/gpt-response';

@Component({
  selector: 'app-chat-gpt',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat-gpt.component.html',
  styleUrls: ['./chat-gpt.component.css']
})
export class ChatGPTComponent {

  promptText = '';
  chatConversation: ChatWithBot[] = [];
  showSpinner = false;

  constructor(private chatgptSvc: ChatgptService) { }

  async checkResponse() {
    try {
      this.showSpinner = true;

      // Añadir pregunta del usuario al chat antes de obtener la respuesta
      this.chatgptSvc.addUserQuestionToChat(this.promptText);

      const response = await this.chatgptSvc.getResponse(this.promptText);
      if (response) {
        // No es necesario llamar a pushChatContent aquí, ya que se llama dentro de getResponse

        this.chatConversation = this.chatgptSvc.chatConversation;
        this.showSpinner = false;
        this.promptText = "";
      }
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
