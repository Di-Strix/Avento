import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, AfterViewInit {
  all_cards = [
    {
      name: 'Minkx',
      country: 'Kazakhstan',
      ticket_price: '$245.99',
      hotel_price: '$422.47',
      duration: '7 nights',
      image: 'Kazakhstan.jpg',
    },
    {
      name: 'Quwiexy',
      country: 'Brazil',
      ticket_price: '$560.20',
      hotel_price: '$440.13',
      duration: '7 nights',
      image: 'Brazil.jpg',
    },
    {
      name: 'Kanekety',
      country: 'Estonia',
      ticket_price: '$50.87',
      hotel_price: '$340.65',
      duration: '4 nights',
      image: 'Estonia.jpg',
    },
    {
      name: 'Minkx',
      country: 'Kazakhstan',
      ticket_price: '$245.99',
      hotel_price: '$422.47',
      duration: '7 nights',
      image: 'Kazakhstan.jpg',
    },
    {
      name: 'Quwiexy',
      country: 'Brazil',
      ticket_price: '$560.20',
      hotel_price: '$440.13',
      duration: '7 nights',
      image: 'Brazil.jpg',
    },
    {
      name: 'Kanekety',
      country: 'Estonia',
      ticket_price: '$50.87',
      hotel_price: '$340.65',
      duration: '4 nights',
      image: 'Estonia.jpg',
    },
    {
      name: 'Minkx',
      country: 'Kazakhstan',
      ticket_price: '$245.99',
      hotel_price: '$422.47',
      duration: '7 nights',
      image: 'Kazakhstan.jpg',
    },
    {
      name: 'Quwiexy',
      country: 'Brazil',
      ticket_price: '$560.20',
      hotel_price: '$440.13',
      duration: '7 nights',
      image: 'Brazil.jpg',
    },
    {
      name: 'Kanekety',
      country: 'Estonia',
      ticket_price: '$50.87',
      hotel_price: '$340.65',
      duration: '4 nights',
      image: 'Estonia.jpg',
    },
    {
      name: 'Minkx',
      country: 'Kazakhstan',
      ticket_price: '$245.99',
      hotel_price: '$422.47',
      duration: '7 nights',
      image: 'Kazakhstan.jpg',
    },
    {
      name: 'Quwiexy',
      country: 'Brazil',
      ticket_price: '$560.20',
      hotel_price: '$440.13',
      duration: '7 nights',
      image: 'Brazil.jpg',
    },
    {
      name: 'Kanekety',
      country: 'Estonia',
      ticket_price: '$50.87',
      hotel_price: '$340.65',
      duration: '4 nights',
      image: 'Estonia.jpg',
    },
    {
      name: 'Minkx',
      country: 'Kazakhstan',
      ticket_price: '$245.99',
      hotel_price: '$422.47',
      duration: '7 nights',
      image: 'Kazakhstan.jpg',
    },
    {
      name: 'Quwiexy',
      country: 'Brazil',
      ticket_price: '$560.20',
      hotel_price: '$440.13',
      duration: '7 nights',
      image: 'Brazil.jpg',
    },
    {
      name: 'Kanekety',
      country: 'Estonia',
      ticket_price: '$50.87',
      hotel_price: '$340.65',
      duration: '4 nights',
      image: 'Estonia.jpg',
    },
    {
      name: 'Minkx',
      country: 'Kazakhstan',
      ticket_price: '$245.99',
      hotel_price: '$422.47',
      duration: '7 nights',
      image: 'Kazakhstan.jpg',
    },
    {
      name: 'Quwiexy',
      country: 'Brazil',
      ticket_price: '$560.20',
      hotel_price: '$440.13',
      duration: '7 nights',
      image: 'Brazil.jpg',
    },
    {
      name: 'Kanekety',
      country: 'Estonia',
      ticket_price: '$50.87',
      hotel_price: '$340.65',
      duration: '4 nights',
      image: 'Estonia.jpg',
    },
  ];
  visible_cards: any[] = [];
  batch_size = 1;
  current_index = 0;

  @ViewChild('scrollAnchor', { static: false }) scrollAnchor!: ElementRef;

  ngOnInit() {
    this.loadNext();
  }

  loadNext() {
    if (this.current_index >= this.all_cards.length) return;
    const next_batch = this.all_cards.slice(this.current_index, this.current_index + this.batch_size);
    this.visible_cards.push(...next_batch);
    this.current_index += this.batch_size;
  }

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          this.loadNext();
        }
      },
      {
        rootMargin: '100px',
      }
    );
    if (this.scrollAnchor?.nativeElement) {
      observer.observe(this.scrollAnchor.nativeElement);
    }
  }
}
