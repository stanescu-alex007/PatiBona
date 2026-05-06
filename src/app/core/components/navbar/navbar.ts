import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  readonly darkMode = signal(false);
  readonly mobileOpen = signal(false);

  toggleTheme(): void {
    this.darkMode.update(v => !v);
    document.body.classList.toggle('dark-theme', this.darkMode());
  }

  toggleMobile(): void {
    this.mobileOpen.update(v => !v);
  }

  closeMobile(): void {
    this.mobileOpen.set(false);
  }
}
