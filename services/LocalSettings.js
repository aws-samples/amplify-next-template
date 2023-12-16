import quoteVehicleSettings from "./cached-data.json";

var data = quoteVehicleSettings[0];

export const commissions = [0, 5, 10, 15, 20, 25, 30];
export const commercialDiscounts = [0, 5, 10, 15];
export const policyTypes = data.policyTypes;
export const paymentMethods = data.paymentMethods;
export const vatConditionPersonTypes = data.vatConditionPersonTypes;

export const cities = [];
for (let index = 0; index < data.cities.length; index++) {
  const city = data.cities[index];
  cities.push({
    label:
      (city.zipCode ? "(" + city.zipCode + ") " : "") +
      city.cityName +
      " (" +
      city.provinceName +
      ")",
    value: parseInt(
      city.idCity.toString().replace(city.idProvince.toString(), ""),
    ),
    idProvince: city.idProvince,
    zipCode: city.zipCode,
  });
}

export const societies = [];
export const organizations = [];
for (let index = 0; index < data.societyPlans.length; index++) {
  const societyPlan = data.societyPlans[index];
  if (societyPlan.plan.idPlan === 971) {
    societies.push({
      label: societyPlan.society.idSociety + " - " + societyPlan.society.name,
      value: societyPlan.society.idSociety,
      isOrganizer: societyPlan.society.isOrganizer,
      idOrganization: societyPlan.society.idOrganization,
      organizationName: societyPlan.society.organizationName,
    });

    if (
      organizations.filter(
        (o) => o.idOrganization === societyPlan.society.idOrganization,
      ).length === 0
    )
      organizations.push({
        idOrganization: societyPlan.society.idOrganization,
        organizationName: societyPlan.society.organizationName,
      });
  }
}
export const sex = [
  { label: "Masculino", value: "M" },
  { label: "Femenino", value: "F" },
];

export const civilStatuses = [
  { label: "Soltero/a", value: 1 },
  { label: "Casado/a", value: 2 },
  { label: "Divorciado/a", value: 3 },
  { label: "Viudo/a", value: 4 },
];

export const tracking = [
  { label: "No", value: 0 },
  { label: "Ituran", value: 1 },
  { label: "Lo Jack (A cargo del cliente)", value: 3 },
  { label: "Lo Jack (A cargo de Zurich)", value: 4 },
  { label: "Pointer", value: 2 },
];

export const usage = [{ label: "Particular", value: 1 }];

export const robberyContents = [
  {
    label: "Robo Contenido $35000",
    idCoverage: 258,
    idRobberyContent: 5976,
    value: 35000,
  },
];

export const preselectedPackageIDs = [49, 44, 38, 39, 37, 43];

export const vehicleWebResultCoverages = [
  {
    group: "A",
    items: [
      {
        code: "A",
        tags: [1],
      },
    ],
  },
  {
    group: "B",
    items: [
      {
        code: "B",
        tags: [2, 11],
      },
    ],
  },
  {
    group: "D",
    items: [
      {
        code: "D1",
        tags: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12],
      },
      {
        code: "D2",
        tags: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12],
      },
      {
        code: "DV",
        tags: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12],
      },
      {
        code: "D6",
        tags: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12],
      },
    ],
  },
  {
    group: "C",
    items: [
      {
        code: "CG",
        tags: [1, 2, 3, 5, 6, 7, 8, 9, 10, 11],
      },
      {
        code: "CM",
        tags: [1, 2, 3, 5, 6, 7, 8, 9, 10, 11],
      },
    ],
  },
];

export const vehicleWebResultCoverageTags = [
  {
    id: 1,
    title: "Responsabilidad Civil",
    description:
      "Te protegemos por los reclamos que pudieras recibir de terceros por daños físicos o materiales ocasionados con el vehículo asegurado en un accidente. También están cubiertas las personas que viajan en el vehículo que no tengan parentesco con el titular.",
  },
  {
    id: 2,
    title: "Destrucción, Robo/Hurto e Incendio Total",
    description:
      "Estás protegido por la destrucción total del vehículo asegurado por daños, incendio y también por su robo o hurto. En cualquiera de estos casos, cuando el costo de reparación del vehículo represente el 80% o más se su valor, te indemnizaremos por un importe suficiente para su reposición a valor de mercado.",
  },
  {
    id: 3,
    title: "Robo/hurto e Incendio parcial",
    description:
      "Si ocurre el robo o hurto de alguna de las partes de tu auto, te las cubrimos. Como por ejemplo, los neumáticos ¡incuído el de auxilio!",
  },
  {
    id: 4,
    title: "Daños Parciales con Franquicia",
    description:
      "Te cubrimos todos los daños que accidentalmente le sucedan a tu vehículo, por cualquier causa. La franquicia es la ‘porción’ del costo de reparación como consecuencia de un siniestro a cargo del asegurado.",
  },
  {
    id: 5,
    title: "Rotura de Cristales",
    description:
      "Todos los cristales de tu auto están protegidos: laterales, parabrisas, luneta e incluso el cristal del techo. Por cualquier motivo de rotura.",
  },
  {
    id: 6,
    title: "Robo de Neumáticos",
    description:
      "Siempre te reponemos a nuevo los neumáticos robados o hurtados. ¡No aplicamos depreciación!",
  },
  {
    id: 7,
    title: "Zurich Weather",
    description:
      "Te protegemos ante cualquier evento climático ya sean daños parciales o totales. ¡No aplicamos franquicia ni límite de eventos! Esta cobertura considera granizo, inundación, desbordamiento, terremoto y caída de árboles.",
  },
  {
    id: 8,
    title: "Robo de Contenido",
    description: "Aseguramos lo que tengas en tu auto hasta $35.000.",
  },
  {
    id: 9,
    title: "Daños por Intento de Robo",
    description:
      "Te cubrimos hasta $12.500 por daños en cerraduras, cristales laterales o consola del vehículo, cuando hayan intentado robártelo. Adicionalmente contás con $15.000 en caso de que te hayan dañado la chapa en el intento.",
  },
  {
    id: 10,
    title: "Cobertura en Paises Limítrofes",
    description:
      "Extendemos la cobertura contratada sin costo adicional y no tenés que avisarnos antes de viajar.",
  },
  {
    id: 11,
    title: "Asistencia Zurihelp Standard",
    description:
      "Asistencia mecánica las 24 hs, 300 kms de acarreo, auto sustituto en caso de siniestro total 7 días.",
  },
  {
    id: 12,
    title: "Asistencia Zurihelp Go!",
    description:
      "Asistencia mecánica las 24 hs, 2000 kms de acarreo, auto sustituto en caso de siniestro total 30 días.",
  },
];
