export interface Estilo { slug: string; nombre: string; color: string; frase: string; rasgos: string[]; ideal: string; ojo: string }

export const estilos: Estilo[] = [
  { slug: 'neotradicional', nombre: 'Neotradicional', color: 'var(--rojo)', frase: 'Lo clásico, pero con esteroides.',
    rasgos: ['Contorno grueso con variación de línea', 'Paletas ricas: joyas, ocres, vinos', 'Ornamento, flores y retratos estilizados'],
    ideal: 'Para quien quiere una pieza que se lea desde lejos y aguante décadas.', ojo: 'Pide ver piezas cicatrizadas: el color saturado bien hecho se nota a los años.' },
  { slug: 'tradicional', nombre: 'Tradicional americano', color: 'var(--azul)', frase: 'Pocas líneas. Cero dudas.',
    rasgos: ['Línea negra gruesa', 'Paleta limitada: rojo, amarillo, verde, negro', 'Iconos: golondrinas, rosas, panteras, barcos'],
    ideal: 'Para quien quiere algo que se vea igual de bien a los 20 y a los 70.', ojo: 'Parece simple y no lo es. Busca a alguien que lo respete y lo domine.' },
  { slug: 'realismo-color', nombre: 'Realismo a color', color: 'var(--verde)', frase: 'Como foto, pero en piel.',
    rasgos: ['Sin contornos', 'Degradados de color muy suaves', 'Retratos, animales, naturaleza'],
    ideal: 'Para piezas medianas o grandes con mucho detalle.', ojo: 'Exige tamaño y contraste. En chiquito, no funciona.' },
  { slug: 'ilustrativo', nombre: 'Ilustrativo', color: 'var(--naranja)', frase: 'Tu libro favorito, en la piel.',
    rasgos: ['Mezcla de técnicas', 'Influencia de cómic, anime, grabado', 'Mucha personalidad del artista'],
    ideal: 'Para quien quiere algo único y confía en la visión del artista.', ojo: 'Elige por portafolio, no por referencia: cada ilustrador tiene su mano.' },
];
