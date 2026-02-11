/***** Import Angular *****/
import { Component, signal, inject, computed, model } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';

/***** Import de composants *****/
import { Flex, Text, Card, Button, Separator } from '@shared/components';
import { FormField } from '@shared/components/form/form-field/form-field';
import { InputEmail } from '@shared/components/form/input/variants/input-email';
import { Logo } from '@shared/components/misc/logo/logo';

@Component({
  selector: 'app-login',
  imports: [Flex, Text, Card, Button, Separator, Logo, FormField, InputEmail, TranslocoPipe],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  router = inject(Router);
  // Valeurs du formulaire
  email = model<string>('');
  password = model<string>('');

  // Messages d'erreur (synchronisés automatiquement via two-way binding avec les variants)
  emailError = model<string | null>(null);
  passwordError = model<string | null>(null);

  passwordValidator = () => {
    return null; // Valide
  };

  // Validation du formulaire
  isFormValid = computed(() => !this.emailError() && this.email() !== '');

  /**
   * Soumet le formulaire
   */
  handleSubmit(): void {
    // Si valide, soumet
    if (this.isFormValid()) {
      console.log('Connexion avec:', {
        email: this.email(),
        password: this.password(),
      });
      // TODO: Appel API de connexion ici

      // Redirection vers la page d'accueil après connexion
      this.router.navigate(['/']);
    }
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
