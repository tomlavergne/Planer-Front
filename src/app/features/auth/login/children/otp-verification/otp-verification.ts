/***** Import Angular *****/
import { Component, signal, inject, computed, model, effect } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';

/***** Import de composants *****/
import { Flex, Text, Card, Button, Separator, Badge, Otp } from '@shared/components';
import { FormField } from '@shared/components/form/form-field/form-field';
import { InputEmail } from '@shared/components/form/input/variants/input-email';
import { Logo } from '@shared/components/misc/logo/logo';

@Component({
  selector: 'app-otp-verification',
  imports: [
    Flex,
    Text,
    Card,
    Button,
    Separator,
    Logo,
    FormField,
    Badge,
    Otp,
    InputEmail,
    TranslocoPipe,
  ],
  templateUrl: './otp-verification.html',
  styleUrl: './otp-verification.scss',
})
export class OtpVerification {
  email = model<string>('tom.lavergn@gmail.com'); // TODO: Récupérer l'email du composant parent ou du service d'authentification

  otp = model<string>('');
  otpError = model<string | null>(null);

  allowResend = signal(false);
  resendCooldown = signal(30);

  private cooldownInterval: any = null;

  isFormValid = computed(() => !this.otpError() && this.otp().length === 6);

  constructor() {
    // Démarre le compte à rebours au chargement du composant
    this.startCooldown();
  }

  ngOnDestroy() {
    // Nettoie l'interval quand le composant est détruit
    if (this.cooldownInterval) {
      clearInterval(this.cooldownInterval);
    }
  }

  /**
   * Démarre le compte à rebours de 30 secondes
   */
  startCooldown(): void {
    this.allowResend.set(false);
    this.resendCooldown.set(30);

    // Nettoie l'interval existant s'il y en a un
    if (this.cooldownInterval) {
      clearInterval(this.cooldownInterval);
    }

    // Démarre le nouveau compte à rebours
    this.cooldownInterval = setInterval(() => {
      const currentCooldown = this.resendCooldown();

      if (currentCooldown > 0) {
        this.resendCooldown.set(currentCooldown - 1);
      } else {
        this.allowResend.set(true);
        clearInterval(this.cooldownInterval);
        this.cooldownInterval = null;
      }
    }, 1000);
  }

  /**
   * Renvoie le code OTP
   */
  handleResendOtp(): void {
    if (this.allowResend()) {
      console.log('Renvoi du code OTP à:', this.email());
      // TODO: Appeler le service d'authentification pour renvoyer l'OTP
      this.startCooldown();
    }
  }

  handleSubmit(): void {
    if (this.isFormValid()) {
      console.log('Vérification OTP pour:', {
        email: this.email(),
        otp: this.otp(),
      });
    }
  }
}
