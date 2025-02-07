import { Component, OnInit } from '@angular/core';
import { ClergyService } from '../../services/clergy.service';
import { AuthService } from '../../services/auth.service';
import { Clergy } from '../../models/clergy.model';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-admin',
  template: `
    <div class="min-h-screen bg-slate-50">
      <!-- Navbar -->
      <nav class="bg-[#1B3461] shadow-sm sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex items-center">
              <h1 class="text-xl font-semibold text-white">Painel Administrativo</h1>
            </div>
            <div class="flex items-center space-x-4">
              <span class="text-white">{{adminEmail}}</span>
              <button (click)="logout()" class="flex items-center text-white hover:text-gray-200 bg-[#2C4B8C] px-4 py-2 rounded-lg transition-colors">
                <i class="pi pi-sign-out mr-2"></i>
                Sair
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <!-- Statistics Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div class="flex items-center">
              <div class="p-3 rounded-full bg-[#E6EEF9] text-[#1B3461]">
                <i class="pi pi-users text-2xl"></i>
              </div>
              <div class="ml-4">
                <p class="text-gray-500 text-sm">Total de Cadastros</p>
                <h3 class="text-2xl font-bold text-[#1B3461]">{{statistics.total}}</h3>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div class="flex items-center">
              <div class="p-3 rounded-full bg-[#E6EEF9] text-[#1B3461]">
                <i class="pi pi-user text-2xl"></i>
              </div>
              <div class="ml-4">
                <p class="text-gray-500 text-sm">Padres</p>
                <h3 class="text-2xl font-bold text-[#1B3461]">{{statistics.priests}}</h3>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div class="flex items-center">
              <div class="p-3 rounded-full bg-[#E6EEF9] text-[#1B3461]">
                <i class="pi pi-user text-2xl"></i>
              </div>
              <div class="ml-4">
                <p class="text-gray-500 text-sm">Bispos</p>
                <h3 class="text-2xl font-bold text-[#1B3461]">{{statistics.bishops}}</h3>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div class="flex items-center">
              <div class="p-3 rounded-full bg-[#E6EEF9] text-[#1B3461]">
                <i class="pi pi-user text-2xl"></i>
              </div>
              <div class="ml-4">
                <p class="text-gray-500 text-sm">Diáconos</p>
                <h3 class="text-2xl font-bold text-[#1B3461]">{{statistics.deacons}}</h3>
              </div>
            </div>
          </div>
        </div>

        <!-- Tabs -->
        <div class="bg-white shadow rounded-xl mb-8">
          <p-tabView>
            <!-- Pending Registrations Tab -->
            <p-tabPanel header="Cadastros Pendentes">
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diocese</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data de Cadastro</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr *ngFor="let clergy of pendingClergy" class="hover:bg-gray-50">
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                          <img [src]="clergy.profileImage" class="h-10 w-10 rounded-full object-cover">
                          <div class="ml-4">
                            <div class="font-medium text-gray-900">{{clergy.name}}</div>
                            <div class="text-sm text-gray-500">{{clergy.email}}</div>
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                              [ngClass]="{
                                'bg-green-100 text-green-800': clergy.type === 'priest',
                                'bg-purple-100 text-purple-800': clergy.type === 'bishop',
                                'bg-yellow-100 text-yellow-800': clergy.type === 'deacon'
                              }">
                          {{clergy.type | titlecase}}
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">{{clergy.diocese}}</div>
                        <div class="text-sm text-gray-500">{{clergy.parish}}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {{clergy.createdAt | date:'dd/MM/yyyy'}}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button (click)="viewDetails(clergy)" 
                                class="text-[#1B3461] hover:text-[#2C4B8C] bg-[#E6EEF9] p-2 rounded-lg">
                          <i class="pi pi-eye"></i>
                        </button>
                        <button (click)="approveClergy(clergy.id)"
                                class="text-green-600 hover:text-green-900 bg-green-50 p-2 rounded-lg">
                          <i class="pi pi-check"></i>
                        </button>
                        <button (click)="rejectClergy(clergy.id)"
                                class="text-red-600 hover:text-red-900 bg-red-50 p-2 rounded-lg">
                          <i class="pi pi-times"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </p-tabPanel>

            <!-- Approved Registrations Tab -->
            <p-tabPanel header="Cadastros Aprovados">
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diocese</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Última Atualização</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr *ngFor="let clergy of approvedClergy" class="hover:bg-gray-50">
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                          <img [src]="clergy.profileImage" class="h-10 w-10 rounded-full object-cover">
                          <div class="ml-4">
                            <div class="font-medium text-gray-900">{{clergy.name}}</div>
                            <div class="text-sm text-gray-500">{{clergy.email}}</div>
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                              [ngClass]="{
                                'bg-green-100 text-green-800': clergy.type === 'priest',
                                'bg-purple-100 text-purple-800': clergy.type === 'bishop',
                                'bg-yellow-100 text-yellow-800': clergy.type === 'deacon'
                              }">
                          {{clergy.type | titlecase}}
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">{{clergy.diocese}}</div>
                        <div class="text-sm text-gray-500">{{clergy.parish}}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                              [ngClass]="{
                                'bg-green-100 text-green-800': clergy.isActive,
                                'bg-red-100 text-red-800': !clergy.isActive
                              }">
                          {{clergy.isActive ? 'Ativo' : 'Inativo'}}
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {{clergy.lastUpdate | date:'dd/MM/yyyy HH:mm'}}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button (click)="viewDetails(clergy)"
                                class="text-[#1B3461] hover:text-[#2C4B8C] bg-[#E6EEF9] p-2 rounded-lg">
                          <i class="pi pi-eye"></i>
                        </button>
                        <button (click)="editClergy(clergy)"
                                class="text-orange-600 hover:text-orange-900 bg-orange-50 p-2 rounded-lg">
                          <i class="pi pi-pencil"></i>
                        </button>
                        <button (click)="toggleStatus(clergy)"
                                [class]="clergy.isActive ? 
                                  'text-red-600 hover:text-red-900 bg-red-50 p-2 rounded-lg' :
                                  'text-green-600 hover:text-green-900 bg-green-50 p-2 rounded-lg'">
                          <i [class]="clergy.isActive ? 'pi pi-ban' : 'pi pi-check'"></i>
                        </button>
                        <button (click)="confirmDelete(clergy)"
                                class="text-red-600 hover:text-red-900 bg-red-50 p-2 rounded-lg">
                          <i class="pi pi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </p-tabPanel>

            <!-- Statistics Tab -->
            <p-tabPanel header="Estatísticas">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-white p-6 rounded-xl shadow-sm">
                  <h3 class="text-lg font-semibold mb-4 text-[#1B3461]">Cadastros por Diocese</h3>
                  <p-chart type="pie" [data]="dioceseChartData" [options]="chartOptions"></p-chart>
                </div>
                <div class="bg-white p-6 rounded-xl shadow-sm">
                  <h3 class="text-lg font-semibold mb-4 text-[#1B3461]">Cadastros por Mês</h3>
                  <p-chart type="bar" [data]="monthlyChartData" [options]="chartOptions"></p-chart>
                </div>
              </div>
            </p-tabPanel>
          </p-tabView>
        </div>
      </div>

      <!-- Details Dialog -->
      <p-dialog [(visible)]="showDetails" [modal]="true" [style]="{width: '70vw'}" header="Detalhes do Cadastro"
                [breakpoints]="{'960px': '95vw'}" [draggable]="false" [resizable]="false">
        <div *ngIf="selectedClergy" class="p-4">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Profile Image and Basic Info -->
            <div class="md:col-span-1">
              <img [src]="selectedClergy.profileImage" class="w-full h-48 object-cover rounded-lg shadow-sm mb-4">
              <div class="bg-[#F8FAFC] p-4 rounded-lg">
                <h3 class="font-semibold text-lg mb-2 text-[#1B3461]">{{selectedClergy.name}}</h3>
                <p class="text-[#2C4B8C]">{{selectedClergy.type | titlecase}}</p>
                <div class="mt-4 space-y-2">
                  <div class="flex items-center">
                    <i class="pi pi-envelope text-[#1B3461] mr-2"></i>
                    <span class="text-sm">{{selectedClergy.email}}</span>
                  </div>
                  <div class="flex items-center">
                    <i class="pi pi-phone text-[#1B3461] mr-2"></i>
                    <span class="text-sm">{{selectedClergy.phone}}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Details -->
            <div class="md:col-span-2 space-y-6">
              <div class="bg-[#F8FAFC] p-4 rounded-lg">
                <h3 class="font-semibold mb-4 text-[#1B3461]">Informações Eclesiásticas</h3>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <p class="text-sm text-gray-500">Diocese</p>
                    <p class="font-medium text-[#2C4B8C]">{{selectedClergy.diocese}}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">Paróquia</p>
                    <p class="font-medium text-[#2C4B8C]">{{selectedClergy.parish}}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">Data de Ordenação</p>
                    <p class="font-medium text-[#2C4B8C]">{{selectedClergy.ordinationDate | date}}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">Bispo Ordenante</p>
                    <p class="font-medium text-[#2C4B8C]">{{selectedClergy.ordinatingBishop}}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">Status</p>
                    <p class="font-medium" [class]="selectedClergy.isActive ? 'text-green-600' : 'text-red-600'">
                      {{selectedClergy.isActive ? 'Ativo' : 'Inativo'}}
                    </p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">Última Atualização</p>
                    <p class="font-medium text-[#2C4B8C]">{{selectedClergy.lastUpdate | date:'dd/MM/yyyy HH:mm'}}</p>
                  </div>
                </div>
              </div>

              <div class="bg-[#F8FAFC] p-4 rounded-lg">
                <h3 class="font-semibold mb-4 text-[#1B3461]">Biografia</h3>
                <p class="text-gray-700">{{selectedClergy.bio}}</p>
              </div>

              <div class="bg-[#F8FAFC] p-4 rounded-lg">
                <h3 class="font-semibold mb-4 text-[#1B3461]">Documentos</h3>
                <div class="flex space-x-4">
                  <a [href]="selectedClergy.ordinationDocument" target="_blank" 
                     class="flex items-center text-[#1B3461] hover:text-[#2C4B8C]">
                    <i class="pi pi-file-pdf mr-2"></i>
                    <span>Documento de Ordenação</span>
                  </a>
                  <a [href]="selectedClergy.identityDocument" target="_blank"
                     class="flex items-center text-[#1B3461] hover:text-[#2C4B8C]">
                    <i class="pi pi-file-pdf mr-2"></i>
                    <span>Documento de Identidade</span>
                  </a>
                </div>
              </div>

              <div class="bg-[#F8FAFC] p-4 rounded-lg">
                <h3 class="font-semibold mb-4 text-[#1B3461]">Redes Sociais</h3>
                <div class="flex space-x-4">
                  <a *ngIf="selectedClergy.socialMedia?.facebook" 
                     [href]="selectedClergy.socialMedia.facebook" 
                     target="_blank"
                     class="text-[#1B3461] hover:text-[#2C4B8C]">
                    <i class="pi pi-facebook text-xl"></i>
                  </a>
                  <a *ngIf="selectedClergy.socialMedia?.instagram"
                     [href]="selectedClergy.socialMedia.instagram"
                     target="_blank"
                     class="text-[#1B3461] hover:text-[#2C4B8C]">
                    <i class="pi pi-instagram text-xl"></i>
                  </a>
                  <a *ngIf="selectedClergy.socialMedia?.twitter"
                     [href]="selectedClergy.socialMedia.twitter"
                     target="_blank"
                     class="text-[#1B3461] hover:text-[#2C4B8C]">
                    <i class="pi pi-twitter text-xl"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </p-dialog>

      <!-- Confirmation Dialog -->
      <p-confirmDialog header="Confirmação" icon="pi pi-exclamation-triangle"></p-confirmDialog>

      <!-- Toast -->
      <p-toast></p-toast>
    </div>
  `
})
export class AdminComponent implements OnInit {
  pendingClergy: Clergy[] = [];
  approvedClergy: Clergy[] = [];
  statistics = {
    total: 0,
    priests: 0,
    bishops: 0,
    deacons: 0
  };
  showDetails = false;
  showEdit = false;
  selectedClergy: Clergy | null = null;
  editingClergy: Clergy | null = null;
  adminEmail = 'guthierresc@hotmail.com';
  
