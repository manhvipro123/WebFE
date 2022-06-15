import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { TableComponent } from './components/table/table.component';
import { TableServerComponent } from './components/table-server/table-server.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '', component: MainComponent },
  { path: 'table', component: TableComponent },
  { path: 'table-sv', component: TableServerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
