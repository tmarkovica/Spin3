import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/interfaces/restaurant';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  allRestaurants : Restaurant[];
  filteredRestauraunts: Restaurant[];

  constructor(private restaurauntService : RestaurantService) { }

  ngOnInit() {
    this.restaurauntService._allRestaurants.subscribe(value => {
      if (value.length) {
        this.allRestaurants = value;
        this.filteredRestauraunts = value;
        
        this.setImages();
      }
    }); 
  }

  setImages() {
    this.allRestaurants.forEach(r => {
      const random = Math.floor(Math.random() * 5) + 1;
      r.image = `url("assets/restorani/restoran${random}.jpg")`
    });
  }

  search(event) {
    const query = event.detail.value.toLowerCase();
    //this.filteredRestauraunts = !query ? [...this.allRestaurants] : this.allRestaurants.filter(r => r.name.toLowerCase() === event.detail.value.toLowerCase());
    // filter restaurants that start with search string
    this.filteredRestauraunts = !query ? [...this.allRestaurants] : this.allRestaurants.filter(r => r.name.toLowerCase().startsWith(event.detail.value.toLowerCase()));
    // sort filtered restaurants alphabetically
    this.filteredRestauraunts = !query ? [...this.filteredRestauraunts] : this.filteredRestauraunts.sort((a, b) => a.name.toLowerCase() !== b.name.toLowerCase() ? a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1 : 0);
  }
}
