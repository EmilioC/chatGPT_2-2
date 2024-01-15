import { Injectable } from '@angular/core';
import OpenAI from 'openai'; // Asegúrate de que el SDK de OpenAI esté instalado y disponible
import { environment } from '../environments/environment';
import { ChatWithBot, ResponseModel } from '../models/gpt-response';

@Injectable({
  providedIn: 'root'
})
export class ChatgptService {
  private openai: OpenAI;
  response!: ResponseModel;
  chatConversation: ChatWithBot[] = [];
  messages: string[] = [];

  constructor() {
    // Inicializa el cliente de OpenAI con la API Key desde el archivo de entorno
    this.openai = new OpenAI({ apiKey: environment.apiKey, dangerouslyAllowBrowser: true });
  }

  // Método para obtener una respuesta de GPT-3.5
  async getResponse(message: string): Promise<any> {
    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "system", content: "Eres un cómico español satírico del siglo 18" },
        { role: "user", content: message }]
        , temperature: 1,
        max_tokens: 100
      });
      console.log("RESPONSE: " + response.choices[0].message.content);
      return response.choices[0].message.content; // Retorna solo el contenido del mensaje de respuesta
    } catch (error) {
      console.error('Error al solicitar a OpenAI:', error);
      throw error; // O maneja el error según lo requiera tu aplicación
    }
  }
}

