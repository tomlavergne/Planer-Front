import { Component } from '@angular/core';
import { Popover } from '../../shared/components/overlay/popover/popover';

@Component({
  selector: 'app-users',
  imports: [Popover],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users {}
