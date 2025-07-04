import { Trip } from '../shared/trip';

export const viennaAlmatyTrip: Trip = {
  directions: {
    from: {
      name: 'Vienna',
      locationId: 'vie',
    },
    to: {
      name: 'Almaty',
      locationId: 'vie',
    },
  },
  info: {
    author: {
      username: 'minkx',
      displayName: 'minkx',
    },
    description:
      'Our trip to Almaty was amazing! We flew from Vienna with a stopover in Istanbul, and everything went smoothly. We stayed at City+3 Hotel, which was comfortable and family-friendly. The best part was visiting Kok-Tobe Hill—the cable car ride was so fun, and the views of the city were breathtaking. The kids especially enjoyed the mini-zoo. Highly recommend it for a family trip!',
  },
  plan: [
    {
      type: 'flight',
      from: 'Vienna',
      to: 'Almaty',
      connections: [
        { name: 'Vienna International Airport (VIE)' },
        { name: 'Istanbul Airport (IST)' },
        { name: 'Almaty International Airport (ALA)' },
      ],
    },
    {
      type: 'stay',
      comment: "I recommend booking a room in this hotel. It's both cheap and good!",
      hotel: {
        id: '002',
        name: 'City+3',
        website: 'https://example.com',
        rating: 4,
        photos: [
          'https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/517106271.jpg?k=4b57e290c395863b4450f8b7bcb7c81341ba81c7687ed4365b07a9b9713fc357&o=&w=600&h=375&mode=crop&scale=both&anchor=middlecenter&quality=80',
          'https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/517106240.jpg?k=6bcbb8c6d054ac5643416895de36628f0ada07a37695d7d2d062c09a37f96b3d&o=&w=600&h=375&mode=crop&scale=both&anchor=middlecenter&quality=80',
          'https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/517106246.jpg?k=36d230f765d8a9a4058c4f62eda963e0809753506538cbac5c732165970d06e4&o=&w=600&h=375&mode=crop&scale=both&anchor=middlecenter&quality=80',
        ],
      },

      alternatives: [
        {
          comment:
            'Hotel City+4 offers a comfortable and convenient stay with modern amenities, friendly staff, and a great location. Perfect for both business and leisure travelers!',
          reviewer: {
            username: 'mishanya3000',
            displayName: 'Mishanya3000',
          },
          hotel: {
            id: '003',
            name: 'City+4',
            website: 'https://example.com',
            rating: 4,
            photos: [
              'https://cf.bstatic.com/xdata/images/hotel/max1280x900/194003853.jpg?k=ed504a4bc8abf253bc47c69f2e26c9ae4359d24e28e4f03a70d4d8f32b1bed34&o=&hp=1',
            ],
          },
        },
        {
          comment:
            'BestHotel exceeded all expectations with its impeccable service, luxurious accommodations, and prime location. A truly unforgettable experience—highly recommended!',
          reviewer: {
            username: 'kitty',
            displayName: 'Kitty',
          },
          hotel: {
            id: '004',
            name: 'BestHotel',
            website: 'https://example.com',
            rating: 4,
            photos: [
              'https://cf.bstatic.com/xdata/images/hotel/max1280x900/637495798.jpg?k=a84ce86683eaa55750d565793e75aef27b19d223fd43fdd5ab12c981ccb3df4b&o=&hp=1',
            ],
          },
        },
      ],
    },
    {
      type: 'attraction',
      comment:
        'Kok-Tobe Hill was a great family outing! The views were amazing, the kids loved the mini-zoo, and the cable car ride was fun. A nice, relaxing spot for everyone to enjoy.',
      attraction: {
        id: '001',
        name: 'Kok-Tobe Hill',
        website: 'https://example.com/',
        rating: 4,
        photos: [
          'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/92/21/8b/img-20190223-110621-largejpg.jpg',
          'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/52/15/f5/caption.jpg',
        ],
      },
    },
    {
      type: 'flight',
      from: 'Almaty',
      to: 'Vienna',
      connections: [
        { name: 'Almaty International Airport (ALA)' },
        { name: 'Istanbul Airport (IST)' },
        { name: 'Vienna International Airport (VIE)' },
      ],
    },
  ],

  comments: [
    {
      author: {
        username: 'wanderer',
        displayName: 'Wanderer',
      },
      title: 'Really enjoyed the trip!',
      content:
        'It was fantastic! I stayed at City+3 Hotel, which was comfortable and well-located. Kok-Tobe Hill was the highlight—the cable car ride and the views were incredible. Even traveling alone, it was such a relaxing and enjoyable experience!',
    },
    {
      author: {
        username: 'stranger',
        displayName: 'Stranger',
      },
      title: 'Wow!',
      content:
        'Our family trip to Almaty was amazing! We stayed at City+3 Hotel, and it was cozy and convenient for all of us. Kok-Tobe Hill was the highlight—the kids had a blast at the mini-zoo, and we all loved the stunning views of the city. It was a perfect family-friendly adventure!',
    },
    {
      author: {
        username: 'stranger',
        displayName: 'Stranger',
      },
      title: 'Meh',
      content:
        'Almaty was okay, I guess. Stayed at City+3 Hotel—clean but plain. Kok-Tobe Hill had nice views, but the mini-zoo and shops felt too quiet. Walked around, but it didn’t really stick with me. Just… didn’t feel like much.',
    },
  ],
};
