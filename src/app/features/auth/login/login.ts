/***** Import Angular *****/
import { Component, signal, computed, model } from '@angular/core';

/***** Import de composants *****/
import { Flex, Text, Card, Button, Separator } from '@shared/components';
import { FormField } from '@shared/components/form/form-field/form-field';
import { InputEmail } from '@shared/components/form/input/variants/input-email';
import { InputPassword } from '@shared/components/form/input/variants/input-password';
import { Logo } from '@shared/components/misc/logo/logo';

@Component({
  selector: 'app-login',
  imports: [Flex, Text, Card, Button, Separator, Logo, FormField, InputEmail, InputPassword],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
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
  isFormValid = computed(
    () =>
      !this.emailError() && !this.passwordError() && this.email() !== '' && this.password() !== '',
  );

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
    }
  }
}
