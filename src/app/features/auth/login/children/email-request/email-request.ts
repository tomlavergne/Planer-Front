/***** Import Angular *****/
import { Component, computed, output, model } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

/***** Import de composants *****/
import { Flex, Text, Card, Button, Separator } from '@shared/components';
import { FormField } from '@shared/components/form/form-field/form-field';
import { InputEmail } from '@shared/components/form/input/variants/input-email';
import { Logo } from '@shared/components/misc/logo/logo';

@Component({
  selector: 'app-email-request',
  imports: [Flex, Text, Card, Button, Separator, Logo, FormField, InputEmail, TranslocoPipe],
  templateUrl: './email-request.html',
  styleUrl: './email-request.scss',
})
export class EmailRequest {
  // Valeurs du formulaire
  email = model<string>('');

  // Messages d'erreur (synchronisés automatiquement via two-way binding avec les variants)
  emailError = model<string | null>(null);

  // Validation du formulaire
  isFormValid = computed(() => !this.emailError() && this.email() !== '');

  submit = output<{ email: string }>();

  /**
   * Soumet le formulaire
   */
  handleSubmit(): void {
    // Si valide, soumet
    if (this.isFormValid()) {
      console.log('Connexion avec:', {
        email: this.email(),
      });
      this.submit.emit({ email: this.email() }); // TODO: Émettre un événement personnalisé pour que le composant parent puisse réagir
      // TODO: Appel API de connexion ici
    }
  }
}
