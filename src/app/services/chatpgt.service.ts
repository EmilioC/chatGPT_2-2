import { Injectable } from '@angular/core';
import OpenAI from 'openai'; // Asegúrate de que el SDK de OpenAI esté instalado y disponible
import { environment } from '../environments/environment';
import { ChatWithBot } from '../models/gpt-response';

@Injectable({
  providedIn: 'root'
})
export class ChatgptService {
  private openai: OpenAI;
  response!: any;
  chatConversation: ChatWithBot[] = [];

  constructor() {
    // Inicializa el cliente de OpenAI con la API Key desde el archivo de entorno
    this.openai = new OpenAI({ apiKey: environment.apiKey, dangerouslyAllowBrowser: true });
  }

  // Método para agregar contenido al chat
  pushChatContent(content: string, person: string, cssClass: string) {
    const chatToPush: ChatWithBot = { person: person, response: content, cssClass: cssClass };
    console.log("CHAT TO PUSH", chatToPush);
    this.chatConversation.unshift(chatToPush);
    return this.chatConversation;
  }

  // Añadir la pregunta del usuario al chat
  addUserQuestionToChat(question: string) {
    this.pushChatContent(question, 'USER', 'user-css-class');
  }

  // Método para obtener una respuesta de GPT-3.5
  async getResponse(message: string) {
    try {
      const apiResponse = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Eres un cómico español satírico del siglo 18" },
          { role: "user", content: message }
        ],
        temperature: 1,
        max_tokens: 100
      });
      console.log("RESPONSE BRUTO: ", apiResponse);

      this.response = apiResponse.choices;

      this.pushChatContent(this.response[0].message.content, 'BOT', 'bot-css-class');

      return apiResponse.choices[0].message.content; // Retorna solo el contenido del mensaje de respuesta

    } catch (error) {
      console.error('Error al solicitar a OpenAI:', error);
      throw error; // O maneja el error según lo requiera tu aplicación
    }
  }
}
