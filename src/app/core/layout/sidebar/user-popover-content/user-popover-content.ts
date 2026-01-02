import { Component } from '@angular/core';

import { Button } from '../../../../shared/components/forms/button/button';
import { Avatar } from '../../../../shared/components/display/avatar/avatar';
import { Popover } from '../../../../shared/components/overlay/popover/popover';

@Component({
  selector: 'app-user-popover-content',
  imports: [Button, Popover],
  templateUrl: './user-popover-content.html',
  styleUrl: './user-popover-content.scss',
})
export class UserPopoverContent {}
