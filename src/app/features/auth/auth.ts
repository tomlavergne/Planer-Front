/***** Import Angular *****/
import { Component, signal, inject, computed, model } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';

/***** Import de composants *****/
import { Flex, Text, Card, Button, Separator, Otp } from '@shared/components';
import { FormField } from '@shared/components/form/form-field/form-field';
import { InputEmail } from '@shared/components/form/input/variants/input-email';
import { Logo } from '@shared/components/misc/logo/logo';

@Component({
  selector: 'app-auth',
  imports: [
    Flex,
    Text,
    Card,
    Button,
    Separator,
    Logo,
    FormField,
    Otp,
    InputEmail,
    TranslocoPipe,
    RouterOutlet,
  ],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {
  router = inject(Router);

  goHome(): void {
    this.router.navigate(['/']);
  }
}
