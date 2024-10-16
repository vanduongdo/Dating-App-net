import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  // @Input() userFromHomeComponent: any; // version < 17.3
  // @Output() cancelRegister = new EventEmitter(); // version < 17.3
  private accountService = inject(AccountService);
  private toastr = inject(ToastrService);
  // userFromHomeComponent = input.required<any>(); // version >= 17.3
  cancelRegister = output<boolean>();
  model: any = {};

  register() {
    this.accountService.register(this.model).subscribe({
      next: (response) => {
        console.log(response);
        this.cancel();
      },
      error: (error) => this.toastr.error(error.error),
    });
  }

  // log(val: any) { console.log(val); }

  cancel() {
    this.cancelRegister.emit(false); // this is the event that will be emitted to the parent component
  }
}
