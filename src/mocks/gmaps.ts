export const places = [
    {
      description: "Nevada City, California, EE. UU.",
      id: "c5de8c2ddfa203ea8dd4ada38563de7ec610f19c",
      matched_substrings: [
        {
          length: 6,
          offset: 0
        }
      ],
      place_id: "ChIJSYtANHF6m4ARzcPgXJqqvzc",
      reference: "ChIJSYtANHF6m4ARzcPgXJqqvzc",
      structured_formatting: {
        main_text: "Nevada City",
        main_text_matched_substrings: [
          {
            length: 6,
            offset: 0
          }
        ],
        secondary_text: "California, EE. UU."
      },
      terms: [
        {
          offset: 0,
          value: "Nevada City"
        },
        {
          offset: 13,
          value: "California"
        },
        {
          offset: 25,
          value: "EE. UU."
        }
      ],
      types: [
        "locality",
        "political",
        "geocode"
      ]
    },
    {
      description: "Las Vegas, Nevada, EE. UU.",
      id: "667973acb71b9f5c746bb145f389a30422c31b7a",
      matched_substrings: [
        {
          length: 1,
          offset: 0
        }
      ],
      place_id: "ChIJ0X31pIK3voARo3mz1ebVzDo",
      reference: "ChIJ0X31pIK3voARo3mz1ebVzDo",
      structured_formatting: {
        main_text: "Las Vegas",
        main_text_matched_substrings: [
          {
            length: 1,
            offset: 0
          }
        ],
        secondary_text: "Nevada, EE. UU."
      },
      terms: [
        {
          offset: 0,
          value: "Las Vegas"
        },
        {
          offset: 11,
          value: "Nevada"
        },
        {
          offset: 19,
          value: "EE. UU."
        }
      ],
      types: [
        "locality",
        "political",
        "geocode"
      ]
    },
    {
      description: "United Kingdom",
      id: "3e2ed56d16ab2358820c6583c30aa1c72773740b",
      matched_substrings: [
        {
          length: 11,
          offset: 0
        }
      ],
      place_id: "ChIJqZHHQhE7WgIReiWIMkOg-MQ",
      reference: "ChIJqZHHQhE7WgIReiWIMkOg-MQ",
      structured_formatting: {
        main_text: "United Kingdom",
        main_text_matched_substrings: [
          {
            length: 11,
            offset: 0
          }
        ]
      },
      terms: [
        {
          offset: 0,
          value: "United Kingdom"
        }
      ],
      types: [
        "country",
        "political",
        "geocode"
      ]
    },
    {
      description: "San Francisco, California, EE. UU.",
      id: "1b9ea3c094d3ac23c9a3afa8cd4d8a41f05de50a",
      matched_substrings: [
        {
          length: 3,
          offset: 0
        }
      ],
      place_id: "ChIJIQBpAG2ahYAR_6128GcTUEo",
      reference: "ChIJIQBpAG2ahYAR_6128GcTUEo",
      structured_formatting: {
        main_text: "San Francisco",
        main_text_matched_substrings: [
          {
            length: 3,
            offset: 0
          }
        ],
        secondary_text: "California, EE. UU."
      },
      terms: [
        {
          offset: 0,
          value: "San Francisco"
        },
        {
          offset: 15,
          value: "California"
        },
        {
          offset: 27,
          value: "EE. UU."
        }
      ],
      types: [
        "locality",
        "political",
        "geocode"
      ]
    },
    {
      description: "Buenos Aires, CABA, Argentina",
      id: "a0cd3e8b10009cce0b593de7ba417e0ab7a34f5f",
      matched_substrings: [
        {
          length: 4,
          offset: 0
        }
      ],
      place_id: "ChIJvQz5TjvKvJURh47oiC6Bs6A",
      reference: "ChIJvQz5TjvKvJURh47oiC6Bs6A",
      structured_formatting: {
        main_text: "Buenos Aires",
        main_text_matched_substrings: [
          {
            length: 4,
            offset: 0
          }
        ],
        secondary_text: "CABA, Argentina"
      },
      terms: [
        {
          offset: 0,
          value: "Buenos Aires"
        },
        {
          offset: 14,
          value: "CABA"
        },
        {
          offset: 20,
          value: "Argentina"
        }
      ],
      types: [
        "locality",
        "political",
        "geocode"
      ]
    },
    {
      description: "Santiago, Chile",
      id: "e623b0758acaf7a64f1ac2d076cd29d3d19e327c",
      matched_substrings: [
        {
          length: 6,
          offset: 0
        }
      ],
      place_id: "ChIJL68lBEHFYpYRMQkPQDzVdYQ",
      reference: "ChIJL68lBEHFYpYRMQkPQDzVdYQ",
      structured_formatting: {
        main_text: "Santiago",
        main_text_matched_substrings: [
          {
            length: 6,
            offset: 0
          }
        ],
        secondary_text: "Chile"
      },
      terms: [
        {
          offset: 0,
          value: "Santiago"
        },
        {
          offset: 10,
          value: "Chile"
        }
      ],
      types: [
        "colloquial_area",
        "locality",
        "political",
        "geocode"
      ]
    }
  ]

export const constructors = (placeName: string) => {
  // @ts-ignore
  window.google = {
    maps: {
        Geocoder: function () {
            // @ts-ignore
            this.geocode = (placeId: string, callback: (results: any, status: any) => void) => callback([{formatted_address: placeName}], 'OK')
        },
        places: {
            AutocompleteService: function() {
                // @ts-ignore
                this.getPlacePredictions = (request: any, callback: any) => []
            }
        }
    }
  };
}
