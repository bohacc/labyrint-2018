import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../../shared/auth/auth.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { LoginTeamDto } from '../../../../shared/model/LoginTeamDto';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatePhone } from '../../../../shared/validators/phone.validator';
import { ValidatePlayer } from '../../../../shared/validators/player.validator';
import { ValidateEmail } from '../../../../shared/validators/email.validator';
import { TeamsService } from '../../teams.service';
import { TshirtsService } from '../../services/tshirts.service';
import { FoodService } from '../../services/foods.service';
import { AccommodationsService } from '../../services/accommodations.service';
import { Accommodation } from '../../models/AccommodationDto';
import { Food } from '../../models/FoodDto';
import { TShirt } from '../../models/TShirtDto';
import { State } from '../../state/reducers/module.reducer';
import { Router } from '@angular/router';
import { ErrorDto } from '../../../../shared/model/ErrorDto';
import * as ErrorsActions from '../../../../state/actions/errors.actions';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<any> = new Subject();
  public loginUser: LoginTeamDto;
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
  public tshirts: Observable<TShirt[]>;
  public foods: Observable<Food[]>;
  public accommodations: Observable<Accommodation[]>;

  constructor(
    private authService: AuthService,
    private store: Store<State>,
    private fb: FormBuilder,
    private teamsService: TeamsService,
    private tshirtsService: TshirtsService,
    private foodService: FoodService,
    private accommodationsService: AccommodationsService,
    private router: Router
  ) {
    this.initStore();
  }

  ngOnInit() {
    this.tshirtsService.loadTShirts();
    this.foodService.loadFoods();
    this.accommodationsService.loadAccommodations();
  }

  ngOnDestroy() {
    this.unsubscribe.next(null);
    this.unsubscribe.complete();
  }

  public logout() {
    this.authService.logout();
  }

  private initStore() {
    this.tshirts = this.store.select(state => state.teams.tshirts.list);
    this.foods = this.store.select(state => state.teams.foods.list);
    this.accommodations = this.store.select(state => state.teams.accommodations.list);
    this.store.select(state => state.loginTeam.team)
      .takeUntil(this.unsubscribe)
      .subscribe((team: LoginTeamDto) => {
        this.loginUser = team;
        if (this.loginUser) {
          this.initForm();
        }
      });
  }

  private initForm() {
    this.name = new FormControl({value: this.loginUser.name, disabled: true},
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)]);
    this.email = new FormControl({value: this.loginUser.email, disabled: true}, [Validators.required, ValidateEmail]);
    this.phone = new FormControl(this.loginUser.phone, [Validators.required, ValidatePhone]);
    this.firstName = new FormControl(this.loginUser.player1.firstName, Validators.required);
    this.lastName = new FormControl(this.loginUser.player1.lastName, Validators.required);
    this.firstName2 = new FormControl(this.loginUser.player2.firstName);
    this.lastName2 = new FormControl(this.loginUser.player2.lastName);
    this.firstName3 = new FormControl(this.loginUser.player3.firstName);
    this.lastName3 = new FormControl(this.loginUser.player3.lastName);
    this.firstName4 = new FormControl(this.loginUser.player4.firstName);
    this.lastName4 = new FormControl(this.loginUser.player4.lastName);
    this.firstName5 = new FormControl(this.loginUser.player5.firstName);
    this.lastName5 = new FormControl(this.loginUser.player5.lastName);
    this.tshirt = new FormControl(this.loginUser.player1.tshirt);
    this.tshirt2 = new FormControl(this.loginUser.player2.tshirt);
    this.tshirt3 = new FormControl(this.loginUser.player3.tshirt);
    this.tshirt4 = new FormControl(this.loginUser.player4.tshirt);
    this.tshirt5 = new FormControl(this.loginUser.player5.tshirt);
    this.food = new FormControl(this.loginUser.player1.food, Validators.required);
    this.food2 = new FormControl(this.loginUser.player2.food);
    this.food3 = new FormControl(this.loginUser.player3.food);
    this.food4 = new FormControl(this.loginUser.player4.food);
    this.food5 = new FormControl(this.loginUser.player5.food);
    this.accommodation = new FormControl(this.loginUser.accommodation, Validators.required);

    this.mainForm = this.fb.group({
      data: this.fb.group({
        name: this.name,
        email: this.email,
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
        payId: this.loginUser.payId
      }),
      /*captcha: ['']*/
    });
  }

  public sendForm() {
    this.teamsService.updateItem(this.mainForm.getRawValue().data);
  }

  public resetPassword() {
    this.authService.resetPassword(this.loginUser.email)
      .then(
        () => {
          this.router.navigate(['/teams/reset-password']);
        },
        () => {
          const error: ErrorDto = {
            code: 'REGISTRATION_EXISTS',
            title: 'Chyba při resetování hesla',
            description: 'Kontaktujte prosím organizátory'
          };
          this.store.dispatch(new ErrorsActions.ErrorAction([error]));
        }
      );
  }
}