  dioceseChartData: any;
  monthlyChartData: any;
  chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };

  constructor(
    private clergyService: ClergyService,
    private authService: AuthService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadPendingClergy();
    this.loadApprovedClergy();
    this.loadStatistics();
    this.loadChartData();
  }

  loadPendingClergy() {
    this.clergyService.getPendingClergy().subscribe(clergy => {
      this.pendingClergy = clergy;
    });
  }

  loadApprovedClergy() {
    this.clergyService.getApprovedClergy().subscribe(clergy => {
      this.approvedClergy = clergy;
    });
  }

  loadStatistics() {
    this.clergyService.getStatistics().subscribe(stats => {
      this.statistics = stats;
    });
  }

  loadChartData() {
    this.clergyService.getDioceseStats().subscribe(data => {
      this.dioceseChartData = {
        labels: data.map((d: any) => d.diocese),
        datasets: [{
          data: data.map((d: any) => d.count),
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF'
          ]
        }]
      };
    });

    this.clergyService.getMonthlyStats().subscribe(data => {
      this.monthlyChartData = {
        labels: data.map((d: any) => d.month),
        datasets: [{
          label: 'Cadastros',
          data: data.map((d: any) => d.count),
          backgroundColor: '#36A2EB'
        }]
      };
    });
  }

  viewDetails(clergy: Clergy) {
    this.selectedClergy = clergy;
    this.showDetails = true;
  }

  editClergy(clergy: Clergy) {
    this.editingClergy = { ...clergy };
    this.showEdit = true;
  }

  saveEdit() {
    if (this.editingClergy) {
      this.clergyService.updateClergy(this.editingClergy.id, this.editingClergy)
        .subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Cadastro atualizado com sucesso'
          });
          this.showEdit = false;
          this.loadApprovedClergy();
        });
    }
  }

  approveClergy(id: string) {
    this.confirmationService.confirm({
      message: 'Deseja aprovar este cadastro?',
      accept: () => {
        this.clergyService.updateClergy(id, { status: 'approved' })
          .subscribe(() => {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Cadastro aprovado com sucesso'
            });
            this.loadPendingClergy();
            this.loadApprovedClergy();
            this.loadStatistics();
          });
      }
    });
  }

  rejectClergy(id: string) {
    this.confirmationService.confirm({
      message: 'Deseja rejeitar este cadastro?',
      accept: () => {
        this.clergyService.updateClergy(id, { status: 'rejected' })
          .subscribe(() => {
            this.messageService.add({
              severity: 'info',
              summary: 'Informação',
              detail: 'Cadastro rejeitado'
            });
            this.loadPendingClergy();
            this.loadStatistics();
          });
      }
    });
  }

  confirmDelete(clergy: Clergy) {
    this.confirmationService.confirm({
      message: `Deseja excluir o cadastro de ${clergy.name}?`,
      header: 'Confirmar Exclusão',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.clergyService.deleteClergy(clergy.id)
          .subscribe(() => {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Cadastro excluído com sucesso'
            });
            this.loadApprovedClergy();
            this.loadStatistics();
          });
      }
    });
  }

  toggleStatus(clergy: Clergy) {
    const newStatus = !clergy.isActive;
    const message = newStatus ? 'ativar' : 'desativar';
    
    this.confirmationService.confirm({
      message: `Deseja ${message} o cadastro de ${clergy.name}?`,
      accept: () => {
        this.clergyService.updateClergy(clergy.id, { 
          isActive: newStatus,
          lastUpdate: new Date()
        }).subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: `Cadastro ${newStatus ? 'ativado' : 'desativado'} com sucesso`
          });
          this.loadApprovedClergy();
        });
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}