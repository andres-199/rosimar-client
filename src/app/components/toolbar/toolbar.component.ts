import { Component, Input, OnInit } from '@angular/core';
import { UsersService } from 'src/app/users/users.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  @Input() isLoginPage?: boolean;

  constructor(private userService: UsersService) {}

  ngOnInit(): void {}

  onClickExit() {
    this.userService.logout();
  }
}
