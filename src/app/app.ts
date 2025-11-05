import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, Header, Footer, FontAwesomeModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})


export class App {}
