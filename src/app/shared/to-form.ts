import { FormArray, FormControl, FormGroup } from '@angular/forms';

type Atomic = string | number | boolean | symbol | bigint | null | undefined | Date;
export type ToForm<T> =
  T extends Array<infer U>
    ? FormArray<ToForm<U>>
    : T extends Atomic
      ? FormControl<T>
      : FormGroup<{ [K in keyof T]: ToForm<T[K]> }>;
