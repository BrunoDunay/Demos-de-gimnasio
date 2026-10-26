/**
 * Recorrido del club: zonas con varias vistas (fotos mejoradas con su mapa de profundidad).
 * Los objetos con hover de cada vista (silueta, nombre y eje 3D) están en objects.ts, que se genera
 * con scripts/club3d/ia/objetos.mjs a partir de scripts/club3d/objetos.json.
 * `pan` es el punto de la foto al que mira la cámara al entrar y al salir de la vista.
 */
export interface View {
  id: string;
  /** Proporción ancho / alto de la foto. */
  aspect: number;
  pan: [[number, number], [number, number]];
  zoom: [number, number];
}

export interface Zone {
  id: string;
  name: string;
  kicker: string;
  text: string;
  facts: string[];
  views: View[];
}

const WIDE = { pan: [[0.5, 0.5], [0.5, 0.5]] as View['pan'], zoom: [1, 1.07] as View['zoom'] };
const TALL = { pan: [[0.5, 0.36], [0.5, 0.64]] as View['pan'], zoom: [1, 1.04] as View['zoom'] };

export const ZONES: Zone[] = [
  {
    id: 'entrada',
    name: 'La entrada',
    kicker: 'Bienvenida',
    text: 'Te recibe la recepción iluminada, la barra de café y tu toalla lista. Aquí empieza la desconexión.',
    facts: ['Café de especialidad', 'Lockers digitales', 'Aroma de cedro y bergamota'],
    views: [
      {
        id: 'v-entrada1', aspect: 1.296, ...WIDE,
      },
      {
        id: 'v-entrada2', aspect: 1.5, ...WIDE,
      },
    ],
  },
  {
    id: 'pesas',
    name: 'Sala de pesas',
    kicker: 'Gimnasio',
    text: 'El gimnasio completo: cardio, peso libre y máquinas, con coach de piso de 5:30 a 22:00.',
    facts: ['Cardio con vista', 'Mancuernas de 2 a 40 kg', 'Incluida en todas las membresías'],
    views: [
      {
        id: 'v-pesas1', aspect: 1.5, ...WIDE,
      },
      {
        id: 'v-pesas2', aspect: 0.8, ...TALL,
      },
      {
        id: 'v-pesas3', aspect: 0.5625, ...TALL,
      },
      {
        id: 'v-pesas4', aspect: 0.5625, ...TALL,
      },
    ],
  },
  {
    id: 'fuerza',
    name: 'Estudio de fuerza',
    kicker: 'Fuerza',
    text: 'Peso libre con técnica de estudio: racks con espejo de luz, sled, cuerdas y un coach que corrige cada repetición.',
    facts: ['Grupos de 8 personas', 'Barras y discos calibrados', 'Estudio privado uno a uno'],
    views: [
      {
        id: 'v-fuerza1', aspect: 1.5, ...WIDE,
      },
      {
        id: 'v-fuerza2', aspect: 0.6667, ...TALL,
      },
      {
        id: 'v-fuerza3', aspect: 0.6667, ...TALL,
      },
      {
        id: 'v-fuerza4', aspect: 0.5755, ...TALL,
      },
    ],
  },
  {
    id: 'vestidores',
    name: 'Vestidores',
    kicker: 'Vestidores',
    text: 'Piedra, madera ahumada, tocadores con luz y regaderas de lluvia. Todo listo para que llegues y te vayas sin prisa.',
    facts: ['Lockers con código', 'Regaderas de lluvia', 'Amenidades de autor'],
    views: [
      {
        id: 'v-vest1', aspect: 1.5, ...WIDE,
      },
      {
        id: 'v-vest2', aspect: 1.333, ...WIDE,
      },
    ],
  },
  {
    id: 'recovery',
    name: 'Recovery',
    kicker: 'Recovery',
    text: 'Sauna, tina fría y vapor en una suite privada. Quince minutos para bajar las revoluciones antes de volver al día.',
    facts: ['Sauna infrarrojo', 'Tina de agua fría', 'Turnos de 30 minutos'],
    views: [
      {
        id: 'v-regaderas', aspect: 0.8696, ...TALL,
      },
      {
        id: 'v-spa', aspect: 1.25, ...WIDE,
      },
    ],
  },
];
