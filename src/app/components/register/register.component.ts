import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClergyService } from '../../services/clergy.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  template: `
    <div class="min-h-screen bg-gray-50 py-12 px-4">
      <div class="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 class="text-3xl font-bold mb-8">Cadastro de Presbítero</h2>
        
        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700">Nome Completo</label>
              <input type="text" formControlName="name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700">Tipo</label>
              <select formControlName="type" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option value="priest">Padre</option>
                <option value="bishop">Bispo</option>
                <option value="deacon">Diácono</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Diocese</label>
              <input type="text" formControlName="diocese" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Paróquia</label>
              <input type="text" formControlName="parish" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" formControlName="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Telefone</label>
              <input type="tel" formControlName="phone" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Biografia</label>
            <textarea formControlName="bio" rows="4" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Documento de Ordenação</label>
            <input type="file" (change)="onOrdinationDocumentSelected($event)" accept=".pdf,.doc,.docx" class="mt-1 block w-full">
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Foto de Perfil</label>
            <input type="file" (change)="onProfileImageSelected($event)" accept="image/*" class="mt-1 block w-full">
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700">Facebook</label>
              <input type="text" formControlName="facebook" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Instagram</label>
              <input type="text" formControlName="instagram" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Twitter</label>
              <input type="text" formControlName="twitter" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            </div>
          </div>

          <div class="flex justify-end">
            <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
              Enviar Cadastro
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class RegisterComponent {
  form: FormGroup;
  profileImage: File | null = null;
  ordinationDocument: File | null = null;

  constructor(
    private fb: FormBuilder,
    private clergyService: ClergyService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      type: ['priest', Validators.required],
      diocese: ['', Validators.required],
      parish: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      bio: ['', Validators.required],
      facebook: [''],
      instagram: [''],
      twitter: ['']
    });
  }

  onProfileImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.profileImage = file;
    }
  }

  onOrdinationDocumentSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.ordinationDocument = file;
    }
  }

  async onSubmit() {
    if (this.form.valid && this.profileImage && this.ordinationDocument) {
      try {
        const profileImagePath = await this.clergyService.uploadImage(this.profileImage);
        const ordinationDocPath = await this.clergyService.uploadImage(this.ordinationDocument);

        const clergyData = {
          ...this.form.value,
          profileImage: profileImagePath,
          ordinationDocument: ordinationDocPath,
          socialMedia: {
            facebook: this.form.value.facebook,
            instagram: this.form.value.instagram,
            twitter: this.form.value.twitter
          }
        };

        this.clergyService.createClergy(clergyData).subscribe(() => {
          this.router.navigate(['/']);
        });
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  }
}