import { Component, OnInit, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { ReCaptchaDirective } from '../../../captcha/directives/recaptcha.directive';
import { StoreService } from '../../../../shared/store/store.service';
import { TeamsService } from '../../teams.service';
import { ValidateEmail } from '../../../../shared/validators/email.validator';
import { SelectOptionDto } from '../../../../shared/model/SelectOptionDto';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../state/app.state';
import { TShirt } from '../../models/TShirtDto';
import { TshirtsService } from '../../services/tshirts.service';
import { Food } from '../../models/FoodDto';
import { FoodService } from '../../services/foods.service';
import { Accommodation } from '../../models/AccommodationDto';
import { AccommodationsService } from '../../services/accommodations.service';

@Component({
  selector: 'registration-form',
  templateUrl: 'team-registration.component.html',
  styleUrls: ['team-registration.component.scss']
})
export class TeamRegistrationComponent {
  @ViewChild('recaptcha') recaptcha;
  public mainForm: FormGroup;
  public name: FormControl;
  public email: FormControl;
  public password: FormControl;
  public password2: FormControl;
  public phone: FormControl;
  public firstName: FormControl;
  public lastName: FormControl;
  public firstName2: FormControl;
  public lastName2: FormControl;
  public firstName3: FormControl;
  public lastName3: FormControl;
  public firstName4: FormControl;
  public lastName4: FormControl;
  public firstName5: FormControl;
  public lastName5: FormControl;
  public tshirt: FormControl;
  public tshirt2: FormControl;
  public tshirt3: FormControl;
  public tshirt4: FormControl;
  public tshirt5: FormControl;
  public food: FormControl;
  public food2: FormControl;
  public food3: FormControl;
  public food4: FormControl;
  public food5: FormControl;
  public accommodation: FormControl;
  public tshirts: Observable<TShirt[]>;
  public foods: Observable<Food[]>;
  public accommodations: Observable<Accommodation[]>;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private element: ElementRef,
    private db: AngularFireDatabase,
    private storeService: StoreService,
    private teamsService: TeamsService,
    private store: Store<AppState>,
    private tshirtsService: TshirtsService,
    private foodService: FoodService,
    private accommodationsService: AccommodationsService
  ) {
    // load tshirts
    this.tshirtsService.loadTShirts();
    this.foodService.loadFoods();
    this.accommodationsService.loadAccommodations();
    this.tshirts = this.store.select(state => state.tshirts.list);
    this.foods = this.store.select(state => state.foods.list);
    this.accommodations = this.store.select(state => state.accommodations.list);

    // TODO: create email, password format validators
    this.name = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]);
    this.email = new FormControl('', [Validators.required, ValidateEmail]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(5)]);
    this.password2 = new FormControl('', [Validators.required, Validators.minLength(5)]);
    this.phone = new FormControl('', Validators.required); // TODO: add format validator
    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('', Validators.required);
    this.firstName2 = new FormControl('', Validators.required);
    this.lastName2 = new FormControl('', Validators.required);
    this.firstName3 = new FormControl('', Validators.required);
    this.lastName3 = new FormControl('', Validators.required);
    this.firstName4 = new FormControl('', Validators.required);
    this.lastName4 = new FormControl('', Validators.required);
    this.firstName5 = new FormControl('', Validators.required);
    this.lastName5 = new FormControl('', Validators.required);
    this.tshirt = new FormControl('', Validators.required);
    this.tshirt2 = new FormControl('', Validators.required);
    this.tshirt3 = new FormControl('', Validators.required);
    this.tshirt4 = new FormControl('', Validators.required);
    this.tshirt5 = new FormControl('', Validators.required);
    this.food = new FormControl('', Validators.required);
    this.food2 = new FormControl('', Validators.required);
    this.food3 = new FormControl('', Validators.required);
    this.food4 = new FormControl('', Validators.required);
    this.food5 = new FormControl('', Validators.required);
    this.accommodation = new FormControl('', Validators.required);

    this.mainForm = this.fb.group({
      name: this.name,
      email: this.email,
      password: this.password,
      password2: this.password2,
      phone: this.phone,
      firstName: this.firstName,
      lastName: this.lastName,
      firstName2: this.firstName2,
      lastName2: this.lastName2,
      firstName3: this.firstName3,
      lastName3: this.lastName3,
      firstName4: this.firstName4,
      lastName4: this.lastName4,
      firstName5: this.firstName5,
      lastName5: this.lastName5,
      tshirt: this.tshirt,
      tshirt2: this.tshirt2,
      tshirt3: this.tshirt3,
      tshirt4: this.tshirt4,
      tshirt5: this.tshirt5,
      food: this.food,
      food2: this.food2,
      food3: this.food3,
      food4: this.food4,
      food5: this.food5,
      accommodation: this.accommodation,
      captcha: ['']
    });

    // captcha success
    this.storeService.getRegistrationFormSuccess()
      .subscribe((result: boolean) => {
        if (result) {
          this.sendValidateForm();
        }
      });
  }

  public sendForm() {
    console.log('XXX');
    if (!this.mainForm.get('captcha').valid) {
      // TODO: localization captcha
      console.log('CAPTCHA VALIDATION');
      this.recaptcha.execute();
    } else {
      this.sendValidateForm();
    }
  }

  public sendValidateForm() {
    console.log(this.mainForm.invalid);
    console.log('STEP');
    const team = this.mainForm.value;
    delete team.captcha;
    this.teamsService.addItem(team);
  }
}
