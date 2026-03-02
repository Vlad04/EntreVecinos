define([
  '../accUtils',
  'knockout',
  'ojs/ojarraydataprovider',
  'ojs/ojlistdataproviderview',
  'ojs/ojdataprovider',
  'ojs/ojselectsingle',
  'ojs/ojinputtext',
  'ojs/ojtable',
  'ojs/ojdialog'
], function (accUtils, ko, ArrayDataProvider, ListDataProviderView, ojdataprovider) {

  function PagosViewModel() {
    this.filtroEstatus = ko.observable('TODOS');
    this.filtroPeriodo = ko.observable('2026-03');
    this.textoBusqueda = ko.observable('');

    const estatus = [
      { value: 'TODOS', label: 'Estatus' },
      { value: 'PAGADO', label: 'Pagado' },
      { value: 'PENDIENTE', label: 'Pendiente' }
    ];
    this.estatusDP = new ArrayDataProvider(estatus, { keyAttributes: 'value' });

    const estatusCelda = [
      { value: 'PAGADO', label: 'Pagado' },
      { value: 'PENDIENTE', label: 'Pendiente' }
    ];

    const metodoCelda = [
      { value: 'Efectivo', label: 'Efectivo' },
      { value: 'Transferencia', label: 'Transferencia' }
    ];

    this.estatusCeldaDP = new ArrayDataProvider(estatusCelda, { keyAttributes: 'value' });
    this.metodoCeldaDP = new ArrayDataProvider(metodoCelda, { keyAttributes: 'value' });

    const periodos = [
      { value: '2026-03', label: 'Marzo 2026' },
      { value: '2026-04', label: 'Abril 2026' },
      { value: '2026-05', label: 'Mayo 2026' }
    ];
    this.periodosDP = new ArrayDataProvider(periodos, { keyAttributes: 'value' });

    const sampleRows = [
      { id: 1, calle: "Fresno", numero: 27, propietario: "Carlos Mendoza", estado: "PAGADO", fechaPagado: "02/05/2024", periodo: "Mayo 2024", monto: 950, metodo: "Transferencia" },
      { id: 2, calle: "Jacarandas", numero: 3, propietario: "Emmanue Reshez", estado: "PENDIENTE", fechaPagado: "01/05/2024", periodo: "Mayo 2024", monto: 950, metodo: "Efectivo" }
    ];
    this.rowsObs = ko.observableArray(sampleRows);

    this.columns = [
      { headerText: "ID", field: "id" },
      { headerText: "Calle", field: "calle" },
      { headerText: "Número", field: "numero" },
      { headerText: "Propietario", field: "propietario" },
      { headerText: "Estado", field: "estado", template: "estadoTemplate" },
      { headerText: "Fecha Pagado", field: "fechaPagado" },
      { headerText: "Periodo", field: "periodo" },
      { headerText: "Monto", field: "monto" },
      { headerText: "Método", field: "metodo", template: "metodoTemplate"  }
    ];

    this.pagosDP = ko.computed(function () {
      const text = (this.textoBusqueda() || '').trim();
      const filterCriterion = text
        ? ojdataprovider.FilterFactory.getFilter({ filterDef: { text: text } })
        : null;

      const adp = new ArrayDataProvider(this.rowsObs(), { keyAttributes: 'id' });
      return new ListDataProviderView(adp, { filterCriterion: filterCriterion });
    }, this);

    this.selectedSelectionMode = ko.observable({ row: 'multiple', column: 'none' });

    this.handleValueChanged = (event) => {
      this.textoBusqueda(event.detail.value || '');
    };

    this.onNuevaCasa = () => {
      document.getElementById('modal_nueva_casa').open();
    };

    this.close_nueva_casa = () => {
      document.getElementById('modal_nueva_casa').close();
    };

    this.connected = () => {
      accUtils.announce('Dashboard page loaded.');
      document.title = "Dashboard";
    };

    this.disconnected = () => {};
    this.transitionCompleted = () => {};
  }

  return PagosViewModel;
});