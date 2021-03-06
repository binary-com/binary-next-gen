import { select, put, takeEvery, all } from 'redux-saga/effects';
import { getParams, contractOfSymbol } from './SagaSelectors';
import { updateMultipleTradeParams } from '../../_actions';
import changeCategory from '../updates/changeCategory';
import changeType from '../updates/changeType';
import { subscribeProposal, unsubscribeProposal } from './ProposalSubscriptionSaga';

const CHANGE_CATEGORY = 'CHANGE_CATEGORY';

export const reqCatChange = (index, category) => ({
    type: CHANGE_CATEGORY,
    index,
    category,
});

// Category change does not trigger re-render, as we want the dropdown to be there
function* handleCatChange(action) {
    const { index, category } = action;
    yield put(unsubscribeProposal(index));
    const params = yield select(getParams(index));
    const contractNeeded = yield select(contractOfSymbol(params.symbol));
    const updated = changeCategory(category, contractNeeded, params);
    yield all([
        put(subscribeProposal(index, updated)),
        put(updateMultipleTradeParams(index, updated)),
    ]);
}

const CHANGE_TYPE = 'CHANGE_TYPE';

export const reqTypeChange = (index, category, tradeType) => ({
    type: CHANGE_TYPE,
    index,
    category,
    tradeType,
});

function* handleTypeChange(action) {
    const { index, category, tradeType } = action;
    yield put(unsubscribeProposal(index));
    const params = yield select(getParams(index));
    const contractNeeded = yield select(contractOfSymbol(params.symbol));
    const updated = changeType(tradeType, category, contractNeeded, params);
    yield all([
        put(subscribeProposal(index, updated)),
        put(updateMultipleTradeParams(index, updated)),
    ]);
}

export default function* watchTypeChange() {
    yield all([
        takeEvery(CHANGE_CATEGORY, handleCatChange),
        takeEvery(CHANGE_TYPE, handleTypeChange),
    ]);
}
