import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< Updated upstream
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
=======
>>>>>>> Stashed changes
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule} from '@angular/material/button';
import { MatCardModule} from '@angular/material/card';
import { MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
<<<<<<< Updated upstream
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
=======
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
<<<<<<< Updated upstream
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatSnackBarModule,
    MatInputModule,
    MatCheckboxModule,
    MatGridListModule,
    MatSelectModule,
    MatTabsModule,
    MatGridListModule,
    MatProgressSpinnerModule
  ],

=======
    MatIconModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatInputModule
  ],
>>>>>>> Stashed changes
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
<<<<<<< Updated upstream
    MatPaginatorModule,
    MatNativeDateModule,
    MatIconModule,
    MatSnackBarModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatGridListModule,
    MatTabsModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatDatepickerModule
=======
    MatIconModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatInputModule
>>>>>>> Stashed changes
  ]
})
export class SharedModule { }
