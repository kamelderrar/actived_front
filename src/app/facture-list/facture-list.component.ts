import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FactureService} from "../facture.service";
import {Page} from "../model/page";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-facture-list',
    templateUrl: './facture-list.component.html',
    styleUrls: ['./facture-list.component.scss']
})
export class FactureListComponent implements OnInit {

    factures: any;
    loadingIndicator: boolean = true;
    reorderable: boolean = true;
    selected = [];
    page = new Page();
    searchForm: FormGroup;
    filters: Array<any>;
    filterStatus: any;
    selectedFilter: any;

    @ViewChild('defaultHeader') defaultHeader: TemplateRef<any>;
    @ViewChild('nameHeader') nameHeader: TemplateRef<any>;
    @ViewChild('date') date: TemplateRef<any>;


    constructor(private factureService: FactureService, private fb: FormBuilder) {
        this.page.pageNumber = 0;
        this.page.size = 10;
    }

    ngOnInit() {
        this.setPage({ offset: 0 });
        this.searchForm = this.initForm();
        this.initFilters();
    }

    /**
     * attribution d'une class à une row selon le prix
     * @param row
     * @returns {{low_cost: boolean}}
     */
    getRowClass = (row) => {
        if(row.unit_price < 100) {
            return {
                'low_cost': true
            }
        }
        return {
            'low_cost': false
        };
    };

    columns = [
        {
            prop: 'numero',
            name: 'Numéro',
            headerTemplate: this.defaultHeader
        },
        {
            prop: 'lname',
            name: 'Nom',
            headerTemplate: this.nameHeader
        },
        {
            prop: 'fname',
            name: 'Prénom',
            headerTemplate: this.nameHeader
        },
        {
            prop: 'date',
            name: 'date',
            cellTemplate: this.date,
            headerTemplate: this.defaultHeader
        },
        {
            prop: 'status',
            name: 'Status',
            headerTemplate: this.defaultHeader
        }

    ];


    // Recuperation des factures
    setPage(pageInfo, searchFilters?) {
        this.page.pageNumber = pageInfo.offset;
        this.factureService.getFactures(this.page.size, this.page.pageNumber, searchFilters).
        subscribe(pagedData => {
            this.loadingIndicator = false;
            this.page.totalElements = pagedData.total;
            this.page.pageNumber = pagedData.current_page;
            this.page.size = pagedData.per_page;
            this.factures = pagedData.data;
        },
        error => console.log(error));
    }

    // suppression de ligne de facture
    //@todo suppression de plusieurs lignes factures
    deleteFacture(index) {
        this.factureService.deleteFacture(index)
            .subscribe(
                res => {
                    this.setPage({ offset: this.page.pageNumber });
                },
                error => console.log(error)
            )
    }

    onSelect({ selected }) {
        console.log('Select Event', selected, this.selected);

        this.selected.splice(0, this.selected.length);
        this.selected.push(...selected);
    }

    add() {
        this.selected.push(this.factures[1], this.factures[3]);
    }

    update() {
        this.selected = [this.factures[1], this.factures[3]];
    }

    remove() {
        this.selected = [];
    }

    // initialisation du formulaire de recherche
    initForm(): FormGroup {
        return new FormGroup({
            search_values: new FormControl(''),
            filter_status: new FormControl('')
        });
    }

    // recherche filtrée
    updateFilter() {
        const searchFilters = {
                filter: this.searchForm.controls['filter_status'].value ? 'status' : this.selectedFilter,
                value: this.searchForm.controls['filter_status'].value ? this.searchForm.controls['filter_status'].value : this.searchForm.controls['search_values'].value,
        };
        this.setPage({ offset: 0 }, searchFilters);
    }

    // filtres disponibles pour la recherche filtrée
    initFilters() {
        this.filters = [
            {value:'numero', viewValue:'Numéro'},
            {value:'date', viewValue:'Date'},
            {value:'unit_price', viewValue:'Total'},
        ];
        this.filterStatus = [
            this.factureService.getAvailableFacturesStatus()
                .subscribe(res => {
                        this.filterStatus = res;
                    },
                    error => console.log(error)
                )
        ]
    }

    // selection du filtre
    updateSelect(filter) {
        this.selectedFilter = filter;
    }
}
