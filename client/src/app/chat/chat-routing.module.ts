import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatsComponent } from '../chat/components/chats/chats.component';

const routes: Routes = [
  { path: 'chatrooms', component: ChatsComponent },
  { path: '**', redirectTo: 'chatrooms', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatRoutingModule {}
