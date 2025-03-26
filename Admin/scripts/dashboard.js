export const graficasConfig = [tablaSemana, tablaMes, tablaTrimestre, tablaAnio];

function tablaSemana() {
  (() => {
    'use strict'

    // Graphs
    const ctx = document.getElementById('myChart')
    // eslint-disable-next-line no-unused-vars
    const x = getDiasSemana(new Date());
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: x,
        datasets: [{
          data: Array(x.length).fill(0),
          lineTension: 0,
          backgroundColor: 'transparent',
          borderColor: '#007bff',
          borderWidth: 4,
          pointBackgroundColor: '#007bff'
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            suggestedMin: 0,
            suggestedMax: 10
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            boxPadding: 3
          }
        }
      }
    })
  })()

  function getDiasSemana(date) {
    const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

    let indiceHoy = date.getDay();
    let diasOrdenados = [];

    for (let i = 0; i < 7; i++) {
      let index = (indiceHoy + i) % 7;
      diasOrdenados.push(dias[index]);
    }

    return diasOrdenados;
  }
}

function tablaMes() {
  (() => {
    'use strict'

    // Graphs
    const ctx = document.getElementById('myChart')
    // eslint-disable-next-line no-unused-vars
    const x = getDiasMes(new Date());
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: x,
        datasets: [{
          data: Array(x.length).fill(0),
          lineTension: 0,
          backgroundColor: 'transparent',
          borderColor: '#007bff',
          borderWidth: 4,
          pointBackgroundColor: '#007bff'
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            suggestedMin: 0,
            suggestedMax: 10
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            boxPadding: 3
          }
        }
      }
    })
  })()

  function getDiasMes(fecha) {
    let dias = [];
    let inicioMesAnterior = new Date(fecha.getFullYear(), fecha.getMonth() - 1, fecha.getDate());
    let finMesAnterior = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate() - 1);

    while (inicioMesAnterior <= finMesAnterior) {
      let diaFormateado = inicioMesAnterior.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' });
      dias.push(diaFormateado);
      inicioMesAnterior.setDate(inicioMesAnterior.getDate() + 1);
    }

    return dias;
  }
}

function tablaTrimestre() {
  (() => {
    'use strict'

    // Graphs
    const ctx = document.getElementById('myChart')
    // eslint-disable-next-line no-unused-vars
    const x = getSemanasUltimosTresMeses(new Date());
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: x,
        datasets: [{
          data: Array(x.length).fill(0),
          lineTension: 0,
          backgroundColor: 'transparent',
          borderColor: '#007bff',
          borderWidth: 4,
          pointBackgroundColor: '#007bff'
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            suggestedMin: 0,
            suggestedMax: 10
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            boxPadding: 3
          }
        }
      }
    })
  })()

  function getSemanasUltimosTresMeses(fecha) {
    const semanas = [];
    const fechaInicio = new Date(fecha.getFullYear(), fecha.getMonth() - 2, 1); // Hace 2 meses
    const fechaFin = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate()); // Hoy

    let fechaActual = fechaInicio;

    // Ajustar al primer lunes desde la fecha de inicio
    while (fechaActual.getDay() !== 1) {
      fechaActual.setDate(fechaActual.getDate() + 1);
    }

    // Recorrer desde el primer lunes hasta el último lunes
    while (fechaActual <= fechaFin) {
      semanas.push(fechaActual.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' }));
      fechaActual.setDate(fechaActual.getDate() + 7); // Sumar 7 días para el siguiente lunes
    }

    return semanas;
  }
}

function tablaAnio() { 
  (() => {
    'use strict'

    // Graphs
    const ctx = document.getElementById('myChart')
    // eslint-disable-next-line no-unused-vars
    const x = getMesesAnyo(new Date());
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: x,
        datasets: [{
          data: Array(x.length).fill(0),
          lineTension: 0,
          backgroundColor: 'transparent',
          borderColor: '#007bff',
          borderWidth: 4,
          pointBackgroundColor: '#007bff'
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            suggestedMin: 0,
            suggestedMax: 10
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            boxPadding: 3
          }
        }
      }
    })
  })()

  function getMesesAnyo(fecha) {
    const meses = [];
    const opcionesMes = { month: 'long', year: 'numeric' };

    for (let i = 1; i <= 12; i++) {
      const mes = new Date(fecha.getFullYear(), fecha.getMonth() - i, 1);
      meses.push(mes.toLocaleDateString('es-ES', opcionesMes));
    }

    return meses.reverse();
  }
}