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
import { Router } from '@angular/router';

@Component({
  selector: 'registration-form',
  templateUrl: 'team-registration.component.html',
  styleUrls: ['team-registration.component.scss']
})
export class TeamRegistrationComponent implements OnInit {
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
  public showFillMessage = false;

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
    private accommodationsService: AccommodationsService,
    private router: Router
  ) {
    this.initStore();
    this.initForm();
  }

  ngOnInit() {
    this.tshirtsService.loadTShirts();
    this.foodService.loadFoods();
    this.accommodationsService.loadAccommodations();
  }

  private initStore() {
    this.tshirts = this.store.select(state => state.tshirts.list);
    this.foods = this.store.select(state => state.foods.list);
    this.accommodations = this.store.select(state => state.accommodations.list);
    // captcha success
    this.store.select(state => state.teams.registrationFormSuccess)
      .subscribe((result: boolean) => {
        if (result) {
          this.sendValidateForm();
        }
      });
  }

  private initForm() {
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
    this.tshirt = new FormControl('');
    this.tshirt2 = new FormControl('');
    this.tshirt3 = new FormControl('');
    this.tshirt4 = new FormControl('');
    this.tshirt5 = new FormControl('');
    this.food = new FormControl('', Validators.required);
    this.food2 = new FormControl('', Validators.required);
    this.food3 = new FormControl('', Validators.required);
    this.food4 = new FormControl('', Validators.required);
    this.food5 = new FormControl('', Validators.required);
    this.accommodation = new FormControl('', Validators.required);

    this.mainForm = this.fb.group({
      data: this.fb.group({
        name: this.name,
        email: this.email,
        password: this.password,
        password2: this.password2,
        phone: this.phone,
        accommodation: this.accommodation,
        player1: this.fb.group({
          firstName: this.firstName,
          lastName: this.lastName,
          tshirt: this.tshirt,
          food: this.food,
        }),
        player2: this.fb.group({
          firstName2: this.firstName2,
          lastName2: this.lastName2,
          tshirt2: this.tshirt2,
          food2: this.food2,
        }),
        player3: this.fb.group({
          firstName3: this.firstName3,
          lastName3: this.lastName3,
          tshirt3: this.tshirt3,
          food3: this.food3,
        }),
        player4: this.fb.group({
          firstName4: this.firstName4,
          lastName4: this.lastName4,
          tshirt4: this.tshirt4,
          food4: this.food4,
        }),
        player5: this.fb.group({
          firstName5: this.firstName5,
          lastName5: this.lastName5,
          tshirt5: this.tshirt5,
          food5: this.food5,
        })
      }),
      captcha: ['']
    });
  }

  public sendForm() {
    if (!this.mainForm.get('data').valid) {
      this.showFillMessage = true;
      setTimeout(() => {
        this.showFillMessage = false;
      }, 10000);
      return;
    }
    if (!this.mainForm.get('captcha').valid) {
      this.recaptcha.execute();
    } else {
      this.sendValidateForm();
    }
  }

  public sendValidateForm() {
    const team = this.mainForm.value;
    delete team.captcha;
    this.teamsService.addItem(team);
    this.router.navigate(['/']);
  }
}
