import { Directive, ElementRef, EventEmitter, Input, OnDestroy, Output } from '@angular/core';

import { Subject, debounceTime } from 'rxjs';

@Directive({
  selector: '[appIntersectionObserver]',
})
export class IntersectionObserverDirective implements OnDestroy {
  @Output() enteredView = new EventEmitter();
  @Output() leftView = new EventEmitter();

  @Input() threshold: number = 1.0;
  @Input() once: boolean = true;
  @Input() debounceTime: number = 100;

  @Input() intersectionContainer?: ElementRef;

  private readonly observer;

  constructor(private readonly elementRef: ElementRef) {
    const subject = new Subject<IntersectionObserverEntry[]>();
    subject.pipe(debounceTime(this.debounceTime)).subscribe((entries) => this.observerCallback(entries));

    this.observer = new IntersectionObserver((entries) => subject.next(entries), {
      threshold: this.threshold,
    });
    this.observer.observe(this.elementRef.nativeElement);
  }

  private observerCallback(entries: IntersectionObserverEntry[]) {
    const filtered = entries.filter((entry) => entry.isIntersecting);
    if (!filtered.length) {
      this.leftView.emit();
      return;
    }

    console.log('');
    this.enteredView.emit();
    if (this.once) this.observer.disconnect();
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }
}
