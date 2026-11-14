import {Component, inject, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HousingService} from '../housing-service';
import {HousingLocationInfo} from '../housinglocation';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-details',
  styleUrl: './details.css', 
  templateUrl: './details.html'
})
export class Details {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation = signal<HousingLocationInfo | undefined>(undefined);

  constructor() {
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    
    this.housingService.getHousingLocationById(housingLocationId).then((housingLocation) => {
      this.housingLocation.set(housingLocation);
      
    });
  }

  applyForm = new FormGroup({
    firstName: new FormControl('Tareq'),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',
    );
  }
}

