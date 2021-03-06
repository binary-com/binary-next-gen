import { fromJS } from 'immutable';
import { assetsBySymbolSelector } from '../keySelectors';

describe('assetsBySybolSelector', () => {
    it('should return empty when no assets', () => {
        const state = {
            assets: fromJS([]),
        };
        const assetsBySymbol = assetsBySymbolSelector(state);
        expect(assetsBySymbol).toEqual(fromJS({}));
    });

    it('should be able to retrieve an asset property by symbol', () => {
        const state = {
            assets: fromJS([
                { symbol: '1', name: 'Asset1' },
            ]),
        };
        const assetsBySymbol = assetsBySymbolSelector(state);
        expect(assetsBySymbol.getIn(['1', 'name'])).toEqual('Asset1');
    });

    it('should organize assets indexed by symbol', () => {
        const state = {
            assets: fromJS([
                { symbol: '1', name: 'Asset1' },
                { symbol: '2', name: 'Asset2' },
                { symbol: '3', name: 'Asset3' },
            ]),
        };
        const assetsBySymbol = assetsBySymbolSelector(state);
        expect(assetsBySymbol.size).toEqual(3);
    });
});
