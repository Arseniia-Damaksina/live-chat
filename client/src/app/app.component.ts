import { Component } from '@angular/core';
import { HttpService } from './services/http.service';
import { Observable } from 'rxjs';

interface Message {
  message: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: false
})
export class AppComponent {


  value: Observable<any> = this.httpService.getConnection();

  constructor(private httpService: HttpService) {}
}
