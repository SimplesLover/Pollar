// Imagens reais de geladeiras e diagramas via Wikimedia Commons
const commons = (file, width = 900) => `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;

const models = [
  {
    code: 'PT-RF-200',
    name: 'PolarTech RF 200',
    type: 'refrigerador',
    brand: 'PolarTech',
    capacity: 200,
    dimensions: { w: 60, h: 160, d: 65 },
    power: 180,
    images: [
      commons('Inside domestic refrigerator.JPG'),
      commons('ExpensiveRefrigerators.JPG')
    ],
    specs: { tempRange: '-2°C a 8°C', voltage: '220V', doors: 1, shelves: 4 },
    pieceDiagramImage: commons('Refrigeration Cycle.png', 1000),
    pieceMarkers: [
      { partCode: 'P-COMP-01', x: 0.2, y: 0.8 },
      { partCode: 'P-THERM-01', x: 0.7, y: 0.2 },
      { partCode: 'P-FAN-01', x: 0.5, y: 0.5 },
    ],
  },
  {
    code: 'PT-RF-300',
    name: 'PolarTech RF 300',
    type: 'refrigerador',
    brand: 'PolarTech',
    capacity: 300,
    dimensions: { w: 65, h: 170, d: 70 },
    power: 220,
    images: [
      commons('Double Door Refrigerator.jpg'),
      commons('Inside domestic refrigerator.JPG')
    ],
    specs: { tempRange: '-2°C a 8°C', voltage: '220V', doors: 2, shelves: 5 },
    pieceDiagramImage: commons('Refrigeration Cycle.png', 1000),
    pieceMarkers: [
      { partCode: 'P-COMP-02', x: 0.22, y: 0.82 },
      { partCode: 'P-THERM-02', x: 0.72, y: 0.22 },
      { partCode: 'P-FAN-02', x: 0.52, y: 0.52 },
    ],
  },
  {
    code: 'PT-CF-500',
    name: 'PolarTech CF 500',
    type: 'camara',
    brand: 'PolarTech',
    capacity: 500,
    dimensions: { w: 200, h: 220, d: 180 },
    power: 650,
    images: [
      commons('Refrigeration comp and coil.jpg'),
      commons('Sala de máquinas refrigeración.JPG')
    ],
    specs: { tempRange: '-20°C a -5°C', voltage: '380V trifásico', doors: 1, shelves: 8 },
    pieceDiagramImage: commons('Refrigeration Cycle.png', 1000),
    pieceMarkers: [
      { partCode: 'P-COMP-03', x: 0.18, y: 0.88 },
      { partCode: 'P-CTRL-01', x: 0.78, y: 0.18 },
      { partCode: 'P-EVAP-01', x: 0.45, y: 0.4 },
    ],
  },
  {
    code: 'FC-RF-250',
    name: 'FrostCool RF 250',
    type: 'refrigerador',
    brand: 'FrostCool',
    capacity: 250,
    dimensions: { w: 62, h: 165, d: 66 },
    power: 200,
    images: [
      commons('Fridge.jpg'),
      commons('Inside domestic refrigerator.JPG')
    ],
    specs: { tempRange: '-1°C a 8°C', voltage: '220V', doors: 1, shelves: 4 },
    pieceDiagramImage: commons('Refrigeration Cycle.png', 1000),
    pieceMarkers: [
      { partCode: 'P-COMP-01', x: 0.2, y: 0.82 },
      { partCode: 'P-THERM-03', x: 0.68, y: 0.24 },
      { partCode: 'P-FAN-03', x: 0.5, y: 0.56 },
    ],
  },
  {
    code: 'AP-CF-700',
    name: 'ArcticPro CF 700',
    type: 'camara',
    brand: 'ArcticPro',
    capacity: 700,
    dimensions: { w: 220, h: 240, d: 200 },
    power: 820,
    images: [
      commons('Refrigerating plant, Canada Coldstore, Brunswick Place - geograph.org.uk - 684943.jpg'),
      commons('BIB - Kältemaschine.jpg')
    ],
    specs: { tempRange: '-25°C a -10°C', voltage: '380V trifásico', doors: 2, shelves: 10 },
    pieceDiagramImage: commons('Refrigeration Cycle.png', 1000),
    pieceMarkers: [
      { partCode: 'P-COMP-04', x: 0.15, y: 0.9 },
      { partCode: 'P-CTRL-02', x: 0.8, y: 0.15 },
      { partCode: 'P-EVAP-02', x: 0.48, y: 0.38 },
    ],
  },
  {
    code: 'GM-RF-180',
    name: 'GelMaster RF 180',
    type: 'refrigerador',
    brand: 'GelMaster',
    capacity: 180,
    dimensions: { w: 58, h: 155, d: 60 },
    power: 160,
    images: [
      commons('New Fridge (373767749).jpg'),
      commons('Inside domestic refrigerator.JPG')
    ],
    specs: { tempRange: '0°C a 10°C', voltage: '127V/220V', doors: 1, shelves: 3 },
    pieceDiagramImage: commons('Refrigeration Cycle.png', 1000),
    pieceMarkers: [
      { partCode: 'P-COMP-01', x: 0.25, y: 0.83 },
      { partCode: 'P-THERM-04', x: 0.7, y: 0.25 },
      { partCode: 'P-FAN-04', x: 0.52, y: 0.55 },
    ],
  },
  {
    code: 'IB-RF-320',
    name: 'IceBox RF 320',
    type: 'refrigerador',
    brand: 'IceBox',
    capacity: 320,
    dimensions: { w: 66, h: 175, d: 72 },
    power: 240,
    images: [
      commons('ExpensiveRefrigerators.JPG'),
      commons('Double Door Refrigerator.jpg')
    ],
    specs: { tempRange: '-2°C a 7°C', voltage: '220V', doors: 2, shelves: 5 },
    pieceDiagramImage: commons('Refrigeration Cycle.png', 1000),
    pieceMarkers: [
      { partCode: 'P-COMP-02', x: 0.23, y: 0.84 },
      { partCode: 'P-THERM-02', x: 0.72, y: 0.23 },
      { partCode: 'P-FAN-05', x: 0.5, y: 0.5 },
    ],
  },
  {
    code: 'PT-CF-800',
    name: 'PolarTech CF 800',
    type: 'camara',
    brand: 'PolarTech',
    capacity: 800,
    dimensions: { w: 240, h: 250, d: 210 },
    power: 900,
    images: [
      commons('BIB - Kältemaschine.jpg'),
      commons('Refrigeration comp and coil.jpg')
    ],
    specs: { tempRange: '-30°C a -15°C', voltage: '380V trifásico', doors: 2, shelves: 12 },
    pieceDiagramImage: commons('Refrigeration Cycle.png', 1000),
    pieceMarkers: [
      { partCode: 'P-COMP-05', x: 0.12, y: 0.92 },
      { partCode: 'P-CTRL-03', x: 0.82, y: 0.12 },
      { partCode: 'P-EVAP-03', x: 0.46, y: 0.36 },
    ],
  },
  {
    code: 'FC-CF-600',
    name: 'FrostCool CF 600',
    type: 'camara',
    brand: 'FrostCool',
    capacity: 600,
    dimensions: { w: 210, h: 230, d: 190 },
    power: 750,
    images: [
      commons('Sala de máquinas refrigeración.JPG'),
      commons('Refrigerating plant, Canada Coldstore, Brunswick Place - geograph.org.uk - 684943.jpg')
    ],
    specs: { tempRange: '-22°C a -8°C', voltage: '380V', doors: 1, shelves: 9 },
    pieceDiagramImage: commons('Refrigeration Cycle.png', 1000),
    pieceMarkers: [
      { partCode: 'P-COMP-04', x: 0.16, y: 0.9 },
      { partCode: 'P-CTRL-01', x: 0.78, y: 0.18 },
      { partCode: 'P-EVAP-02', x: 0.45, y: 0.4 },
    ],
  },
  {
    code: 'AP-RF-220',
    name: 'ArcticPro RF 220',
    type: 'refrigerador',
    brand: 'ArcticPro',
    capacity: 220,
    dimensions: { w: 60, h: 160, d: 64 },
    power: 190,
    images: [
      commons('Frigo.jpg'),
      commons('Inside domestic refrigerator.JPG')
    ],
    specs: { tempRange: '-1°C a 8°C', voltage: '220V', doors: 1, shelves: 4 },
    pieceDiagramImage: commons('Refrigeration Cycle.png', 1000),
    pieceMarkers: [
      { partCode: 'P-COMP-01', x: 0.2, y: 0.82 },
      { partCode: 'P-THERM-05', x: 0.7, y: 0.25 },
      { partCode: 'P-FAN-06', x: 0.5, y: 0.5 },
    ],
  },
  {
    code: 'GM-CF-550',
    name: 'GelMaster CF 550',
    type: 'camara',
    brand: 'GelMaster',
    capacity: 550,
    dimensions: { w: 205, h: 225, d: 185 },
    power: 720,
    images: [
      commons('Refrigeration comp and coil.jpg'),
      commons('BIB - Kältemaschine.jpg')
    ],
    specs: { tempRange: '-18°C a -6°C', voltage: '380V', doors: 1, shelves: 8 },
    pieceDiagramImage: commons('Refrigeration Cycle.png', 1000),
    pieceMarkers: [
      { partCode: 'P-COMP-03', x: 0.18, y: 0.88 },
      { partCode: 'P-CTRL-02', x: 0.8, y: 0.16 },
      { partCode: 'P-EVAP-01', x: 0.48, y: 0.38 },
    ],
  },
  {
    code: 'IB-CF-900',
    name: 'IceBox CF 900',
    type: 'camara',
    brand: 'IceBox',
    capacity: 900,
    dimensions: { w: 250, h: 260, d: 220 },
    power: 980,
    images: [
      commons('Sala de máquinas refrigeración.JPG'),
      commons('Refrigerating plant, Canada Coldstore, Brunswick Place - geograph.org.uk - 684943.jpg')
    ],
    specs: { tempRange: '-32°C a -18°C', voltage: '380V', doors: 2, shelves: 14 },
    pieceDiagramImage: commons('Refrigeration Cycle.png', 1000),
    pieceMarkers: [
      { partCode: 'P-COMP-06', x: 0.1, y: 0.94 },
      { partCode: 'P-CTRL-03', x: 0.84, y: 0.1 },
      { partCode: 'P-EVAP-04', x: 0.44, y: 0.35 },
    ],
  },
  {
    code: 'PT-RF-400',
    name: 'PolarTech RF 400',
    type: 'refrigerador',
    brand: 'PolarTech',
    capacity: 400,
    dimensions: { w: 70, h: 180, d: 75 },
    power: 260,
    images: [
      commons('Double Door Refrigerator.jpg'),
      commons('ExpensiveRefrigerators.JPG')
    ],
    specs: { tempRange: '-2°C a 7°C', voltage: '220V', doors: 2, shelves: 6 },
    pieceDiagramImage: commons('Refrigeration Cycle.png', 1000),
    pieceMarkers: [
      { partCode: 'P-COMP-02', x: 0.22, y: 0.86 },
      { partCode: 'P-THERM-02', x: 0.72, y: 0.24 },
      { partCode: 'P-FAN-07', x: 0.5, y: 0.52 },
    ],
  },
  {
    code: 'FC-RF-210',
    name: 'FrostCool RF 210',
    type: 'refrigerador',
    brand: 'FrostCool',
    capacity: 210,
    dimensions: { w: 59, h: 158, d: 63 },
    power: 175,
    images: [
      commons('Fridge.jpg'),
      commons('New Fridge (373767749).jpg')
    ],
    specs: { tempRange: '0°C a 9°C', voltage: '220V', doors: 1, shelves: 3 },
    pieceDiagramImage: commons('Refrigeration Cycle.png', 1000),
    pieceMarkers: [
      { partCode: 'P-COMP-01', x: 0.21, y: 0.83 },
      { partCode: 'P-THERM-03', x: 0.69, y: 0.23 },
      { partCode: 'P-FAN-01', x: 0.51, y: 0.53 },
    ],
  },
  {
    code: 'AP-RF-350',
    name: 'ArcticPro RF 350',
    type: 'refrigerador',
    brand: 'ArcticPro',
    capacity: 350,
    dimensions: { w: 67, h: 178, d: 74 },
    power: 250,
    images: [
      commons('Frigo.jpg'),
      commons('Inside domestic refrigerator.JPG')
    ],
    specs: { tempRange: '-1°C a 7°C', voltage: '220V', doors: 2, shelves: 5 },
    pieceDiagramImage: commons('Refrigeration Cycle.png', 1000),
    pieceMarkers: [
      { partCode: 'P-COMP-02', x: 0.22, y: 0.84 },
      { partCode: 'P-THERM-05', x: 0.7, y: 0.25 },
      { partCode: 'P-FAN-06', x: 0.49, y: 0.5 },
    ],
  },
  {
    code: 'GM-RF-260',
    name: 'GelMaster RF 260',
    type: 'refrigerador',
    brand: 'GelMaster',
    capacity: 260,
    dimensions: { w: 63, h: 168, d: 68 },
    power: 210,
    images: [
      commons('New Fridge (373767749).jpg'),
      commons('Double Door Refrigerator.jpg')
    ],
    specs: { tempRange: '0°C a 8°C', voltage: '127V/220V', doors: 2, shelves: 4 },
    pieceDiagramImage: commons('Refrigeration Cycle.png', 1000),
    pieceMarkers: [
      { partCode: 'P-COMP-01', x: 0.24, y: 0.84 },
      { partCode: 'P-THERM-04', x: 0.68, y: 0.26 },
      { partCode: 'P-FAN-04', x: 0.52, y: 0.54 },
    ],
  },
  {
    code: 'IB-RF-450',
    name: 'IceBox RF 450',
    type: 'refrigerador',
    brand: 'IceBox',
    capacity: 450,
    dimensions: { w: 72, h: 185, d: 78 },
    power: 280,
    images: [
      commons('ExpensiveRefrigerators.JPG'),
      commons('Fridge.jpg')
    ],
    specs: { tempRange: '-2°C a 7°C', voltage: '220V', doors: 2, shelves: 6 },
    pieceDiagramImage: commons('Refrigeration Cycle.png', 1000),
    pieceMarkers: [
      { partCode: 'P-COMP-02', x: 0.22, y: 0.86 },
      { partCode: 'P-THERM-02', x: 0.73, y: 0.22 },
      { partCode: 'P-FAN-07', x: 0.5, y: 0.52 },
    ],
  },
  {
    code: 'PT-CF-1000',
    name: 'PolarTech CF 1000',
    type: 'camara',
    brand: 'PolarTech',
    capacity: 1000,
    dimensions: { w: 270, h: 280, d: 240 },
    power: 1100,
    images: [
      commons('BIB - Kältemaschine.jpg'),
      commons('Refrigeration comp and coil.jpg')
    ],
    specs: { tempRange: '-35°C a -20°C', voltage: '380V', doors: 2, shelves: 16 },
    pieceDiagramImage: commons('Refrigeration Cycle.png', 1000),
    pieceMarkers: [
      { partCode: 'P-COMP-06', x: 0.1, y: 0.95 },
      { partCode: 'P-CTRL-03', x: 0.85, y: 0.1 },
      { partCode: 'P-EVAP-04', x: 0.44, y: 0.34 },
    ],
  },
];

export default models;