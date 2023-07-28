import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mariosy-frontend';

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer){
    iconRegistry.addSvgIcon(
      'right-arrow',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/211621_c_right_arrow_icon_1.svg'));

    iconRegistry.addSvgIcon(
        'left-arrow',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/Vector_left.svg'));

    iconRegistry.addSvgIcon(
          'green-star',
          sanitizer.bypassSecurityTrustResourceUrl('assets/icons/3841826_favorite_interface_multimedia_star_icon_1.svg'));
  
    iconRegistry.addSvgIcon(
          'person-sharp',
          sanitizer.bypassSecurityTrustResourceUrl('assets/icons/9035899_person_sharp_icon_1.svg'));
  
        }

 
}
