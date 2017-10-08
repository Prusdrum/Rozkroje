import React from 'react';
import {I18n} from 'react-i18nify';
import Panel from '../../components/Panel/Panel';
import PanelHead from '../../components/Panel/PanelHead';
import PanelBody from '../../components/Panel/PanelBody';

const Configuration = () => (
    <div className="row">
        <div className="col-md-12">
            <Panel>
                <PanelHead>
                    <span className="glyphicon glyphicon-cog"></span>&nbsp;
                    <span>{I18n.t('division.configuration')}</span> 
                </PanelHead>
                <PanelBody>
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
                </PanelBody>
            </Panel>
        </div>
    </div>
);

export default Configuration;