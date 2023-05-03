import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule} from '@angular/material/button';
import { MatCardModule} from '@angular/material/card';
import { MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
<<<<<<< Updated upstream

=======
import {MatTabsModule} from '@angular/material/tabs';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
>>>>>>> Stashed changes

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatIconModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule
    
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatIconModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule
  ]
})
export class SharedModule { }
