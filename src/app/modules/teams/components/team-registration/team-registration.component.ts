import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { StoreService } from '../../../../shared/store/store.service';
import { TeamsService } from '../../teams.service';
import { ValidateEmail } from '../../../../shared/validators/email.validator';
import { Store } from '@ngrx/store';
import { TShirt } from '../../models/TShirtDto';
import { TshirtsService } from '../../services/tshirts.service';
import { Food } from '../../models/FoodDto';
import { FoodService } from '../../services/foods.service';
import { Accommodation } from '../../models/AccommodationDto';
import { AccommodationsService } from '../../services/accommodations.service';
import { ErrorDto } from '../../../../shared/model/ErrorDto';
import { ValidatePlayer } from '../../../../shared/validators/player.validator';
import { ValidatePhone } from '../../../../shared/validators/phone.validator';
import * as TeamsActions from '../../state/actions/teams.actions';
import { ValidatePasswords } from '../../../../shared/validators/passwords.validator';
import * as ErrorsActions from '../../../../state/actions/errors.actions';
import { State } from '../../state/reducers/module.reducer';
import { ConfigDbDto } from '../../../../shared/model/ConfigDbDto';
import { AccommodationDto } from '../../../../shared/model/AccommodationDto';
import { TshirtDto } from '../../../../shared/model/TshirtDto';
import { ValidateTeamName } from '../../../../shared/validators/team-name.validator';
import { PendingActions } from '../../state/actions/teams.actions';

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
  public passwords: FormGroup;
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
  public tshirts: TshirtDto[];
  public foods$: Observable<Food[]>;
  public accommodations$: Observable<Accommodation[]>;
  public showFillMessage = false;
  public isPending = false;
  public config: ConfigDbDto;
  public accommodationPrice = 0;
  public tshirtsPrice = 0;
  public summaryPrice = 0;
  public disableRegistration = true;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private element: ElementRef,
    private db: AngularFireDatabase,
    private storeService: StoreService,
    private teamsService: TeamsService,
    private store: Store<State>,
    private tshirtsService: TshirtsService,
    private foodService: FoodService,
    private accommodationsService: AccommodationsService
  ) {
    this.initStore();
    this.initForm();
  }

  ngOnInit() {
    this.store.dispatch(new PendingActions(false));
    this.tshirtsService.loadTShirts();
    this.foodService.loadFoods();
    this.accommodationsService.loadAccommodations();
  }

  private initStore() {
    this.foods$ = this.store.select(state => state.teams.foods.list);
    this.accommodations$ = this.store.select(state => state.teams.accommodations.list);
    this.store.select(state => state)
      .subscribe((result) => {
        this.config = result.config.config;
        this.tshirts = result.teams.tshirts.list;
        this.disableRegistration = result.registration.end;
      });
    this.store.select(state => state.teams.teams.pending)
      .subscribe((result) => {
        this.isPending = result;
      });
  }

  private initForm() {
    this.name = new FormControl('', [
      Validators.required,
      ValidateTeamName,
      Validators.minLength(3),
      Validators.maxLength(100)
    ]);
    this.email = new FormControl('', [Validators.required, ValidateEmail]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(6)]);
    this.password2 = new FormControl('', [Validators.required, Validators.minLength(6)]);
    this.passwords = this.fb.group(
      {
        password: this.password,
        password2: this.password2,
      },
      { validator: [ValidatePasswords] }
    );
    this.phone = new FormControl('', [Validators.required, ValidatePhone]);
    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('', Validators.required);
    this.firstName2 = new FormControl('');
    this.lastName2 = new FormControl('');
    this.firstName3 = new FormControl('');
    this.lastName3 = new FormControl('');
    this.firstName4 = new FormControl('');
    this.lastName4 = new FormControl('');
    this.firstName5 = new FormControl('');
    this.lastName5 = new FormControl('');
    this.tshirt = new FormControl('');
    this.tshirt2 = new FormControl('');
    this.tshirt3 = new FormControl('');
    this.tshirt4 = new FormControl('');
    this.tshirt5 = new FormControl('');
    this.food = new FormControl('', Validators.required);
    this.food2 = new FormControl('');
    this.food3 = new FormControl('');
    this.food4 = new FormControl('');
    this.food5 = new FormControl('');
    this.accommodation = new FormControl('', Validators.required);

    this.mainForm = this.fb.group({
      data: this.fb.group({
        name: this.name,
        email: this.email,
        passwords: this.passwords,
        phone: this.phone,
        accommodation: this.accommodation,
        player1: this.fb.group(
          {
            firstName: this.firstName,
            lastName: this.lastName,
            tshirt: this.tshirt,
            food: this.food,
          },
          {validator: [ValidatePlayer]}
        ),
        player2: this.fb.group(
          {
            firstName: this.firstName2,
            lastName: this.lastName2,
            tshirt: this.tshirt2,
            food: this.food2,
          },
          {validator: [ValidatePlayer]}
        ),
        player3: this.fb.group(
          {
            firstName: this.firstName3,
            lastName: this.lastName3,
            tshirt: this.tshirt3,
            food: this.food3,
          },
          {validator: [ValidatePlayer]}
        ),
        player4: this.fb.group(
          {
            firstName: this.firstName4,
            lastName: this.lastName4,
            tshirt: this.tshirt4,
            food: this.food4,
          },
          {validator: [ValidatePlayer]}
        ),
        player5: this.fb.group(
          {
            firstName: this.firstName5,
            lastName: this.lastName5,
            tshirt: this.tshirt5,
            food: this.food5,
          },
          {validator: [ValidatePlayer]}
        ),
        payId: '',
        paySent: ''
      }),
      captcha: ['']
    });
  }

  public onRecaptchaValidateResponse(token: any) {
    // console.log(token);
    if (token) {
      // console.log('SUCCESS token');
      this.sendValidateForm();
    }
  }

  public sendForm() {
    this.isPending = true;
    this.store.dispatch(new PendingActions(true));
    if (!this.mainForm.get('data').valid) {
      const error: ErrorDto = {
        code: 'REGISTRATION_EXISTS',
        title: 'Chyba vyplnění registrace',
        description: 'Povinná pole musíte vyplnit'
      };
      this.store.dispatch(new ErrorsActions.ErrorAction([error]));
      this.isPending = false;
      this.store.dispatch(new PendingActions(false));
      return;
    }
    if (!this.mainForm.get('captcha').valid) {
      this.recaptcha.execute();
    } else {
      this.sendValidateForm();
    }
  }

  public sendValidateForm() {
    this.store.dispatch(new TeamsActions.RegistrationFormSuccessAction(true));
    const team = this.mainForm.value.data;
    team.password = team.passwords.password;
    delete team.captcha;
    delete team.passwords;
    this.teamsService.addItem(team);
  }

  public setAccommodationPrice(item: AccommodationDto) {
    this.accommodationPrice = item.price;
    this.summaryPrice = this.config.registration_price + this.accommodationPrice + this.tshirtsPrice;
  }

  public setTshirtPrice() {
    this.tshirtsPrice = 0;
    const tshirt1 = this.mainForm.get('data').get('player1').get('tshirt').value;
    const tshirt2 = this.mainForm.get('data').get('player2').get('tshirt').value;
    const tshirt3 = this.mainForm.get('data').get('player3').get('tshirt').value;
    const tshirt4 = this.mainForm.get('data').get('player4').get('tshirt').value;
    const tshirt5 = this.mainForm.get('data').get('player5').get('tshirt').value;
    if (tshirt1) {
      this.tshirtsPrice += this.tshirts.filter((tshirt: TshirtDto) => {
        return tshirt.value === tshirt1;
      })[0].price;
    }
    if (tshirt2) {
      this.tshirtsPrice += this.tshirts.filter((tshirt: TshirtDto) => {
        return tshirt.value === tshirt2;
      })[0].price;
    }
    if (tshirt3) {
      this.tshirtsPrice += this.tshirts.filter((tshirt: TshirtDto) => {
        return tshirt.value === tshirt3;
      })[0].price;
    }
    if (tshirt4) {
      this.tshirtsPrice += this.tshirts.filter((tshirt: TshirtDto) => {
        return tshirt.value === tshirt4;
      })[0].price;
    }
    if (tshirt5) {
      this.tshirtsPrice += this.tshirts.filter((tshirt: TshirtDto) => {
        return tshirt.value === tshirt5;
      })[0].price;
    }
    this.summaryPrice = this.config.registration_price + this.accommodationPrice + this.tshirtsPrice;
  }
}
