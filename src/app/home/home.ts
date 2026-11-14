import { Component, inject, signal } from '@angular/core';
import { HousingLocation } from '../housing-location/housing-location';
import { HousingLocationInfo } from '../housinglocation';
import { HousingService } from '../housing-service';


@Component({
  selector: 'app-home',
  imports: [HousingLocation],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  housingLocationList = signal<HousingLocationInfo[]>([]);
  filteredLocationList = signal<HousingLocationInfo[]>([]);

  housingService: HousingService = inject(HousingService);

  constructor() {
    this.housingService
      .getAllHousingLocations()
      .then((housingLocationList: HousingLocationInfo[]) => {
        this.housingLocationList.set(housingLocationList);
        this.filteredLocationList.set(housingLocationList);
      });
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList.set(this.housingLocationList());
      return;
    }

    this.filteredLocationList.set(
      this.housingLocationList().filter((housingLocation) =>
        housingLocation?.city.toLowerCase().includes(text.toLowerCase())
      )
    );
  }
}
