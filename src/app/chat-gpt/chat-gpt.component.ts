import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-gpt',
  standalone: true,
  imports: [],
  templateUrl: './chat-gpt.component.html',
  styleUrl: './chat-gpt.component.css'
})
export class ChatGPTComponent {

  showSpinner = false;
  chatConversation: [] = [];

}
