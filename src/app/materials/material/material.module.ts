import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

const Material = [
  MatIconModule,
  MatTabsModule,
  MatInputModule,
  MatDialogModule,
  MatSelectModule,
  MatButtonModule,
  MatCheckboxModule,
];

@NgModule({
  imports: [Material],
  exports: [Material],
})
export class MaterialModule {}
