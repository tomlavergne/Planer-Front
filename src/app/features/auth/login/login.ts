/***** Import Angular *****/
import { Component, signal, inject, computed, model } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';

/***** Import de composants *****/
import { Flex, Button } from '@shared/components';
import { EmailRequest } from './children/email-request/email-request';
import { OtpVerification } from './children/otp-verification/otp-verification';

@Component({
  selector: 'app-login',
  imports: [Flex, Button, EmailRequest, OtpVerification, TranslocoPipe],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  router = inject(Router);

  mode = signal<'login' | 'otp'>('login');

  requestOtp(email: string): void {
    console.log('Demande OTP pour:', email);
    this.mode.set('otp');
  }

  goBack(): void {
    if (this.mode() === 'otp') {
      this.mode.set('login');
    } else {
      this.router.navigate(['/']);
    }
  }
}
