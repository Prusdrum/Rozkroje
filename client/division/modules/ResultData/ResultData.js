import React from 'react';
import {I18n} from 'react-i18nify';
import Panel from '../../components/Panel/Panel';
import PanelHead from '../../components/Panel/PanelHead';
import PanelBody from '../../components/Panel/PanelBody';
import Glyphicon from '../../components/Glyphicon/Glyphicon';

const ResultData = () => (
    <div className="row">
        <div className="col-md-12">
            <Panel>
                <PanelHead>
                    <Glyphicon type="log-out"/>&nbsp;
                    <span>{I18n.t('division.result')}</span> 
                </PanelHead>
                <PanelBody>
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
                                <Glyphicon type="copy" />
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
                </PanelBody>
            </Panel>
        </div>
    </div> 
);

export default ResultData;

