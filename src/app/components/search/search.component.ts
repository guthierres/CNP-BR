import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ClergyService } from '../../services/clergy.service';
import { Clergy } from '../../models/clergy.model';

@Component({
  selector: 'app-search',
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Hero Section -->
      <div class="bg-gradient-to-r from-blue-600 to-blue-800 py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 class="text-4xl font-bold text-white mb-4">
            Cadastro Nacional de Presbíteros
          </h1>
          <p class="text-xl text-blue-100 mb-8">
            Encontre informações sobre padres, bispos e diáconos em todo o Brasil
          </p>
          
          <div class="max-w-2xl mx-auto relative">
            <i class="pi pi-search absolute left-4 top-4 text-gray-400"></i>
            <input
              [formControl]="searchControl"
              type="text"
              placeholder="Buscar por nome ou diocese..."
              class="w-full p-4 pl-12 rounded-lg shadow-lg border-0 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <!-- Statistics -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white rounded-lg shadow-lg p-6 text-center">
            <i class="pi pi-users text-4xl text-blue-600 mb-4"></i>
            <h3 class="text-2xl font-bold text-gray-900">{{statistics.total}}</h3>
            <p class="text-gray-600">Presbíteros Cadastrados</p>
          </div>
          <div class="bg-white rounded-lg shadow-lg p-6 text-center">
            <i class="pi pi-map-marker text-4xl text-blue-600 mb-4"></i>
            <h3 class="text-2xl font-bold text-gray-900">{{statistics.dioceses}}</h3>
            <p class="text-gray-600">Dioceses</p>
          </div>
          <div class="bg-white rounded-lg shadow-lg p-6 text-center">
            <i class="pi pi-home text-4xl text-blue-600 mb-4"></i>
            <h3 class="text-2xl font-bold text-gray-900">{{statistics.parishes}}</h3>
            <p class="text-gray-600">Paróquias</p>
          </div>
        </div>
      </div>

      <!-- Search Results -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div *ngIf="results.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            *ngFor="let clergy of results"
            (click)="viewProfile(clergy.id)"
            class="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-200"
          >
            <img
              [src]="clergy.profileImage || 'assets/default-avatar.png'"
              class="w-full h-48 object-cover"
            />
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-2">{{clergy.name}}</h3>
              <p class="text-gray-600 mb-4">{{clergy.type | titlecase}}</p>
              <div class="flex items-center text-gray-500">
                <i class="pi pi-map-marker mr-2"></i>
                <span>{{clergy.diocese}}</span>
              </div>
              <div class="flex items-center text-gray-500 mt-2">
                <i class="pi pi-home mr-2"></i>
                <span>{{clergy.parish}}</span>
              </div>
            </div>
          </div>
        </div>

        <div *ngIf="searchControl.value && results.length === 0" class="text-center py-12">
          <i class="pi pi-search text-4xl text-gray-400 mb-4"></i>
          <p class="text-gray-600">Nenhum resultado encontrado</p>
        </div>
      </div>
    </div>
  `
})
export class SearchComponent {
  searchControl = new FormControl('');
  results: Clergy[] = [];
  statistics = {
    total: 0,
    dioceses: 0,
    parishes: 0
  };

  constructor(
    private clergyService: ClergyService,
    private router: Router
  ) {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => this.clergyService.searchClergy(query || ''))
    ).subscribe(results => this.results = results);

    this.loadStatistics();
  }

  loadStatistics() {
    this.clergyService.getStatistics().subscribe(stats => {
      this.statistics = stats;
    });
  }

  viewProfile(id: string) {
    this.router.navigate(['/profile', id]);
  }
}