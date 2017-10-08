import React, {Component} from 'react';
import {I18n} from 'react-i18nify';
import Panel from '../../components/Panel/Panel';
import PanelHead from '../../components/Panel/PanelHead';
import PanelBody from '../../components/Panel/PanelBody';
import HotTable from 'react-handsontable';
import Glyphicon from '../../components/Glyphicon/Glyphicon';

class InputData extends Component {
    constructor(props) {
        super(props);

        this.onTableChange = this.onTableChange.bind(this);
    }

    onTableChange(changes, source) {
        console.log(changes, source);
    }

    render() {
        const inputHeaders = [`${I18n.t('division.length')} [mm]`, `${I18n.t('division.count')}`];
        const colsCount = inputHeaders.length;

        const tableOptions = {
            minSpareRows : 1,
            startRows: 25,
            minCols : colsCount,
            startCols : colsCount,
            maxCols : colsCount,
            rowHeaders : true,
            colHeaders : inputHeaders,
            contextMenu : false,
            onAfterChange: this.onTableChange
        }

        return (
            <div className="row">
                <div className="col-md-12">
                    <Panel>
                        <PanelHead>
                            <Glyphicon type="log-in" />&nbsp;
                            <span>{I18n.t('division.inputData')}</span> 
                        </PanelHead>
                        <PanelBody>
                            <div className="row">
                                <div className="col-md-3">
                                    <HotTable root="inputTable" settings={tableOptions}/>
                                </div>
                                <div className="col-md-3">
                                    <button className="btn btn-success" type="button">
                                        <Glyphicon type="cog" className="spin" />
                                        <span>{I18n.t('division.calculate')}</span>
                                    </button>
                                    <button className="btn btn-danger" type="button">
                                        {I18n.t('division.reset')}
                                    </button>
                                </div>
                            </div>
                        </PanelBody>
                    </Panel>
                </div>
            </div>
        );
    }
};

export default InputData;