import { AsyncPipe, JsonPipe, KeyValuePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { filter, map, startWith } from 'rxjs';

import homeFeatureOptions from './home-feature.options';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [KeyValuePipe, ReactiveFormsModule, AsyncPipe, JsonPipe],
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'main[feature-home]',
  standalone: true,
  styleUrl: './home-feature.component.css',
  templateUrl: './home-feature.component.html',
})
export default class HomeFeatureComponent {
  #fb = inject(NonNullableFormBuilder);
  protected form = this.#fb.group({
    alphabets: this.#fb.array(
      [...homeFeatureOptions.keys()].map(name =>
        this.#fb.group({ checked: this.#fb.control(true), name }),
      ),
    ),
    characterCount: [30, [Validators.required, Validators.minLength(1)]],
  });
  protected password = toSignal(
    this.form.valueChanges.pipe(
      startWith(this.form.value),
      filter(() => this.form.valid),
      map(() => this.#concatSelectedAlphabets(this.form.value)),
    ),
  );

  protected async copy(password: HTMLButtonElement) {
    if (password.textContent) {
      await navigator.clipboard.writeText(password.textContent);
    }
  }

  #concatSelectedAlphabets({
    alphabets,
    characterCount,
  }: typeof this.form.value): string {
    const selectedAlphabets =
      alphabets
        ?.filter(({ checked }) => checked)
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        .reduce((acc, { name }) => acc + homeFeatureOptions.get(name!), '') ||
      '';

    let newPassword = '';
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    for (let i = 0; i < characterCount!; i++) {
      newPassword += this.#getRandomCharacter(selectedAlphabets);
    }

    return newPassword;
  }

  #getRandomCharacter(characters: string): string {
    const array = new Uint32Array(1);

    crypto.getRandomValues(array);

    const randomIndex = array[0] % characters.length;

    return characters.charAt(randomIndex);
  }
}
