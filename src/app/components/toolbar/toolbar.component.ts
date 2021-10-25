import { Component, Input, OnInit } from '@angular/core';
import { UsersService } from 'src/app/users/users.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  isLogedIn?: boolean;
  @Input() isAdminRoutes?: boolean;
  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.isLogedIn = this.userService.isLogedIn;
  }

  onClickExit() {
    this.userService.logout();
    this.isLogedIn = false;
  }
}
