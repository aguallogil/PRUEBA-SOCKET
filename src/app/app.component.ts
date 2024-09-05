// src/app/app.component.ts
import { Component, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth.service';
import { WebSocketService } from './services/web-socket.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  username: string = 'delso';
  password: string = 'Delso2024$';

  constructor(
    private authService: AuthService,
    private webSocketService: WebSocketService
  ) {}

  login(): void {
    this.authService.login(this.username, this.password).subscribe(
      token => {
        console.log('Logged in with token:', token);
        this.webSocketService.disconnect(); // Disconnect any existing WebSocket connection
        this.webSocketService.connect(token); // Connect with the new token
      },
      error => {
        console.error('Login failed:', error);
      }
    );
  }

  logout(): void {
    this.authService.logout();
    this.webSocketService.disconnect();
    console.log('Logged out.');
  }
  ngOnDestroy(): void {
    this.webSocketService.disconnect();
    console.log('Component destroyed. WebSocket connection closed.');
  }
}
