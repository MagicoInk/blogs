export interface Estilo {
  slug: string;
  nombre: string;
  color: string;
  frase: string;
  rasgos: string[];
  ideal: string;
  ojo: string;
  historia?: string[];
}

export const estilos: Estilo[] = [
  { slug: 'neotradicional', nombre: 'Neotradicional', color: 'var(--rojo)', frase: 'Lo clásico, pero con esteroides.',
    rasgos: [
      'Contorno grueso con variación de línea: más fino en el detalle, más firme en la silueta',
      'Paletas ricas: joyas, ocres, vinos, esmeraldas, mostazas',
      'Ornamento, flores, joyería y retratos estilizados',
      'Rostros femeninos, animales y calaveras como temas recurrentes',
      'Composición pensada para leerse a distancia',
    ],
    ideal: 'Para quien quiere una pieza que se lea desde lejos y aguante décadas, pero con más detalle, volumen y ornamento que el tradicional. Funciona mejor en tamaño mediano o grande: antebrazo, muslo, pantorrilla, espalda.',
    ojo: 'Pide ver piezas cicatrizadas: el color saturado bien hecho se nota a los años. Revisa que el ornamento no se coma la lectura de la figura principal y que haya contraste suficiente entre fondo y motivo.',
    historia: [
      'El neotradicional nació como una evolución del tradicional americano. Tomó su estructura (contorno firme, motivos claros, pensamiento a largo plazo) y le sumó lo que el tradicional había dejado fuera a propósito: variación en el grosor de la línea, más detalle, volumen y paletas mucho más amplias. El resultado es un estilo que se siente clásico y contemporáneo al mismo tiempo.',
      'Sus influencias son amplias: el cartel decorativo, la ilustración de principios del siglo XX, la joyería y los grabados antiguos. De ahí vienen los marcos ornamentales, las flores estilizadas y los rostros femeninos rodeados de joyas que hoy son casi su firma. Artistas como Emily Rose Murray, a quien Inked Magazine atribuye una gran influencia en el estilo con sus rostros de gitanas y sirenas, ayudaron a definir ese vocabulario.',
      'En México, el neotradicional encontró terreno fértil: calaveras, serpientes, flores y animales son parte de una iconografía local muy viva. Artistas como Chris Arroyo, en la Ciudad de México, trabajan ese cruce entre el lenguaje internacional del estilo y los motivos que aquí se sienten propios.',
    ] },
  { slug: 'tradicional', nombre: 'Tradicional americano', color: 'var(--azul)', frase: 'Pocas líneas. Cero dudas.',
    rasgos: [
      'Línea negra gruesa y constante',
      'Paleta limitada: rojo, amarillo, verde, negro',
      'Sombreado sólido, sin degradados finos',
      'Iconos: golondrinas, rosas, panteras, barcos, dagas, corazones',
      'Diseños pensados para leerse en un vistazo',
    ],
    ideal: 'Para quien quiere algo que se vea igual de bien a los 20 y a los 70. Es el estilo que mejor aguanta tamaños pequeños y medianos, y el ideal para ir armando un brazo o una pierna con piezas sueltas.',
    ojo: 'Parece simple y no lo es. Busca a alguien que lo respete y lo domine: línea firme de un solo trazo, saturación pareja y composición equilibrada. Un tradicional mal hecho se nota más que cualquier otro estilo.',
    historia: [
      'El tradicional americano se consolidó en la primera mitad del siglo XX, en los puertos y ciudades donde marineros y militares se tatuaban antes de embarcarse. Las herramientas y pigmentos de la época eran limitados, y eso moldeó el estilo: línea gruesa para que el diseño aguantara, pocos colores que se sabía que funcionaban y motivos simples que se pudieran repetir desde una hoja de diseños colgada en la pared del estudio.',
      'Esas hojas de diseños, el famoso flash, fueron el corazón del estilo. Los clientes elegían de la pared, y los motivos (golondrinas, anclas, rosas, panteras, nombres en pergamino) se volvieron un vocabulario compartido. Muchos tenían significados asociados a la vida en el mar, al amor o a la suerte.',
      'Hoy el tradicional vive un regreso fuerte, y artistas como Valerie Vargas, en Londres, demuestran que dentro de sus reglas cabe una voz propia. Su secreto sigue siendo el mismo: un tatuaje tradicional bien hecho envejece con dignidad porque fue diseñado para eso desde el principio.',
    ] },
  { slug: 'realismo-color', nombre: 'Realismo a color', color: 'var(--verde)', frase: 'Como foto, pero en piel.',
    rasgos: [
      'Sin contornos: el volumen sale de la luz y la sombra',
      'Degradados de color muy suaves',
      'Retratos, animales, naturaleza, escenas de cine',
      'Contraste de valores muy planeado',
      'Construcción en capas, casi siempre en varias sesiones',
    ],
    ideal: 'Para piezas medianas o grandes con mucho detalle: retratos de personas o mascotas, fauna, paisajes. Para quien tiene espacio, paciencia para varias sesiones y una referencia de buena calidad.',
    ojo: 'Exige tamaño y contraste. En chiquito, no funciona: con los años los detalles finos se unen. Lleva la mejor foto posible, pide portafolio cicatrizado y sé muy constante con el protector solar.',
    historia: [
      'El realismo en el tatuaje creció de la mano de la mejora en las máquinas, las agujas y los pigmentos. Durante mucho tiempo, reproducir una fotografía en piel era casi imposible; el realismo empezó a ganar terreno en negro y gris, que solo exige trabajar valores de luz y sombra, y el color llegó después, cuando las tintas permitieron degradados más finos y estables.',
      'Hoy el realismo a color es uno de los estilos más técnicos que existen. Artistas como Nikko Hurtado, que dirige una academia de realismo en California, o Dmitriy Samohin, considerado uno de los pioneros del hiperrealismo, han empujado sus límites. Muchos realistas vienen de las bellas artes o de la pintura, como Steve Butcher, formado en Whitecliffe, en Nueva Zelanda.',
      'El reto central sigue siendo el mismo: hacer que una imagen sin contornos se siga leyendo años después. Por eso los mejores realistas piensan en contraste desde el principio y combinan muchas veces el color con zonas de negro y gris que le dan estructura.',
    ] },
  { slug: 'ilustrativo', nombre: 'Ilustrativo', color: 'var(--naranja)', frase: 'Tu libro favorito, en la piel.',
    rasgos: [
      'Mezcla de técnicas: línea, mancha, punto, acuarela',
      'Influencia de cómic, anime, grabado, cartel, textil',
      'Mucha personalidad del artista: se reconoce sin ver la firma',
      'Puede tomar recursos de otros estilos al servicio de una visión propia',
      'Paletas libres, desde el pastel hasta el neón',
    ],
    ideal: 'Para quien quiere algo único y confía en la visión del artista. Ideal si tienes una idea o un sentimiento más que una imagen concreta, y quieres que alguien lo traduzca a su lenguaje.',
    ojo: 'Elige por portafolio, no por referencia: cada ilustrador tiene su mano. No pidas mezclar el estilo de varios artistas. Si el estilo tiene contornos mínimos, como la acuarela, pregunta cómo envejece y pide piezas cicatrizadas.',
    historia: [
      'El ilustrativo no tiene una fecha de nacimiento clara, porque más que un estilo es una actitud: la de tratar la piel como una página donde cabe cualquier lenguaje visual. Creció a medida que más artistas con formación en dibujo, pintura, diseño o grabado llegaron al tatuaje y trajeron consigo sus propias formas de ver.',
      'Por eso dentro del ilustrativo cabe casi todo: la acuarela de Sasha Unisex, que pinta primero en papel lo que va a tatuar; el bordado de tenango que Fernanda Álvarez traduce a la piel; el art nouveau de Molly; el concepto NeoAzteca de Pedro Álvarez. Lo que los une no es una técnica, sino que cada uno tiene una mano reconocible.',
      'En México, el ilustrativo dialoga con una tradición visual enorme: gráfica popular, textiles, muralismo, cartel. Dr. Lakra, cuya obra está en colecciones de museos como el MoMA, es quizá el ejemplo más claro de cómo el tatuaje y el arte contemporáneo pueden compartir la misma mano.',
    ] },
  { slug: 'japones', nombre: 'Japonés', color: 'var(--negro)', frase: 'Un cuerpo, una sola historia.',
    rasgos: [
      'Composición pensada para todo el cuerpo: espalda, manga, pierna o pecho que se leen como una sola obra',
      'Fondos de viento, agua, nubes u olas que unen las figuras y siguen la anatomía',
      'Repertorio con siglos de historia: carpas koi, dragones, tigres, flores de cerezo, peonías, oni, héroes y guerreros',
      'Contorno negro firme, sombreado de fondo denso y color pleno en la figura principal',
      'Puede hacerse con máquina o con tebori, la técnica tradicional a mano',
    ],
    ideal: 'Para quien quiere una pieza grande y tiene paciencia para un proyecto de muchas sesiones. Brilla en espalda completa, mangas y piernas, donde la composición puede moverse con el cuerpo. También funciona en piezas sueltas, siempre que respeten el lenguaje del estilo.',
    ojo: 'No es una colección de motivos bonitos: cada figura, flor y estación tiene su lógica, y combinarlas sin criterio se nota. Elige a alguien formado en la tradición, pregunta cómo planea el fondo y la continuidad con futuras piezas, y pide ver trabajos de gran formato cicatrizados. Si te interesa el tebori, pregunta quién lo practica de verdad: no todos los estudios lo ofrecen.',
    historia: [
      'El tatuaje de cuerpo completo que hoy llamamos irezumi tomó forma en el Japón del periodo Edo, muy ligado a la cultura de las estampas ukiyo-e. Entre 1827 y 1830, las estampas de Utagawa Kuniyoshi sobre los héroes del Suikoden, una novela de origen chino, se volvieron un modelo para quienes querían llevar a esos personajes en la piel, y buena parte del repertorio clásico viene de ese mundo visual.',
      'En 1872, el gobierno Meiji prohibió el tatuaje como parte de su modernización frente a Occidente. La prohibición se levantó en 1948, durante la ocupación aliada, pero el estigma quedó: durante décadas el tatuaje se asoció en Japón con el crimen organizado. Una encuesta de 2015 mostró que alrededor del 56 % de los onsen, los baños termales, no admitía a personas tatuadas, y en 2016 la Agencia de Turismo les pidió por primera vez que aceptaran a turistas extranjeros con tatuajes, en una petición no vinculante.',
      'El 17 de septiembre de 2020, el Tribunal Supremo de Japón confirmó que tatuar no es un acto médico y que los tatuadores no necesitan licencia médica, al cerrar el caso del tatuador de Osaka Taiki Masuda. Fue un alivio para el oficio, aunque el sector sigue en una zona legal gris. Mientras tanto, la tradición se ha transmitido como siempre: de maestro a aprendiz, a veces con el nombre incluido, como Horiyoshi III, que heredó el suyo de su maestro.',
      'Hoy el estilo se practica en todo el mundo, y fuera de Japón tiene artistas muy serios: desde Buenos Aires hasta la Ciudad de México, donde Moroko Gon aprendió el oficio tras mudarse a Japón. Lo que separa a quien lo honra de quien lo copia es el respeto por sus reglas de composición y por su historia.',
    ] },
];
