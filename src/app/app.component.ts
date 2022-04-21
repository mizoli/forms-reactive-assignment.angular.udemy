import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  projectForm: FormGroup;
  forbiddenProjectName = 'Test';

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      project: new FormControl(
        null,
        [Validators.required, this.forbiddenNameValidator.bind(this)]
        //this.forbiddenNameAsyncValidator.bind(this)
      ),
      email: new FormControl(null, [Validators.required, Validators.email]),
      status: new FormControl(),
    });
  }

  onSubmit() {
    console.log(this.projectForm);
  }

  forbiddenNameValidator(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenProjectName === control.value) {
      return { nameIsForbidden: true };
    }
    return null;
  }

  forbiddenNameAsyncValidator(
    control: FormControl
  ): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === this.forbiddenProjectName) {
          resolve({ nameIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
