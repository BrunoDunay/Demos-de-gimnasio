// Generado por scripts/club3d/ia/objetos.mjs: no editar a mano (los nombres y recuadros están en objetos.json).
export interface SceneObject {
  name: string;
  detail: string;
  /** Centro y parte superior de la silueta (0 a 1 sobre la foto). */
  u: number;
  v: number;
  top: number;
  /** Eje 3D del objeto: origen, dirección y largo (coordenadas del shader). */
  o: [number, number, number];
  d: [number, number, number];
  len: number;
}

export const OBJECTS: Record<string, SceneObject[]> = {
  "v-fuerza1": [
    {
      "name": "Rack con espejo de luz",
      "detail": "Cada estación con su propio rack.",
      "u": 0.122,
      "v": 0.412,
      "top": 0.214,
      "o": [
        -0.625,
        -0.019,
        0.631
      ],
      "d": [
        0.414,
        -0.488,
        0.768
      ],
      "len": 0.578
    },
    {
      "name": "Banco de press",
      "detail": "Ajustable y anclado al rack.",
      "u": 0.219,
      "v": 0.681,
      "top": 0.633,
      "o": [
        -0.634,
        0.166,
        0.695
      ],
      "d": [
        0.981,
        0.067,
        0.183
      ],
      "len": 0.423
    },
    {
      "name": "Estación gemela",
      "detail": "Seis racks para grupos de ocho.",
      "u": 0.855,
      "v": 0.506,
      "top": 0.214,
      "o": [
        0.395,
        -0.302,
        1.167
      ],
      "d": [
        0.274,
        0.614,
        -0.74
      ],
      "len": 0.805
    },
    {
      "name": "Banco de press",
      "detail": "Mismo equipo en cada estación.",
      "u": 0.785,
      "v": 0.675,
      "top": 0.633,
      "o": [
        0.186,
        0.175,
        0.788
      ],
      "d": [
        0.972,
        0.002,
        -0.237
      ],
      "len": 0.455
    },
    {
      "name": "Mancuernas",
      "detail": "A un paso de cada estación.",
      "u": 0.242,
      "v": 0.782,
      "top": 0.753,
      "o": [
        -0.404,
        0.299,
        0.548
      ],
      "d": [
        0.301,
        -0.294,
        0.907
      ],
      "len": 0.206
    }
  ],
  "v-entrada1": [
    {
      "name": "Recepción",
      "detail": "Tu nombre, tu toalla y tu locker listos al llegar.",
      "u": 0.503,
      "v": 0.777,
      "top": 0.605,
      "o": [
        -0.353,
        0.278,
        0.311
      ],
      "d": [
        1,
        -0.003,
        -0.013
      ],
      "len": 0.711
    },
    {
      "name": "Lounge",
      "detail": "Sillones para esperar tu clase con un café.",
      "u": 0.912,
      "v": 0.74,
      "top": 0.691,
      "o": [
        0.487,
        0.173,
        0.884
      ],
      "d": [
        0.399,
        0.57,
        -0.718
      ],
      "len": 0.187
    },
    {
      "name": "Amenidades de autor",
      "detail": "Cremas, aceites y toallas de algodón turco.",
      "u": 0.779,
      "v": 0.51,
      "top": 0.448,
      "o": [
        0.359,
        -0.053,
        1.034
      ],
      "d": [
        0.044,
        0.983,
        -0.176
      ],
      "len": 0.09
    },
    {
      "name": "Olivo de bienvenida",
      "detail": "Un árbol vivo en plena recepción.",
      "u": 0.051,
      "v": 0.397,
      "top": 0.038,
      "o": [
        -0.594,
        0.307,
        0.74
      ],
      "d": [
        0.031,
        -0.998,
        0.055
      ],
      "len": 0.758
    }
  ],
  "v-entrada2": [
    {
      "name": "Check-in",
      "detail": "Entras con tu código en segundos.",
      "u": 0.233,
      "v": 0.758,
      "top": 0.612,
      "o": [
        -0.719,
        0.279,
        0.33
      ],
      "d": [
        0.982,
        -0.062,
        0.177
      ],
      "len": 0.737
    },
    {
      "name": "Mancuernas",
      "detail": "Pares de 2 a 40 kg siempre en su lugar.",
      "u": 0.91,
      "v": 0.806,
      "top": 0.627,
      "o": [
        0.586,
        0.382,
        0.061
      ],
      "d": [
        0.174,
        -0.452,
        0.875
      ],
      "len": 0.702
    },
    {
      "name": "Estudio de fuerza",
      "detail": "Racks y plataformas al fondo de la sala.",
      "u": 0.696,
      "v": 0.597,
      "top": 0.527,
      "o": [
        0.157,
        0.055,
        1.297
      ],
      "d": [
        0.657,
        0.204,
        -0.726
      ],
      "len": 0.371
    },
    {
      "name": "Planta de bienvenida",
      "detail": "Vegetación en cada rincón del club.",
      "u": 0.061,
      "v": 0.392,
      "top": 0.208,
      "o": [
        -0.676,
        0.138,
        0.452
      ],
      "d": [
        0.064,
        -0.897,
        0.438
      ],
      "len": 0.478
    }
  ],
  "v-pesas1": [
    {
      "name": "Caminadoras",
      "detail": "Pantalla, inclinación y vista a la ciudad.",
      "u": 0.111,
      "v": 0.709,
      "top": 0.439,
      "o": [
        -0.695,
        0.49,
        -0.006
      ],
      "d": [
        0.15,
        -0.379,
        0.913
      ],
      "len": 1.347
    },
    {
      "name": "Pista de sprints",
      "detail": "15 metros marcados para sled y carreras.",
      "u": 0.382,
      "v": 0.726,
      "top": 0.536,
      "o": [
        -0.324,
        0.061,
        1.275
      ],
      "d": [
        0.309,
        0.348,
        -0.885
      ],
      "len": 1.333
    },
    {
      "name": "Banco plano",
      "detail": "Para press, remo y trabajo de core.",
      "u": 0.879,
      "v": 0.795,
      "top": 0.729,
      "o": [
        0.536,
        0.328,
        0.335
      ],
      "d": [
        0.176,
        -0.18,
        0.968
      ],
      "len": 0.625
    },
    {
      "name": "Planta",
      "detail": "Vegetación entre estaciones.",
      "u": 0.631,
      "v": 0.636,
      "top": 0.6,
      "o": [
        0.177,
        0.077,
        1.227
      ],
      "d": [
        0.113,
        0.35,
        -0.93
      ],
      "len": 0.214
    }
  ],
  "v-pesas2": [
    {
      "name": "Rack de mancuernas",
      "detail": "De 2 a 40 kg, en pares.",
      "u": 0.075,
      "v": 0.568,
      "top": 0.502,
      "o": [
        -0.412,
        0.113,
        0.708
      ],
      "d": [
        0.366,
        -0.228,
        0.902
      ],
      "len": 0.42
    },
    {
      "name": "Banco ajustable",
      "detail": "Siete inclinaciones para cada ejercicio.",
      "u": 0.334,
      "v": 0.617,
      "top": 0.555,
      "o": [
        -0.233,
        0.048,
        1.198
      ],
      "d": [
        0.393,
        0.272,
        -0.878
      ],
      "len": 0.382
    },
    {
      "name": "Kettlebells",
      "detail": "Pista funcional para trabajo de potencia.",
      "u": 0.61,
      "v": 0.634,
      "top": 0.582,
      "o": [
        0.081,
        0.18,
        0.882
      ],
      "d": [
        0.051,
        -0.341,
        0.939
      ],
      "len": 0.299
    },
    {
      "name": "Caminadoras",
      "detail": "Cardio frente al jardín interior.",
      "u": 0.865,
      "v": 0.576,
      "top": 0.43,
      "o": [
        0.228,
        -0.053,
        1.258
      ],
      "d": [
        0.221,
        0.446,
        -0.867
      ],
      "len": 0.515
    },
    {
      "name": "Mancuernas de 16 kg",
      "detail": "Listas en el tapete de estiramiento.",
      "u": 0.174,
      "v": 0.824,
      "top": 0.775,
      "o": [
        -0.323,
        0.264,
        0.618
      ],
      "d": [
        0.29,
        0.278,
        -0.916
      ],
      "len": 0.362
    },
    {
      "name": "Rodillo y botella",
      "detail": "Para soltar músculo al terminar.",
      "u": 0.531,
      "v": 0.799,
      "top": 0.721,
      "o": [
        0,
        0.206,
        0.783
      ],
      "d": [
        0.086,
        0.321,
        -0.943
      ],
      "len": 0.401
    }
  ],
  "v-pesas3": [
    {
      "name": "Rack de mancuernas",
      "detail": "Hexagonales, de goma, en pares.",
      "u": 0.094,
      "v": 0.494,
      "top": 0.447,
      "o": [
        -0.295,
        0.038,
        0.938
      ],
      "d": [
        0.357,
        -0.236,
        0.904
      ],
      "len": 0.381
    },
    {
      "name": "Bancos",
      "detail": "Planos y ajustables, siempre limpios.",
      "u": 0.27,
      "v": 0.573,
      "top": 0.506,
      "o": [
        -0.223,
        -0.007,
        1.237
      ],
      "d": [
        0.354,
        0.301,
        -0.885
      ],
      "len": 0.398
    },
    {
      "name": "Rack de sentadilla",
      "detail": "Con barra olímpica y seguros.",
      "u": 0.881,
      "v": 0.409,
      "top": 0.271,
      "o": [
        0.205,
        -0.233,
        1.216
      ],
      "d": [
        0.066,
        0.968,
        -0.244
      ],
      "len": 0.336
    }
  ],
  "v-pesas4": [
    {
      "name": "Banco",
      "detail": "Banco ajustable junto a las mancuernas.",
      "u": 0.37,
      "v": 0.863,
      "top": 0.74,
      "o": [
        -0.157,
        0.337,
        0.67
      ],
      "d": [
        0.172,
        0.053,
        -0.984
      ],
      "len": 0.67
    },
    {
      "name": "Mancuernas",
      "detail": "Pares de goma a la mano.",
      "u": 0.121,
      "v": 0.621,
      "top": 0.566,
      "o": [
        -0.247,
        0.152,
        0.178
      ],
      "d": [
        0.201,
        -0.181,
        0.963
      ],
      "len": 0.839
    },
    {
      "name": "Plataforma de levantamiento",
      "detail": "Barra olímpica y discos de goma.",
      "u": 0.742,
      "v": 0.555,
      "top": 0.514,
      "o": [
        -0.051,
        0.04,
        1.226
      ],
      "d": [
        0.937,
        0.078,
        -0.34
      ],
      "len": 0.365
    },
    {
      "name": "Cajón pliométrico",
      "detail": "Saltos y step-ups.",
      "u": 0.922,
      "v": 0.769,
      "top": 0.656,
      "o": [
        0.208,
        0.046,
        0.84
      ],
      "d": [
        0.084,
        0.637,
        -0.766
      ],
      "len": 0.438
    },
    {
      "name": "Rack con anillas",
      "detail": "Dominadas, fondos y gimnasia.",
      "u": 0.776,
      "v": 0.405,
      "top": 0.248,
      "o": [
        0.155,
        0.044,
        1.233
      ],
      "d": [
        0.002,
        -0.995,
        -0.104
      ],
      "len": 0.298
    }
  ],
  "v-fuerza2": [
    {
      "name": "Sled",
      "detail": "Empuje y arrastre sobre pasto sintético.",
      "u": 0.206,
      "v": 0.726,
      "top": 0.494,
      "o": [
        -0.241,
        0.284,
        0.394
      ],
      "d": [
        0.238,
        -0.305,
        0.922
      ],
      "len": 0.895
    },
    {
      "name": "Cajón pliométrico",
      "detail": "Saltos de 50 a 75 cm, con toalla y agua.",
      "u": 0.858,
      "v": 0.647,
      "top": 0.502,
      "o": [
        0.067,
        0.035,
        1.238
      ],
      "d": [
        0.288,
        0.187,
        -0.939
      ],
      "len": 0.719
    },
    {
      "name": "Cuerdas de batalla",
      "detail": "Acondicionamiento en intervalos.",
      "u": 0.855,
      "v": 0.846,
      "top": 0.746,
      "o": [
        0.2,
        0.226,
        0.768
      ],
      "d": [
        0.098,
        0.317,
        -0.943
      ],
      "len": 0.771
    }
  ],
  "v-fuerza3": [
    {
      "name": "Banco ajustable",
      "detail": "Press inclinado, remo y core.",
      "u": 0.182,
      "v": 0.749,
      "top": 0.59,
      "o": [
        -0.333,
        0.211,
        0.005
      ],
      "d": [
        0.297,
        0.093,
        0.95
      ],
      "len": 1.039
    },
    {
      "name": "Rack de mancuernas",
      "detail": "Pares de 6 a 22 kg a la mano.",
      "u": 0.145,
      "v": 0.507,
      "top": 0.387,
      "o": [
        -0.352,
        0.069,
        0.357
      ],
      "d": [
        0.465,
        -0.249,
        0.85
      ],
      "len": 0.77
    },
    {
      "name": "Cajón Umbral",
      "detail": "Step-ups y saltos controlados.",
      "u": 0.415,
      "v": 0.509,
      "top": 0.455,
      "o": [
        -0.109,
        0.021,
        1.094
      ],
      "d": [
        0.877,
        -0.201,
        0.436
      ],
      "len": 0.152
    },
    {
      "name": "Fitball",
      "detail": "Estabilidad y movilidad.",
      "u": 0.57,
      "v": 0.483,
      "top": 0.424,
      "o": [
        0.045,
        0.042,
        1.174
      ],
      "d": [
        0.033,
        -0.999,
        0.007
      ],
      "len": 0.119
    },
    {
      "name": "Mancuernas de 10 kg",
      "detail": "Las más pedidas de la sala.",
      "u": 0.625,
      "v": 0.897,
      "top": 0.814,
      "o": [
        -0.012,
        0.407,
        0.154
      ],
      "d": [
        0.778,
        -0.084,
        0.622
      ],
      "len": 0.315
    },
    {
      "name": "Tapete",
      "detail": "Para estirar al terminar.",
      "u": 0.719,
      "v": 0.723,
      "top": 0.635,
      "o": [
        -0.048,
        0.145,
        0.934
      ],
      "d": [
        0.703,
        0.282,
        -0.653
      ],
      "len": 0.555
    }
  ],
  "v-fuerza4": [
    {
      "name": "Caminadoras",
      "detail": "Calentamiento frente a la ciudad.",
      "u": 0.202,
      "v": 0.658,
      "top": 0.543,
      "o": [
        -0.197,
        0.192,
        0.86
      ],
      "d": [
        0.208,
        -0.282,
        0.937
      ],
      "len": 0.333
    },
    {
      "name": "Banco de cuero",
      "detail": "Con rodillo para femorales y espalda baja.",
      "u": 0.143,
      "v": 0.877,
      "top": 0.738,
      "o": [
        -0.228,
        0.442,
        -0.011
      ],
      "d": [
        0.125,
        -0.35,
        0.928
      ],
      "len": 0.75
    },
    {
      "name": "Discos",
      "detail": "Calibrados de 1.25 a 25 kg.",
      "u": 0.936,
      "v": 0.597,
      "top": 0.477,
      "o": [
        0.215,
        -0.046,
        1.135
      ],
      "d": [
        0.147,
        0.581,
        -0.801
      ],
      "len": 0.34
    },
    {
      "name": "Banco",
      "detail": "Banco plano junto a los discos.",
      "u": 0.932,
      "v": 0.887,
      "top": 0.752,
      "o": [
        0.24,
        0.465,
        0.179
      ],
      "d": [
        0.074,
        -0.687,
        0.723
      ],
      "len": 0.521
    },
    {
      "name": "Olivo",
      "detail": "Vegetación entre estaciones.",
      "u": 0.611,
      "v": 0.481,
      "top": 0.35,
      "o": [
        0.063,
        0.121,
        1.209
      ],
      "d": [
        0.007,
        -0.994,
        0.113
      ],
      "len": 0.272
    }
  ],
  "v-vest1": [
    {
      "name": "Banca central",
      "detail": "Tapizada, con luz a ras de piso.",
      "u": 0.559,
      "v": 0.845,
      "top": 0.703,
      "o": [
        -0.289,
        0.328,
        0.191
      ],
      "d": [
        0.988,
        0.045,
        -0.148
      ],
      "len": 0.703
    },
    {
      "name": "Maleta Umbral",
      "detail": "Parte del kit de bienvenida.",
      "u": 0.554,
      "v": 0.679,
      "top": 0.633,
      "o": [
        0.071,
        0.119,
        0.42
      ],
      "d": [
        0.092,
        0.537,
        -0.839
      ],
      "len": 0.187
    },
    {
      "name": "Lockers con código",
      "detail": "Sin llaves: entras con tu número.",
      "u": 0.874,
      "v": 0.414,
      "top": 0.114,
      "o": [
        0.32,
        -0.065,
        1.276
      ],
      "d": [
        0.543,
        -0.047,
        -0.838
      ],
      "len": 0.793
    },
    {
      "name": "Tocadores",
      "detail": "Espejos con luz y secadora profesional.",
      "u": 0.082,
      "v": 0.562,
      "top": 0.366,
      "o": [
        -0.763,
        0.145,
        0.42
      ],
      "d": [
        0.4,
        -0.244,
        0.883
      ],
      "len": 0.763
    },
    {
      "name": "Taburete",
      "detail": "Para arreglarte con calma.",
      "u": 0.606,
      "v": 0.579,
      "top": 0.551,
      "o": [
        0.123,
        0.078,
        1.334
      ],
      "d": [
        0.998,
        0.032,
        0.058
      ],
      "len": 0.076
    }
  ],
  "v-vest2": [
    {
      "name": "Taburetes",
      "detail": "Para arreglarte con calma.",
      "u": 0.194,
      "v": 0.779,
      "top": 0.648,
      "o": [
        -0.578,
        0.353,
        0.208
      ],
      "d": [
        0.49,
        -0.215,
        0.845
      ],
      "len": 0.811
    },
    {
      "name": "Tocador de piedra",
      "detail": "Espejos, apliques y amenidades.",
      "u": 0.211,
      "v": 0.596,
      "top": 0.563,
      "o": [
        -0.585,
        0.125,
        0.358
      ],
      "d": [
        0.557,
        -0.081,
        0.827
      ],
      "len": 0.693
    },
    {
      "name": "Lockers de madera",
      "detail": "Amplios, con cerradura digital.",
      "u": 0.78,
      "v": 0.497,
      "top": 0.333,
      "o": [
        0.373,
        -0.166,
        0.908
      ],
      "d": [
        0.003,
        0.998,
        -0.055
      ],
      "len": 0.326
    },
    {
      "name": "Banca",
      "detail": "Banca con luz bajo el asiento.",
      "u": 0.919,
      "v": 0.75,
      "top": 0.667,
      "o": [
        0.497,
        0.192,
        0.886
      ],
      "d": [
        0.206,
        0.196,
        -0.959
      ],
      "len": 0.773
    },
    {
      "name": "Espejos con luz",
      "detail": "Apliques cálidos a cada lado.",
      "u": 0.19,
      "v": 0.446,
      "top": 0.331,
      "o": [
        -0.534,
        -0.064,
        0.585
      ],
      "d": [
        0.612,
        0.051,
        0.789
      ],
      "len": 0.446
    }
  ],
  "v-regaderas": [
    {
      "name": "Lounge de recovery",
      "detail": "Sillones para descansar entre sesiones.",
      "u": 0.884,
      "v": 0.866,
      "top": 0.729,
      "o": [
        0.243,
        0.234,
        0.91
      ],
      "d": [
        0.181,
        0.266,
        -0.947
      ],
      "len": 0.752
    },
    {
      "name": "Lámpara de latón",
      "detail": "Luz baja para relajarte.",
      "u": 0.936,
      "v": 0.739,
      "top": 0.705,
      "o": [
        0.379,
        0.215,
        0.554
      ],
      "d": [
        0.003,
        0.756,
        0.655
      ],
      "len": 0.112
    },
    {
      "name": "Suite privada",
      "detail": "Reserva tu turno de 30 minutos.",
      "u": 0.179,
      "v": 0.5,
      "top": 0.143,
      "o": [
        -0.286,
        -0.36,
        0.523
      ],
      "d": [
        0.02,
        1,
        0.014
      ],
      "len": 0.839
    },
    {
      "name": "Olivo",
      "detail": "Vegetación junto al lounge.",
      "u": 0.883,
      "v": 0.489,
      "top": 0.326,
      "o": [
        0.331,
        -0.174,
        1.018
      ],
      "d": [
        0.011,
        1,
        -0.018
      ],
      "len": 0.321
    }
  ],
  "v-spa": [
    {
      "name": "Tina de agua fría",
      "detail": "12 °C para recuperar músculo.",
      "u": 0.18,
      "v": 0.606,
      "top": 0.547,
      "o": [
        -0.604,
        0.153,
        0.871
      ],
      "d": [
        0.819,
        -0.19,
        0.541
      ],
      "len": 0.505
    },
    {
      "name": "Sauna de madera",
      "detail": "Calor seco a 60 °C.",
      "u": 0.421,
      "v": 0.393,
      "top": 0.21,
      "o": [
        -0.115,
        -0.278,
        1.384
      ],
      "d": [
        0.096,
        0.981,
        -0.171
      ],
      "len": 0.406
    },
    {
      "name": "Regadera de vapor",
      "detail": "Eucalipto y vapor después del sauna.",
      "u": 0.63,
      "v": 0.39,
      "top": 0.208,
      "o": [
        0.162,
        0.097,
        1.384
      ],
      "d": [
        0.007,
        -0.997,
        -0.08
      ],
      "len": 0.399
    },
    {
      "name": "Toallas tibias",
      "detail": "Algodón turco recién salido del calentador.",
      "u": 0.857,
      "v": 0.835,
      "top": 0.657,
      "o": [
        0.334,
        0.16,
        1.154
      ],
      "d": [
        0.162,
        0.254,
        -0.954
      ],
      "len": 1.205
    },
    {
      "name": "Escalones de luz",
      "detail": "Bajada iluminada a la tina.",
      "u": 0.331,
      "v": 0.734,
      "top": 0.596,
      "o": [
        -0.28,
        0.346,
        0.578
      ],
      "d": [
        0.262,
        -0.427,
        0.865
      ],
      "len": 0.667
    }
  ]
};
