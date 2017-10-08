import React from 'react';
import {I18n} from 'react-i18nify';

const App = () => (
    <div className="container">
        <div>
            <a className="language-link" href="/division/en">en</a>
            <a className="language-link" href="/division/pl">pl</a>
        </div>
        <div className="jumbotron text-center">
            <h1>{I18n.t('division.header')}</h1>
        </div>
        <div className="row">
            <div className="col-md-12">
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <span className="glyphicon glyphicon-cog"></span>&nbsp;
                        <span>{I18n.t('division.configuration')}</span> 
                    </div>
                    <div className="panel-body">
                        <div className="form-inline">
                            <div className="form-group col-md-5">
                                <label htmlFor="referenceLength" className="control-label">
                                    {I18n.t('division.referenceElementLength')}&nbsp;
                                </label>
                                <div className="input-group">
                                    <input id="referenceLength"
                                           className="form-control"
                                           type="number" 
                                           min="0" 
                                           step="100"/> 
                                    <span className="input-group-addon">mm</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-md-12">
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <span className="glyphicon glyphicon-log-in"></span>&nbsp;
                        <span>{I18n.t('division.inputData')}</span> 
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-md-3">
                                <div id="inputTable"
                                    className="hot handsontable htRowHeaders htColumnHeaders"></div>
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
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-md-12">
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <span className="glyphicon glyphicon-log-out"></span>&nbsp;
                        <span>{I18n.t('division.result')}</span> 
                    </div>
                    <div className="panel-body">
                        <div id="stats" className="row space-below">
                            <div className="col-md-12">
                                <p>
                                    <span>
                                        {I18n.t('division.wasteSumInMeters')}
                                    </span>
                                </p>
                                <p>
                                    <span>
                                        {I18n.t('division.referenceElementsNeeded')}
                                    </span>
                                </p>
                                <p>
                                    <span>
                                        {I18n.t('division.materialSumInMeters')}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="row space-below">
                            <div className="col-md-12">
                                <button className="btn btn-default" type="button">
                                    <span className="glyphicon glyphicon-copy"></span>
                                    <span>{I18n.t('division.copy')}</span>
                                </button>
                            </div>
                        </div>
                        <div className="row space-below">
                            <div className="col-md-12">
                                <table id="resultTable" className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>{I18n.t('division.pattern')}</th>
                                            <th>{I18n.t('division.amount')}</th>
                                            <th>{I18n.t('division.waste')}</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default App;