import React, {Component} from 'react';
import {I18n} from 'react-i18nify';
import Panel from '../../components/Panel/Panel';
import PanelHead from '../../components/Panel/PanelHead';
import PanelBody from '../../components/Panel/PanelBody';
import HotTable from 'react-handsontable';

class InputData extends Component {
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
            contextMenu : false
        }

        return (
            <div className="row">
                <div className="col-md-12">
                    <Panel>
                        <PanelHead>
                            <span className="glyphicon glyphicon-log-in"></span>&nbsp;
                            <span>{I18n.t('division.inputData')}</span> 
                        </PanelHead>
                        <PanelBody>
                            <div className="row">
                                <div className="col-md-3">
                                    <HotTable root="inputTable" settings={tableOptions}/>
                                </div>
                                <div className="col-md-3">
                                    <button className="btn btn-success" type="button">
                                        <span className="glyphicon glyphicon-cog spin"></span>
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