/**
 * Recorrido del club: zonas con varias vistas (fotos ampliadas x2 con su mapa de profundidad).
 * `spots` son los objetos con hover: centro (u, v de 0 a 1 sobre la foto) y radio como fracción de
 * la altura de la foto. La profundidad hace que la luz solo toque el objeto y su superficie.
 * `pan` es el punto de la foto al que mira la cámara al entrar y al salir de la vista.
 */
export interface Spot {
  name: string;
  detail: string;
  u: number;
  v: number;
  r: number;
}

export interface View {
  id: string;
  /** Proporción ancho / alto de la foto. */
  aspect: number;
  pan: [[number, number], [number, number]];
  zoom: [number, number];
  spots: Spot[];
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
        spots: [
          { name: 'Recepción', detail: 'Tu nombre, tu toalla y tu locker listos al llegar.', u: 0.5, v: 0.8, r: 0.22 },
          { name: 'Lámparas de latón', detail: 'Luz cálida que baja con la tarde.', u: 0.5, v: 0.28, r: 0.08 },
          { name: 'Amenidades de autor', detail: 'Cremas, aceites y toallas de algodón turco.', u: 0.78, v: 0.47, r: 0.12 },
          { name: 'Lounge', detail: 'Sillones para esperar tu clase con un café.', u: 0.92, v: 0.75, r: 0.09 },
          { name: 'Acceso al club', detail: 'Arcos de espejo hacia los estudios.', u: 0.2, v: 0.52, r: 0.14 },
        ],
      },
      {
        id: 'v-entrada2', aspect: 1.5, ...WIDE,
        spots: [
          { name: 'Muro de bienvenida', detail: 'Letrero retroiluminado en latón.', u: 0.26, v: 0.33, r: 0.15 },
          { name: 'Check-in', detail: 'Entras con tu código en segundos.', u: 0.24, v: 0.72, r: 0.18 },
          { name: 'Estudio de fuerza', detail: 'Racks y plataformas al fondo de la sala.', u: 0.62, v: 0.52, r: 0.14 },
          { name: 'Mancuernas', detail: 'Pares de 2 a 40 kg siempre en su lugar.', u: 0.92, v: 0.8, r: 0.14 },
          { name: 'Jardín', detail: 'Luz natural al fondo del club.', u: 0.93, v: 0.42, r: 0.12 },
        ],
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
        spots: [
          { name: 'Caminadoras', detail: 'Pantalla, inclinación y vista a la ciudad.', u: 0.15, v: 0.72, r: 0.2 },
          { name: 'Pista de sprints', detail: '15 metros marcados para sled y carreras.', u: 0.47, v: 0.82, r: 0.15 },
          { name: 'Racks de potencia', detail: 'Barras olímpicas y discos calibrados.', u: 0.85, v: 0.55, r: 0.17 },
          { name: 'Banco plano', detail: 'Para press, remo y trabajo de core.', u: 0.86, v: 0.82, r: 0.1 },
          { name: 'Luz lineal', detail: 'Guía el recorrido de toda la sala.', u: 0.35, v: 0.18, r: 0.12 },
        ],
      },
      {
        id: 'v-pesas2', aspect: 0.8, ...TALL,
        spots: [
          { name: 'Rack de mancuernas', detail: 'De 2 a 40 kg, en pares.', u: 0.07, v: 0.57, r: 0.08 },
          { name: 'Banco ajustable', detail: 'Siete inclinaciones para cada ejercicio.', u: 0.32, v: 0.61, r: 0.06 },
          { name: 'Pista funcional', detail: 'Kettlebells y sled para trabajo de potencia.', u: 0.62, v: 0.6, r: 0.06 },
          { name: 'Caminadoras', detail: 'Cardio frente al jardín interior.', u: 0.86, v: 0.53, r: 0.08 },
          { name: 'Jardín interior', detail: 'Cascada y vegetación para entrenar con calma.', u: 0.48, v: 0.42, r: 0.07 },
          { name: 'Zona de estiramiento', detail: 'Tapetes, rodillos y mancuernas ligeras.', u: 0.17, v: 0.83, r: 0.07 },
        ],
      },
      {
        id: 'v-pesas3', aspect: 0.5625, ...TALL,
        spots: [
          { name: 'Rack de mancuernas', detail: 'Hexagonales, de goma, en pares.', u: 0.08, v: 0.48, r: 0.07 },
          { name: 'Bancos', detail: 'Planos y ajustables, siempre limpios.', u: 0.28, v: 0.58, r: 0.06 },
          { name: 'Poleas dobles', detail: 'Cables para tren superior y core.', u: 0.32, v: 0.42, r: 0.06 },
          { name: 'Cardio al ventanal', detail: 'Caminadoras y bici frente a la ciudad.', u: 0.53, v: 0.44, r: 0.06 },
          { name: 'Rack de sentadilla', detail: 'Con barra olímpica y seguros.', u: 0.88, v: 0.5, r: 0.08 },
        ],
      },
      {
        id: 'v-pesas4', aspect: 0.5625, ...TALL,
        spots: [
          { name: 'Ventanal al poniente', detail: 'El atardecer entra a toda la sala.', u: 0.4, v: 0.32, r: 0.12 },
          { name: 'Plataforma de levantamiento', detail: 'Barra olímpica y discos de goma.', u: 0.5, v: 0.56, r: 0.06 },
          { name: 'Kettlebells', detail: 'De 4 a 32 kg en la pared.', u: 0.06, v: 0.42, r: 0.05 },
          { name: 'Bicis de aire', detail: 'Intervalos cortos e intensos.', u: 0.3, v: 0.47, r: 0.05 },
          { name: 'Rack con anillas', detail: 'Dominadas, fondos y trabajo de gimnasia.', u: 0.82, v: 0.44, r: 0.08 },
          { name: 'Banco y mancuernas', detail: 'Todo a la mano para tu rutina.', u: 0.15, v: 0.75, r: 0.08 },
        ],
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
        spots: [
          { name: 'Rack con espejo de luz', detail: 'Cada estación con su propio rack.', u: 0.17, v: 0.45, r: 0.17 },
          { name: 'Banco de press', detail: 'Ajustable y anclado al rack.', u: 0.2, v: 0.67, r: 0.1 },
          { name: 'Estaciones gemelas', detail: 'Seis racks para grupos de ocho.', u: 0.83, v: 0.45, r: 0.17 },
          { name: 'Muro del estudio', detail: 'Luz perimetral cálida y concreto pulido.', u: 0.5, v: 0.37, r: 0.1 },
          { name: 'Mancuernas', detail: 'A un paso de cada estación.', u: 0.24, v: 0.77, r: 0.05 },
        ],
      },
      {
        id: 'v-fuerza2', aspect: 0.6667, ...TALL,
        spots: [
          { name: 'Sled', detail: 'Empuje y arrastre sobre pasto sintético.', u: 0.18, v: 0.75, r: 0.07 },
          { name: 'Cuerdas de batalla', detail: 'Acondicionamiento en intervalos.', u: 0.82, v: 0.89, r: 0.07 },
          { name: 'Cajón pliométrico', detail: 'Saltos de 50 a 75 cm.', u: 0.62, v: 0.69, r: 0.06 },
          { name: 'Anillas', detail: 'Gimnasia y trabajo de tracción.', u: 0.75, v: 0.38, r: 0.06 },
          { name: 'Zona de mancuernas', detail: 'Al fondo, frente al espejo.', u: 0.1, v: 0.52, r: 0.06 },
        ],
      },
      {
        id: 'v-fuerza3', aspect: 0.6667, ...TALL,
        spots: [
          { name: 'Rack de mancuernas', detail: 'Pares de 6 a 22 kg a la mano.', u: 0.15, v: 0.53, r: 0.09 },
          { name: 'Banco ajustable', detail: 'Press inclinado, remo y core.', u: 0.2, v: 0.69, r: 0.08 },
          { name: 'Fitball', detail: 'Estabilidad y movilidad.', u: 0.57, v: 0.5, r: 0.05 },
          { name: 'Cajón Umbral', detail: 'Step-ups y saltos controlados.', u: 0.41, v: 0.51, r: 0.05 },
          { name: 'Tapete', detail: 'Para estirar al terminar.', u: 0.7, v: 0.73, r: 0.08 },
          { name: 'Mancuernas de 10 kg', detail: 'Las más pedidas de la sala.', u: 0.62, v: 0.88, r: 0.06 },
        ],
      },
      {
        id: 'v-fuerza4', aspect: 0.5755, ...TALL,
        spots: [
          { name: 'Caminadoras', detail: 'Calentamiento frente a la ciudad.', u: 0.2, v: 0.68, r: 0.08 },
          { name: 'Muro de mármol', detail: 'Los cuatro valores del club.', u: 0.86, v: 0.43, r: 0.08 },
          { name: 'Estantería', detail: 'Toallas, agua y amenidades.', u: 0.68, v: 0.44, r: 0.07 },
          { name: 'Discos', detail: 'Calibrados de 1.25 a 25 kg.', u: 0.92, v: 0.62, r: 0.06 },
          { name: 'Banco con rodillo', detail: 'Para femorales y espalda baja.', u: 0.12, v: 0.82, r: 0.06 },
        ],
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
        spots: [
          { name: 'Banca central', detail: 'Tapizada, con luz a ras de piso.', u: 0.56, v: 0.82, r: 0.15 },
          { name: 'Lockers con código', detail: 'Sin llaves: entras con tu número.', u: 0.85, v: 0.48, r: 0.18 },
          { name: 'Tocadores', detail: 'Espejos con luz y secadora profesional.', u: 0.12, v: 0.45, r: 0.15 },
          { name: 'Regaderas', detail: 'Lluvia con agua caliente todo el día.', u: 0.33, v: 0.42, r: 0.07 },
          { name: 'Planta y piedra', detail: 'Materiales nobles en cada rincón.', u: 0.44, v: 0.56, r: 0.07 },
        ],
      },
      {
        id: 'v-vest2', aspect: 1.333, ...WIDE,
        spots: [
          { name: 'Tocador de piedra', detail: 'Espejos, apliques y amenidades.', u: 0.17, v: 0.5, r: 0.13 },
          { name: 'Taburetes', detail: 'Para arreglarte con calma.', u: 0.18, v: 0.76, r: 0.1 },
          { name: 'Lockers de madera', detail: 'Amplios, con cerradura digital.', u: 0.83, v: 0.5, r: 0.15 },
          { name: 'Pasillo de regaderas', detail: 'Cabinas privadas de lluvia.', u: 0.5, v: 0.45, r: 0.12 },
        ],
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
        spots: [
          { name: 'Lounge de recovery', detail: 'Sillones para descansar entre sesiones.', u: 0.82, v: 0.76, r: 0.09 },
          { name: 'Lámpara de latón', detail: 'Luz baja para relajarte.', u: 0.92, v: 0.71, r: 0.04 },
          { name: 'Suite privada', detail: 'Reserva tu turno de 30 minutos.', u: 0.17, v: 0.49, r: 0.12 },
          { name: 'Pasillo de suites', detail: 'Cuatro suites con regadera de vapor.', u: 0.6, v: 0.49, r: 0.08 },
        ],
      },
      {
        id: 'v-spa', aspect: 1.25, ...WIDE,
        spots: [
          { name: 'Tina de agua fría', detail: '12 °C para recuperar músculo.', u: 0.2, v: 0.6, r: 0.16 },
          { name: 'Sauna de madera', detail: 'Calor seco a 60 °C.', u: 0.4, v: 0.38, r: 0.14 },
          { name: 'Regadera de vapor', detail: 'Eucalipto y vapor después del sauna.', u: 0.63, v: 0.4, r: 0.12 },
          { name: 'Toallas tibias', detail: 'Algodón turco recién salido del calentador.', u: 0.82, v: 0.75, r: 0.1 },
          { name: 'Vestidor privado', detail: 'Bata y sandalias listas para ti.', u: 0.9, v: 0.35, r: 0.08 },
        ],
      },
    ],
  },
];
