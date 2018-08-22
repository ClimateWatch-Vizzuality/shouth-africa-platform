import camelCase from 'lodash/camelCase';
import * as actions from './metadata-provider-actions';

export const initialState = {
  sectors: { loading: false, loaded: false, error: false, data: null },
  ghg: { loading: false, loaded: false, error: false, data: null }
};

function parseDataByMeta(data, meta) {
  switch (meta) {
    case 'sectors':
      return data;
    case 'ghg': {
      const dataParsed = {};
      Object.keys(data).forEach(
        key => {
          const camelCasedkey = camelCase(key);
          dataParsed[camelCasedkey] = data[key].map(item => {
            let newItem = {
              value: item.id,
              label: key === 'location'
                ? item.wri_standard_name.trim()
                : item.name.trim()
            };
            if (key === 'location') {
              newItem = { ...newItem, iso: item.iso_code3 };
            }
            if (key === 'data_source') {
              newItem = {
                ...newItem,
                location: item.location_ids,
                sector: item.sector_ids,
                gas: item.gas_ids,
                gwp: item.gwp_ids,
                source: item.source
              };
            }
            return newItem;
          });
        },
        this
      );
      return dataParsed;
    }

    default:
      return data;
  }
}

export default {
  [actions.fetchMetaInit]: (state, { payload }) => ({
    ...state,
    [payload.meta]: { ...state[payload.meta], loading: true }
  }),
  [actions.fetchMetaReady]: (state, { payload }) => ({
    ...state,
    [payload.meta]: {
      ...state[payload.meta],
      loading: false,
      data: parseDataByMeta(payload.data, payload.meta)
    }
  }),
  [actions.fetchMetaFail]: (state, { payload }) => ({
    ...state,
    [payload.meta]: {
      ...state[payload.meta],
      loading: false,
      error: payload.error
    }
  })
};