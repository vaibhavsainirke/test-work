import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { S3BrowserComponent } from './components/s3-browser/s3-browser.component';

const routes: Routes = [
  {path : '', redirectTo : '/s3-browser', pathMatch : 'full'},
  { path: 's3-browser', component: S3BrowserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
