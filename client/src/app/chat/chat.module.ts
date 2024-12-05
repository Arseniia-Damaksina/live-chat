import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatsComponent } from './components/chats/chats.component';
import { ChatRoutingModule } from './chat-routing.module';



@NgModule({
  declarations: [
    ChatsComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule
  ]
})
export class ChatModule { }
