// Imagens reais via Wikimedia Commons
const commons = (file, width = 900) => `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;
// Placeholder para outras peças (mantido para não quebrar imagens existentes)
const img = (id) => `https://images.unsplash.com/photo-1581091012184-7c54b3a6f76b?auto=format&fit=crop&w=900&q=60&ixid=${id}`;

const parts = [
  // Compressores
  { code: 'P-COMP-01', name: 'Compressor 180W', category: 'compressor', description: 'Compressor hermético 180W', compatibleModels: ['PT-RF-200','FC-RF-250','GM-RF-180','AP-RF-220','FC-RF-210','GM-RF-260'], status: 'em_estoque', image: commons('Embraco compressor.jpg'), specs: { voltage: '220V', gas: 'R134a' }, replacementInfo: 'Substitui P-COMP-01A' },
  { code: 'P-COMP-02', name: 'Compressor 240W', category: 'compressor', description: 'Compressor hermético 240W', compatibleModels: ['PT-RF-300','IB-RF-320','PT-RF-400','IB-RF-450','AP-RF-350'], status: 'em_estoque', image: commons('Lednička Zanussi ZRA 319 SW, kompresor s odpařovací miskou (001).JPG'), specs: { voltage: '220V', gas: 'R134a' }, replacementInfo: 'Compatível com linhas PolarTech e IceBox' },
  { code: 'P-COMP-03', name: 'Compressor 650W', category: 'compressor', description: 'Compressor semi-hermético 650W', compatibleModels: ['PT-CF-500','GM-CF-550'], status: 'sob_encomenda', image: commons('Compresor alternativo R22.jpg'), specs: { voltage: '380V', gas: 'R404a' }, replacementInfo: 'Usar kit de fixação K-CF-03' },
  { code: 'P-COMP-04', name: 'Compressor 750W', category: 'compressor', description: 'Compressor semi-hermético 750W', compatibleModels: ['AP-CF-700','FC-CF-600'], status: 'sob_encomenda', image: commons('Sabroe compressor.JPG'), specs: { voltage: '380V', gas: 'R404a' }, replacementInfo: 'Substitui versões antigas série CF' },
  { code: 'P-COMP-05', name: 'Compressor 900W', category: 'compressor', description: 'Compressor semi-hermético 900W', compatibleModels: ['PT-CF-800'], status: 'em_estoque', image: commons('Screw compressors.JPG'), specs: { voltage: '380V', gas: 'R448a' }, replacementInfo: 'Exige controlador P-CTRL-03' },
  { code: 'P-COMP-06', name: 'Compressor 1100W', category: 'compressor', description: 'Compressor semi-hermético 1100W', compatibleModels: ['IB-CF-900','PT-CF-1000'], status: 'sob_encomenda', image: commons('Refrigeration comp and coil.jpg'), specs: { voltage: '380V', gas: 'R448a' }, replacementInfo: 'Atenção à carga de óleo' },

  // Termostatos
  { code: 'P-THERM-01', name: 'Termostato Mecânico A', category: 'termostato', description: 'Faixa de 0–10°C', compatibleModels: ['PT-RF-200'], status: 'em_estoque', image: img('p7'), specs: { range: '0–10°C' }, replacementInfo: 'Substitui P-THERM-01B' },
  { code: 'P-THERM-02', name: 'Termostato Digital B', category: 'termostato', description: 'Faixa de -2–8°C', compatibleModels: ['PT-RF-300','IB-RF-320','PT-RF-400','IB-RF-450'], status: 'em_estoque', image: img('p8'), specs: { range: '-2–8°C' }, replacementInfo: 'Requer sensor P-SENS-02' },
  { code: 'P-THERM-03', name: 'Termostato Mecânico C', category: 'termostato', description: 'Faixa de 0–9°C', compatibleModels: ['FC-RF-250','FC-RF-210'], status: 'em_estoque', image: img('p9'), specs: { range: '0–9°C' }, replacementInfo: 'Compatível com FrostCool série RF' },
  { code: 'P-THERM-04', name: 'Termostato Bivolt D', category: 'termostato', description: 'Faixa de 0–8°C', compatibleModels: ['GM-RF-180','GM-RF-260'], status: 'em_estoque', image: img('p10'), specs: { range: '0–8°C' }, replacementInfo: 'Bivolt 127/220V' },
  { code: 'P-THERM-05', name: 'Termostato Digital E', category: 'termostato', description: 'Faixa de -1–7°C', compatibleModels: ['AP-RF-220','AP-RF-350'], status: 'em_estoque', image: img('p11'), specs: { range: '-1–7°C' }, replacementInfo: 'Usar com sensor P-SENS-03' },

  // Evaporadores
  { code: 'P-EVAP-01', name: 'Evaporador 500', category: 'evaporador', description: 'Para câmaras 500–600L', compatibleModels: ['PT-CF-500','GM-CF-550'], status: 'em_estoque', image: img('p12'), specs: { fins: 12 }, replacementInfo: 'Compatível com compressores 650W' },
  { code: 'P-EVAP-02', name: 'Evaporador 700', category: 'evaporador', description: 'Para câmaras 600–700L', compatibleModels: ['AP-CF-700','FC-CF-600'], status: 'em_estoque', image: img('p13'), specs: { fins: 14 }, replacementInfo: 'Instalar acima da porta' },
  { code: 'P-EVAP-03', name: 'Evaporador 800', category: 'evaporador', description: 'Para câmaras 800L', compatibleModels: ['PT-CF-800'], status: 'em_estoque', image: img('p14'), specs: { fins: 16 }, replacementInfo: 'Requer dreno lateral' },
  { code: 'P-EVAP-04', name: 'Evaporador 1000', category: 'evaporador', description: 'Para câmaras 900–1000L', compatibleModels: ['IB-CF-900','PT-CF-1000'], status: 'sob_encomenda', image: img('p15'), specs: { fins: 18 }, replacementInfo: 'Verificar compatibilidade com 1100W' },

  // Ventiladores
  { code: 'P-FAN-01', name: 'Ventilador 12cm', category: 'ventilador', description: 'Fluxo 60CFM', compatibleModels: ['PT-RF-200','FC-RF-210'], status: 'em_estoque', image: img('p16'), specs: { cfm: 60 }, replacementInfo: 'Substitui FAN-A' },
  { code: 'P-FAN-02', name: 'Ventilador 14cm', category: 'ventilador', description: 'Fluxo 75CFM', compatibleModels: ['PT-RF-300','PT-RF-400'], status: 'em_estoque', image: img('p17'), specs: { cfm: 75 }, replacementInfo: 'Rolamento selado' },
  { code: 'P-FAN-03', name: 'Ventilador 13cm', category: 'ventilador', description: 'Fluxo 70CFM', compatibleModels: ['FC-RF-250'], status: 'em_estoque', image: img('p18'), specs: { cfm: 70 }, replacementInfo: 'Alta durabilidade' },
  { code: 'P-FAN-04', name: 'Ventilador 12cm silencioso', category: 'ventilador', description: 'Fluxo 55CFM', compatibleModels: ['GM-RF-180','GM-RF-260'], status: 'em_estoque', image: img('p19'), specs: { cfm: 55 }, replacementInfo: 'Baixo ruído' },
  { code: 'P-FAN-05', name: 'Ventilador 14cm alto fluxo', category: 'ventilador', description: 'Fluxo 90CFM', compatibleModels: ['IB-RF-320'], status: 'em_estoque', image: img('p20'), specs: { cfm: 90 }, replacementInfo: 'Requer grelha reforçada' },
  { code: 'P-FAN-06', name: 'Ventilador 13cm alto fluxo', category: 'ventilador', description: 'Fluxo 85CFM', compatibleModels: ['AP-RF-220','AP-RF-350'], status: 'em_estoque', image: img('p21'), specs: { cfm: 85 }, replacementInfo: 'Compatível com ArcticPro' },
  { code: 'P-FAN-07', name: 'Ventilador 15cm', category: 'ventilador', description: 'Fluxo 95CFM', compatibleModels: ['PT-RF-400','IB-RF-450'], status: 'em_estoque', image: img('p22'), specs: { cfm: 95 }, replacementInfo: 'Fixação com 4 parafusos' },

  // Controladores
  { code: 'P-CTRL-01', name: 'Controlador Básico CF', category: 'controlador', description: 'Para câmaras até 600L', compatibleModels: ['PT-CF-500','FC-CF-600'], status: 'em_estoque', image: img('p23'), specs: { display: 'LED' }, replacementInfo: 'Requer sensor P-SENS-01' },
  { code: 'P-CTRL-02', name: 'Controlador Avançado CF', category: 'controlador', description: 'Para câmaras 550–700L', compatibleModels: ['GM-CF-550','AP-CF-700'], status: 'em_estoque', image: img('p24'), specs: { display: 'LCD' }, replacementInfo: 'Firmware v2.1' },
  { code: 'P-CTRL-03', name: 'Controlador Alta Potência', category: 'controlador', description: 'Para câmaras 800–1000L', compatibleModels: ['PT-CF-800','IB-CF-900','PT-CF-1000'], status: 'sob_encomenda', image: img('p25'), specs: { display: 'LCD', relay: '30A' }, replacementInfo: 'Compatível com 900–1100W' },

  // Motores
  { code: 'P-MOTOR-01', name: 'Motor Porta 50N', category: 'motor', description: 'Assitência de fechamento', compatibleModels: ['PT-RF-200','PT-RF-300','PT-RF-400'], status: 'em_estoque', image: img('p26'), specs: { torque: '50N' }, replacementInfo: 'Kit montagem incluído' },
  { code: 'P-MOTOR-02', name: 'Motor Porta 80N', category: 'motor', description: 'Assitência reforçada', compatibleModels: ['IB-RF-320','IB-RF-450'], status: 'em_estoque', image: img('p27'), specs: { torque: '80N' }, replacementInfo: 'Uso com portas duplas' },
  { code: 'P-MOTOR-03', name: 'Motor Porta CF', category: 'motor', description: 'Para câmaras 600–1000L', compatibleModels: ['FC-CF-600','AP-CF-700','PT-CF-800','IB-CF-900','PT-CF-1000'], status: 'sob_encomenda', image: img('p28'), specs: { torque: '120N' }, replacementInfo: 'Consultar voltagem' },

  // Sensores
  { code: 'P-SENS-01', name: 'Sensor Temp PTC', category: 'sensor', description: 'Sensor de temperatura PTC', compatibleModels: ['PT-CF-500','FC-CF-600'], status: 'em_estoque', image: img('p29'), specs: { range: '-30–20°C' }, replacementInfo: 'Compatível com P-CTRL-01' },
  { code: 'P-SENS-02', name: 'Sensor Temp NTC', category: 'sensor', description: 'Sensor de temperatura NTC', compatibleModels: ['PT-RF-300','IB-RF-320','PT-RF-400','IB-RF-450'], status: 'em_estoque', image: img('p30'), specs: { range: '-10–15°C' }, replacementInfo: 'Usar com P-THERM-02' },
  { code: 'P-SENS-03', name: 'Sensor Temp Digital', category: 'sensor', description: 'Sensor digital', compatibleModels: ['AP-RF-220','AP-RF-350'], status: 'em_estoque', image: img('p31'), specs: { range: '-5–20°C' }, replacementInfo: 'Usar com P-THERM-05' },

  // Resistências
  { code: 'P-RES-01', name: 'Resistência Degelo 30W', category: 'resistencia', description: 'Para RF 200–260', compatibleModels: ['PT-RF-200','FC-RF-250','GM-RF-260'], status: 'em_estoque', image: img('p32'), specs: { power: '30W' }, replacementInfo: 'Compatível com evaporadores pequenos' },
  { code: 'P-RES-02', name: 'Resistência Degelo 60W', category: 'resistencia', description: 'Para RF 300–450', compatibleModels: ['PT-RF-300','PT-RF-400','IB-RF-450'], status: 'em_estoque', image: img('p33'), specs: { power: '60W' }, replacementInfo: 'Fixação lateral' },
  { code: 'P-RES-03', name: 'Resistência Degelo 120W', category: 'resistencia', description: 'Para câmaras 600–1000', compatibleModels: ['FC-CF-600','AP-CF-700','PT-CF-800','IB-CF-900','PT-CF-1000'], status: 'sob_encomenda', image: img('p34'), specs: { power: '120W' }, replacementInfo: 'Instalação profissional' },

  // Gás Refrigerante
  { code: 'P-GAS-01', name: 'R134a 1kg', category: 'gas', description: 'Gás refrigerante R134a', compatibleModels: ['PT-RF-200','PT-RF-300','PT-RF-400','IB-RF-320','IB-RF-450','GM-RF-180','GM-RF-260','FC-RF-250','FC-RF-210','AP-RF-220','AP-RF-350'], status: 'em_estoque', image: img('p35'), specs: { weight: '1kg' }, replacementInfo: 'Seguir normas ABNT' },
  { code: 'P-GAS-02', name: 'R404a 1kg', category: 'gas', description: 'Gás refrigerante R404a', compatibleModels: ['PT-CF-500','FC-CF-600','GM-CF-550','AP-CF-700','PT-CF-800','IB-CF-900','PT-CF-1000'], status: 'sob_encomenda', image: img('p36'), specs: { weight: '1kg' }, replacementInfo: 'Uso em câmaras frias' },
];

export default parts;