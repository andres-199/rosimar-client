import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { UsersService } from 'src/app/users/users.service';

declare var document: any;

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {

  isLogedIn?: boolean;
  @Input() isAdminRoutes?: boolean;
  @Output() toggleMenu = new EventEmitter<boolean>()

  constructor (
    private userService: UsersService,
    public commonService: CommonService,
  ) { }

  ngOnInit (): void {
    this.isLogedIn = this.userService.isLogedIn;
  }

  onClickExit () {
    this.userService.logout();
    this.isLogedIn = false;
  }

  onClickContact () {
    document.querySelector('#contact').scrollIntoView();
  }
}
