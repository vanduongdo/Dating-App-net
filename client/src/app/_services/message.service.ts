import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PaginatedResult } from '../_models/pagination';
import { Message } from '../_models/message';
import { setPaginatedResponse, setPaginationHeaders } from './paginationHelper';
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
} from '@microsoft/signalr';
import { User } from '../_models/user';
import { Group } from '../_models/group';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  baseUrl = environment.apiUrl;
  hubUrl = environment.hubsUrl;
  private http = inject(HttpClient);
  hubConnection?: HubConnection;
  paginatedResult = signal<PaginatedResult<Message[]> | null>(null);
  messageThread = signal<Message[]>([]);

  createHubConnection(user: User, otherUsername: string) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'message?user=' + otherUsername, {
        accessTokenFactory: () => user.token,
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start().catch((error) => {
      console.log(error);
    });

    this.hubConnection.on('ReceiveMessageThread', (messages) => {
      this.messageThread.set(messages);
    });

    this.hubConnection.on('NewMessage', (message) => {
      this.messageThread.update((messages) => [...messages, message]);
    });

    this.hubConnection.on('UpdatedGroup', (group: Group) => {
      if (group.connections.some((x) => x.username === otherUsername)) {
        this.messageThread.update((message) => {
          message.forEach((m) => {
            if (!m.dateRead) {
              m.dateRead = new Date(Date.now());
            }
          });
          return message;
        });
      }
    });
  }

  stopHubConnection() {
    if (this.hubConnection?.state === HubConnectionState.Connected) {
      this.hubConnection.stop().catch((error) => {
        console.log(error);
      });
    }
  }

  getMessages(pageNumber: number, pageSize: number, container: string) {
    let params = setPaginationHeaders(pageNumber, pageSize);

    params = params.append('container', container);

    return this.http
      .get<Message[]>(this.baseUrl + 'messages', {
        observe: 'response',
        params,
      })
      .subscribe({
        next: (res) => setPaginatedResponse(res, this.paginatedResult),
      });
  }

  getMessageThread(username: string) {
    return this.http.get<Message[]>(
      this.baseUrl + 'messages/thread/' + username
    );
  }

  async sendMessage(username: string, content: string) {
    return this.hubConnection?.invoke('SendMessage', {
      recipientUsername: username,
      content,
    });
  }

  deleteMessage(id: number) {
    return this.http.delete(this.baseUrl + 'messages/' + id);
  }
}
