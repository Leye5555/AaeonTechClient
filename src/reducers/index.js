import {combineReducers} from 'redux';
import user from "./user.js";
import analytics from './analytics.js';
import makePayment from './makePayment.js';
import transactions from './transactions.js';
import banks from './banks.js';
import card from './card.js';
import allUsers from './allUsers.js';
import beneficiaries from './beneficiaries.js';
import news from "./news";
import settings from './settings';

export default combineReducers({banks,user, analytics, makePayment, transactions, card,beneficiaries, allUsers, news, settings});