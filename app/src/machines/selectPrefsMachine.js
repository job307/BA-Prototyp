import {createMachine} from 'xstate'
import {assign} from 'xstate'

const fetchContext = assign({
    totalHits: () => {
        var th = parseInt(localStorage.getItem('totalHits'));
        if ( th >= 0) {
            return th;
        } else{
            localStorage.setItem('totalHits', 0);
            return 0;
        }
    },
    poolHits: () => {
        var ph = parseInt(localStorage.getItem('poolHits'));
        if ( ph >= 0) {
            return ph;
        } else{
            localStorage.setItem('poolHits', 0);
            return 0;
        }
    }
});

const prefsFilled = (context) => {
    return context.where !== '' && context.start !== '' && context.end !== '' && context.who !== ''
}

const updateContext = assign({
    //save totalHits and poolHits
    totalHits: (context) => {
        localStorage.setItem('totalHits', parseInt(context.totalHits) + 1);
        return context.totalHits + 1;
    },
    poolHits: (context, evt) => {
        if (evt.poolHit) {
            localStorage.setItem('poolHits', parseInt(context.poolHits) + 1);
            return context.poolHits + 1;
        } else {
            return context.poolHits;
        }
    },
    hitId: (ctx, evt) => evt.hitId
});

const reset = assign({
    where: '', 
    start: '',
    end: '',
    who: '',
    hitId: 0
});

const back = assign({
    hitId: 0
})

const cachePrefs = assign({
    where: (ctx, evt) => evt.where,
    start: (ctx, evt) => evt.start,
    end: (ctx, evt) => evt.end,
    who: (ctx, evt) => evt.who
})

export const selectPrefsMachine = createMachine({
    initial: 'idle',
    context: {
        where: '',
        start: '',
        end: '',
        who: '',
        totalHits: 0,
        poolHits: 0,
        hitId: 0 //ändert sich bei hit --- resettet sich bei zurück
    },
    states: {
        idle: {
            entry: fetchContext,
            on: {
                SELECTED: {
                    target: 'listRooms',
                    cond: prefsFilled
                },
                SET_PREFS: {
                    actions: cachePrefs
                },
                HOME: {
                    actions: reset,
                }
            }
        },
        listRooms: {
            on: {
                HIT: {
                    actions: updateContext,
                    target: 'singleRoom'
                },
                HOME: {
                    actions: reset,
                    target: 'idle'
                }
            }
        },
        singleRoom: {
            on: {
                BACK: {
                    target: 'listRooms',
                    actions: back
                },
                HOME: {
                    actions: reset,
                    target: 'idle'
                }
            }
        }
    }
})